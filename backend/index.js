const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const csv = require("csv-parser");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      // "https://student-library-card-pust.netlify.app",
      "http://103.121.143.52",
    ],
    credentials: true,
  })
);

const uri = `${process.env.MONGO_URI}`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    //await client.connect();

    const studentCollection = client
      .db("students-db")
      .collection("all-students");

    const userCollection = client.db("students-db").collection("users");

    //auth related APIs
    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "5h",
      });
      res
        .cookie("admin_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })
        .send({
          success: true,
        });
    });

    //verify token
    const verifyToken = (req, res, next) => {
      const token = req.cookies?.admin_token;

      //console.log("token", token);

      if (!token) {
        return res
          .status(401)
          .send({ message: "Access Denied! unauthorized user" });
      }
      try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
      } catch (error) {
        res.status(400).send({ message: "Invalid Token" });
      }
    };

    const verifyAdmin = async (req, res, next) => {
      const userName = req.user.username;

      //console.log("admin", userName);

      const user = await userCollection.findOne({ username: userName });

      if (user.role === "admin") {
        next();
      } else {
        return res
          .status(401)
          .send({ message: "Access Denied! unauthorized user" });
      }
    };

    //verify admin and moderator
    const verifyAdminAndModerator = async (req, res, next) => {
      const userName = req.user.username;

      const user = await userCollection.findOne({ username: userName });

      if (user.role === "admin" || user.role === "moderator") {
        next();
      } else {
        return res
          .status(401)
          .send({ message: "Access Denied! unauthorized user" });
      }
    };

    //admin login API
    app.post("/admin-login", async (req, res) => {
      const { username, password } = req.body;

      const user = await userCollection.findOne({ username: username });

      if (!user) {
        return res.status(400).send({ message: "Invalid credentials" });
      }

      const validPass = await bcrypt.compare(password, user.password);

      if (!validPass) {
        return res.status(400).send({ message: "Invalid credentials" });
      }

      res.status(200).json({
        message: "Login successful",
        role: user.role,
      });
    });

    //get current user using cookie
    app.get("/current-user", verifyToken, async (req, res) => {
      const userName = req.user.username;

      const user = await userCollection.findOne({ username: userName });

      res.json(user.role);
    });

    //admin register API
    // app.post("/admin-register", async (req, res) => {
    //   const { username, password } = req.body;

    //   //console.log(username, password);

    //   const user = await userCollection.findOne({ username: username });

    //   if (user) {
    //     return res.status(400).send({ message: "User already exists" });
    //   }

    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(password, salt);

    //   const newUser = {
    //     username: username,
    //     password: hashedPassword,
    //     role: "admin",
    //   };

    //   const result = await userCollection.insertOne(newUser);

    //   res.status(200).send({ message: "User registered successfully" });
    // });

    //get all students with query
    app.get(
      "/students",
      verifyToken,
      verifyAdminAndModerator,
      async (req, res) => {
        const { query, session, department } = req.query;

        //console.log(query, session, department);

        if (query) {
          const students = await studentCollection
            .find({
              Roll: {
                $regex: query,
                $options: "i",
              },
            })
            .toArray();

          res.json(students);
          return;
        }

        if (session === "all" || department === "all") {
          if (session === "all" && department === "all") {
            const students = await studentCollection.find().toArray();
            res.json(students);
            return;
          }

          if (session === "all") {
            const students = await studentCollection
              .find({ Current_Department: department })
              .toArray();
            res.json(students);
            return;
          }

          if (department === "all") {
            const students = await studentCollection
              .find({ session: session })
              .toArray();
            res.json(students);
            return;
          }
        }

        const students = await studentCollection
          .find({ session: session, Current_Department: department })
          .toArray();

        res.json(students);
      }
    );

    //login with applicant_id and admission roll
    app.post("/login", async (req, res) => {
      const { roll, registration } = req.body;

      //console.log(roll, registration);

      const numAdmissionRoll = parseInt(registration);

      const student = await studentCollection.findOne({
        Roll: roll,
        Registration: numAdmissionRoll,
      });

      if (!student) {
        res.status(403).send({ messages: "Invalid credentials" });
        return;
      }

      res.status(200).send({
        message: "Login successful",
      });
    });

    //get total students
    app.get(
      "/total-students",
      verifyToken,
      verifyAdminAndModerator,
      async (req, res) => {
        const totalStudents = await studentCollection.estimatedDocumentCount();

        res.json(totalStudents);
      }
    );

    //get all session in an array
    app.get(
      "/all-session",
      verifyToken,
      verifyAdminAndModerator,
      async (req, res) => {
        try {
          const sessions = await studentCollection
            .aggregate([
              { $group: { _id: "$session" } },
              { $project: { _id: 0, session: "$_id" } },
            ])
            .toArray(); // Ensure it resolves as an array

          const sessionArray = sessions.map((s) => s.session);

          //console.log(sessionArray, sessions);

          res.json(sessionArray);
        } catch (error) {
          console.error("Error fetching sessions:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    );

    //get student by id
    app.get("/print-preview/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const student = await studentCollection.findOne({
        _id: new ObjectId(id),
      });
      res.json(student);
    });

    //get student information by applicant_id
    app.get("/student/:registration", async (req, res) => {
      const registration = req.params.registration;

      const numId = parseInt(registration);

      const student = await studentCollection.findOne({
        Registration: numId,
      });

      if (!student) {
        res.json({ error: "Student not found" });
        return;
      }

      res.json(student);
    });

    //admin actions toggle can_update student signature
    app.patch(
      "/toggle-update/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;

        const student = await studentCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!student) {
          res.json({ error: "Student not found" });
          return;
        }

        const canUpdate = student.can_update;

        await studentCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { can_update: !canUpdate } }
        );

        res.send({ success: true });
      }
    );

    //delete student by id
    app.delete(
      "/delete-student/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.id;

        const student = await studentCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!student) {
          res.json({ error: "Student not found" });
          return;
        }

        await studentCollection.deleteOne({ _id: new ObjectId(id) });

        res.send({ success: true });
      }
    );

    //update student by id
    app.put(
      "/update-student/:id",
      verifyToken,
      verifyAdminAndModerator,
      async (req, res) => {
        const id = req.params.id;
        let student = req.body;

        delete student._id;

        const result = await studentCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: student }
        );

        if (result.modifiedCount > 0) {
          res.json({ message: "Student updated successfully" });
        } else {
          res.status(400).json({ message: "Failed to update student" });
        }
      }
    );

    //print complete count increase
    app.patch(
      "/print-complete/:id",
      verifyToken,
      verifyAdminAndModerator,
      async (req, res) => {
        const id = req.params.id;

        const student = await studentCollection.findOne({
          _id: new ObjectId(id),
        });

        if (!student) {
          res.json({ error: "Student not found" });
          return;
        }

        await studentCollection.updateOne(
          { _id: new ObjectId(id) },
          { $inc: { print_complete: 1 } }
        );

        res.send({ success: true });
      }
    );

    // Configure Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Configure Multer for Cloudinary
    const storage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
        folder: "csv_uploads", // Cloudinary folder name
        format: async () => "csv",
        resource_type: "raw", // Important for non-image files
      },
    });

    const imageStorage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: (req, file) => {
        const commonParams = {
          resource_type: "image",
          format: "png",
          allowed_formats: ["jpg", "png", "jpeg", "gif", "webp", "svg"],
        };

        if (file.fieldname === "studentImage") {
          return {
            ...commonParams,
            folder: "student_images",
            transformation: [
              { width: 300, height: 300, crop: "fill", gravity: "auto" },
            ],
          };
        }

        if (file.fieldname === "signature") {
          return {
            ...commonParams,
            folder: "student_images",
            transformation: [
              { width: 300, height: 80, crop: "fill", gravity: "auto" },
            ],
          };
        }

        return commonParams;
      },
    });

    const uploadImage = multer({
      storage: imageStorage,
      limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
    });

    const upload = multer({ storage });

    // Update student signature URL
    app.patch(
      "/update-signature/:id",
      uploadImage.fields([
        { name: "studentImage", maxCount: 1 },
        { name: "signature", maxCount: 1 },
      ]),
      async (req, res) => {
        try {
          const id = parseInt(req.params.id);
          const filter = { Registration: id };

          const studentImageFile = req.files["studentImage"]?.[0];
          const signatureFile = req.files["signature"]?.[0];
          // const hallName = req.body.hall_name;

          // console.log("studentImageFile:", studentImageFile);
          // console.log("signatureFile:", signatureFile);

          if (!studentImageFile || !signatureFile) {
            return res
              .status(400)
              .json({ error: "Both image and signature are required" });
          }
          // Check if hallName is provided
          // if (!hallName) {
          //   return res
          //     .status(400)
          //     .json({ error: "Hall name is required for the update" });
          // }

          const studentImageUrl = studentImageFile.path;
          const signatureUrl = signatureFile.path;

          const result = await studentCollection.updateOne(filter, {
            $set: {
              picture: studentImageUrl,
              signature: signatureUrl,
              // hall_name: hallName,
              can_update: false,
            },
          });

          if (result.modifiedCount > 0) {
            res.json({
              message: "Student image and signature updated successfully.",
            });
          } else {
            res
              .status(400)
              .json({ message: "No update occurred. Check student ID." });
          }
        } catch (err) {
          console.error("Error updating student:", err);
          res.status(500).json({ error: "Server error" });
        }
      }
    );

    // CSV Upload Route
    app.post(
      "/api/students/upload",
      verifyToken,
      verifyAdmin,
      upload.single("file"),
      (req, res) => {
        if (!req.file) {
          return res.status(400).json({ message: "No file uploaded" });
        }

        const fileUrl = req.file.path; // Cloudinary URL
        console.log("Uploaded CSV URL:", fileUrl);

        const results = [];
        const fileStream = require("https").get(fileUrl, (response) => {
          response
            .pipe(csv())
            .on("data", (data) => {
              const student = {
                applicant_id: parseInt(data.applicant_id),
                Admission_roll: parseInt(data.Admission_roll),
                Dept: data["Dept.Code"]
                  ? { Code: parseInt(data["Dept.Code"]) }
                  : {},
                Roll: data.Roll,
                Registration: parseInt(data.Registration),
                Name: data.Name,
                Current_Department: data.Current_Department,
                Mobile: data.Mobile,
                F_Name: data.F_Name,
                M_Name: data.M_Name,
                F_Occupation: data.F_Occupation,
                M_occupation: data.M_occupation,
                religion: data.religion,
                Gender: data.Gender,
                picture: data.picture,
                family_income: parseInt(data.family_income),
                blood_group: data.blood_group,
                nationality: data.nationality,
                phone: data.phone,
                session: data.session,
                hall_name: String(data.hall_name),

                p_house_road_village: data.p_house_road_village,
                p_post_office: data.p_post_office,
                p_post_code: data.p_post_code,
                p_upazila: data.p_upazila,
                p_district: data.p_district,
                pr_house_road_village: data.pr_house_road_village,
                pr_post_office: data.pr_post_office,
                pr_post_code: data.pr_post_code,
                pr_upazilla: data.pr_upazilla,
                pr_district: data.pr_district,
              };
              results.push(student);
            })
            .on("end", async () => {
              try {
                await studentCollection.insertMany(results);
                res.json({
                  message:
                    "CSV uploaded to Cloudinary and data stored successfully",
                });
              } catch (error) {
                console.error("Database Insert Error:", error);
                res
                  .status(500)
                  .json({ message: "Error storing data in database" });
              }
            });
        });

        fileStream.on("error", (err) => {
          console.error("Error downloading CSV from Cloudinary:", err);
          res.status(500).json({ message: "Error processing CSV file" });
        });
      }
    );

    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!"
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
