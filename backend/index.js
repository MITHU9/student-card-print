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

    //get total students
    app.get("/total-students", async (req, res) => {
      const totalStudents = await studentCollection.estimatedDocumentCount();

      res.json(totalStudents);
    });

    //get student by id
    app.get("/print-preview/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const student = await studentCollection.findOne({
        _id: new ObjectId(id),
      });
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
