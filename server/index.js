const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const userController = require("./controller/user");
const userMod = require("./models/user.js");
const app = express();
const booksModel = require("./models/books.js");
const booksDetailModel = require("./models/bookDetails.js");
const qr = require("qr-image");
const session = require('express-session');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// Sessions
app.use(
  session({
    secret: "jwtsecretkey4545",
    resave: true,
    saveUninitialized: true,
  })
);




// DB Connect
mongoose
  .connect("mongodb://localhost:27017/Library_System")
  .then(() => {
    console.log("DB Connected.");
    app.listen(4556, () => {
      console.log(`Backend Running At Port 4556`);
    });
  })
  .catch((err) => {
    console.error("DB Connection Error:", err);
  });


// login data
app.post("/send-logindata", async (req, res) => {
  const { email, loginDate, loginTime } = req.body;

  try {
    // Find the user by email
    const user = await userMod.findOne({ email });
    console.log("usrt login", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's login data
    user.loginDate = loginDate;
    user.loginTime = loginTime;
    await user.save();

    return res.status(200).json({ message: "login data saved successfully" });
  } catch (error) {
    console.error("Error saving login data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// logout data
app.post("/send-logoutdata", async (req, res) => {
  const { email, logoutDate, logoutTime } = req.body;

  try {
    // Find the user by email
    const user = await userMod.findOne({ email });
    console.log("bs", user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's logout data
    user.logoutDate = logoutDate;
    user.logoutTime = logoutTime;
    await user.save();

    return res.status(200).json({ message: "Logout data saved successfully" });
  } catch (error) {
    console.error("Error saving logout data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/userdata", async (req, res) => {
  try {
    const users = await userMod.find(); // Assuming User is your Mongoose model
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/admin/books", async (req, res) => {
  try {
    const books = await booksModel.find();
    res.json(books);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/admin/addbooks", async (req, res) => {
  try {
    const { title, author, country, language, year } = req.body;
    const newBook = new booksModel({
      title,
      author,
      country,
      language,
      year,
    });
    await newBook.save();
    res.status(200).json({ code: 200, message: "Book added successfully" });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
});

app.post("/signup", userController.signup);
app.post("/signin", userController.signin);
app.post("/logout", userController.logout);
app.post("/submit-otp", userController.submitotp);
app.post("/send-otp", userController.sendotp);
app.post("/signinScanner", userController.signinScanner);

// Route to handle adding book details for each student
app.post("/eachstudentbook", async (req, res) => {
  const {
    email,
    title,
    author,
    country,
    language,
    year,
    status,
    statusDate,
    statusTime,
  } = req.body;
  try {
    let updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        email,
        title,
        author,
        country,
        language,
        year,
        status,
        statusDate,
        statusTime,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      code: 200,
      message: "Book details of that user added successfully",
    });
  } catch (error) {
    console.error("Error updating book details:", error);
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
});

app.get("/generateqr", (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const qr_png = qr.image(email, { type: "png" });
  res.type("png");
  qr_png.pipe(res);
});

app.post("/bookdetails", async (req, res) => {
  const {
    email,
    title,
    author,
    country,
    language,
    year,
    status,
    statusDate,
    statusTime,
  } = req.body;
  try {
    const updatedUser = await userMod.findOneAndUpdate(
      { email: email },
      {
        email,
        title,
        author,
        country,
        language,
        year,
        status,
        statusDate,
        statusTime,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "book details add from server", email: email });
  } catch (error) {
    console.error("Error updating logout date and time:", error);
    res.status(500).json({ message: "Internal Server Error" });
    ss;
  }
});

// save book detail
app.post("/logoutdatetime", async (req, res) => {
  const { email, logoutDate, logoutTime } = req.body;
  try {
    const updatedUser = await userMod.findOneAndUpdate(
      { email: email },
      {
        logoutDate,
        logoutTime,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Logout date and time updated successfully",
      email: email,
    });
  } catch (error) {
    console.error("Error updating logout date and time:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/deletebooks", async (req, res) => {
  const {
    email,
    status,
    returnDate,
    returnTime,
  } = req.body;
  try {
    const updatedUser = await userMod.findOneAndUpdate(
      { email: email },
      {
        status: status,
        title: null,
        author: null,
        country: null,
        language: null,
        year: null,
        returnDate: returnDate,
        returnTime: returnTime,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Delete book date and time updated successfully from server" });
  } catch (error) {
    console.error("Error updating book details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// app.post("/logoutdatetime", async (req, res) => {
//   const { email, logoutDate, logoutTime } = req.body;

//   // Validate request body
//   if (!email || !logoutDate || !logoutTime) {
//     return res.status(400).json({ success: false, message: "Missing required fields in the request body." });
//   }

//   try {
//     const updatedUser = await userMod.findOneAndUpdate(
//       { email: email },
//       { logoutDate: logoutDate, logoutTime: logoutTime },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ success: false, message: "User not found." });
//     }

//     return res.status(200).json({ success: true, message: "Logout date and time updated successfully." });
//   } catch (error) {
//     console.error("Error updating logout date and time:", error);
//     return res.status(500).json({ success: false, message: "Internal Server Error." });
//   }
// });




// app.get("/userdata", async (req, res) => {
//   const { email } = req.query;
//   try {
//     const userData = await userMod.findOne({ email: email });
//     if (!userData) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.json(userData);
//   } catch (err) {
//     console.error("Error fetching user data:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


app.get('/getuserloginemail', async (req, res) => {
  try {
      // Get the email from the request query
      const userEmail = req.query.email;

      // Find the user in the database based on the email
      const user = await userMod.findOne({ email: userEmail });

      if (user) {
          // Send the user's data if found
          res.status(200).json(user);
      } else {
          // Send a 404 error if user not found
          res.status(404).json({ error: 'User not found' });
      }
  } catch (err) {
      // Handle any errors
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  }
});