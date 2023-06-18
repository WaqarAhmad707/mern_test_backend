const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {
  registerSchema,
  loginSchema,
} = require("../../validations/authValidation");

// Registration API
router.post("/register", async (req, res) => {
  // Get user data from the request body
  const { name, email } = req.body;

  try {
    // Validate the request body against the updateCarSchema
    await registerSchema.validateAsync(req.body);
  } catch (error) {
    // Return error response if validation fails
    return res.status(400).json({ error: error.details[0].message });
  }

  // Generate a random password
  const password = Math.random().toString(36).slice(-8);

  // Send welcome email
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "asa45@ethereal.email",
      pass: "yXc1mXzkEm5Ev8pGKt",
    },
  });

  const mailOptions = {
    from: '"RopStam App" <officialwaqar707@gmail.com>',
    to: email,
    subject: "Welcome to Ropstam",
    text: `Dear ${name},\n\nWelcome to Your App! Your account has been successfully created. You can log in with the following password: ${password}\n\nRegards,\nYour App Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });

  // Check if the email already exists in the database
  const user = await User.findOne({ email });
  if (user) {
    return res.status(404).json({ message: "Email already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save the user to the database
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    const result = await newUser.save();
    // Return a success response
    res.status(201).json(password);
  } catch (error) {
    // Return a error response
    res.status(400).json({ message: error.message });
  }
});

// Login API
router.post("/login", async (req, res) => {
  // Retrieve user credentials from the request body
  const { email, password } = req.body;

  try {
    // Validate the request body against the updateCarSchema
    await loginSchema.validateAsync(req.body);
  } catch (error) {
    // Return error response if validation fails
    return res.status(400).json({ error: error.details[0].message });
  }

  // check if the user exists or not on given email
  const user = await User.findOne({ email });
  if (!user) {
    // Return error response if user not found
    return res.status(404).json({ message: "Invalid email" });
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    // throw new Error('Invalid password');
    res.status(401).json({ message: "Invalid password" });
  }

  // Generate and sign the JWT token
  const token = jwt.sign(
    { userId: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "6h",
    }
  );

  // Return the user object or any relevant data
  res.status(200).json({ token });
});

module.exports = router;
