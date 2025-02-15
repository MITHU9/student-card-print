const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const express = require("express");
const cors = require("cors");
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
      "https://student-library-card-pust.netlify.app",
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

      res.status(200).send({ message: "Login successful" });
    });

    //admin register API
    // app.post("/admin-register", async (req, res) => {
    //   const { username, password } = req.body;

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
    app.get("/students", verifyToken, verifyAdmin, async (req, res) => {
      const query = req.query.query;

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

      const students = await studentCollection.find().toArray();

      res.json(students);
    });

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
    app.get("/total-students", verifyToken, verifyAdmin, async (req, res) => {
      const totalStudents = await studentCollection.estimatedDocumentCount();

      res.json(totalStudents);
    });

    //get student by id
    app.get("/print-preview/:id", async (req, res) => {
      const id = req.params.id;
      //console.log(id);
      const student = await studentCollection.findOne({
        _id: new ObjectId(id),
      });
      res.json(student);
    });

    // Update student signature URL
    app.patch("/update-signature/:id", async (req, res) => {
      const id = req.params.id;
      const { signature } = req.body;
      //console.log("ID:", id);
      const numID = parseInt(id);
      const filter = { Registration: numID };
      const updateDoc = { $set: { signature: signature } };

      const result = await studentCollection.updateOne(
        { Registration: numID },
        { $set: { signature: signature, can_update: false } }
      );

      if (result.modifiedCount > 0) {
        res.json({ message: "Signature updated successfully" });
      } else {
        res
          .status(400)
          .json({ message: "No changes made. Check the ID again." });
      }
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

    //print complete count increase
    app.patch(
      "/print-complete/:id",
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

        await studentCollection.updateOne(
          { _id: new ObjectId(id) },
          { $inc: { print_complete: 1 } }
        );

        res.send({ success: true });
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
