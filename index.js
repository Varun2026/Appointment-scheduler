const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const EmployeeSchema = require("./models/employee")

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());

const MONGOSTR = process.env.MONGOSTR;

// Connect to MongoDB
mongoose.connect(MONGOSTR)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

  app.post('/register', (req,res) => {
    EmployeeSchema.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
  })

  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    EmployeeSchema.findOne({ username: username })
      .then(user => {
        if (user) {
          if (user.password === password) {
            // Send status code 200 for successful login
            res.status(200).json({ message: "Login successful", user });
          } else {
            // Send status code 401 for unauthorized access (incorrect password)
            res.status(401).json({ error: "Incorrect password" });
          }
        } else {
          // Send status code 404 for not found (no record existed)
          res.status(404).json({ error: "User not found" });
        }
      })
      .catch(error => {
        // Handle database errors
        console.error("Error finding user:", error);
        // Send status code 500 for internal server error
        res.status(500).json({ error: "Internal server error" });
      });
  });
  

app.listen(PORT, () => {
   console.log('server is running')
});
