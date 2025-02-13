const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const QRCode = require("qrcode");
dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

//middleware
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

    //get all students with query
    app.get("/students", async (req, res) => {
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

      const numAdmissionRoll = parseInt(registration);

      const student = await studentCollection.findOne({
        Roll: roll,
        Registration: numAdmissionRoll,
      });

      if (!student) {
        res.json({ error: "Invalid credentials" });
        return;
      }

      res.status(200).send({
        message: "Login successful",
      });
    });

    //get total students
    app.get("/total-students", async (req, res) => {
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
      console.log("ID:", id);
      const numID = parseInt(id);
      const filter = { Registration: numID };
      const updateDoc = { $set: { signature: signature } };

      const result = await studentCollection.updateOne(
        { Registration: numID },
        { $set: { signature: signature } }
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
