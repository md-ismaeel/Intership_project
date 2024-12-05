import { userModel } from "../Model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const secretKey = process.env.SECRETE_KEY;

export const SignUp = async (req, res) => {
  //   console.log(req.body);
  const {
    firstName,
    lastName,
    userName,
    gender,
    email,
    password,
    confirmPassword,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !userName ||
    !gender ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    res.status(400).json({
      success: false,
      message: "All fields are Required!",
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long!",
    });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Passwords do not match!",
    });
  }

  try {
    const isRegisteredEmail = await userModel.findOne({ email });
    if (isRegisteredEmail) {
      return res.status(409).json({
        success: false,
        message: "User Already registered!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const salt_cnf = await bcrypt.genSalt(10);
    const hashedPassword_cnf = await bcrypt.hash(confirmPassword, salt_cnf);

    const user = await userModel.create({
      ...req.body,
      password: hashedPassword,
      confirmPassword: hashedPassword_cnf,
    });

    res.status(201).json({
      success: true,
      message: "user sign-up successfully!!",
      results: user._id,
    });
  } catch (err) {
    console.log("ERROR=> " + err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// export const SignIn = async (req, res) => {
//   // console.log(req.body);
//   const { userName, email, password } = req.body;

//   if ((!userName && !email) || !password) {
//     return res.status(400).json({
//       success: false,
//       message: "All fields are required!",
//     });
//   }

//   try {
//     const user = await userModel.findOne({
//       $or: [{ email: email }, { userName: userName }],
//     });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "user Not found!!",
//       });
//     }

//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized user!!",
//       });
//     }

//     const payload = {
//       userName: user.userName,
//       userId: user._id,
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//     };

//     const token = jwt.sign(payload, secretKey, { expiresIn: 7 * 24 * 60 * 60 });
//     user.token = `${token}`;
//     await user.save();

//     const miliSecondIn7days = 7 * 24 * 60 * 60 * 1000;
//     res.cookie("token", token, {
//       secure: true,
//       sameSite: "none",
//       path: "/",
//       maxAge: miliSecondIn7days,
//     });

//     res.status(200).json({
//       success: true,
//       message: "user sig-in successfully!!",
//       token: `Bearer ${token}`,
//     });
//   } catch (err) {
//     console.warn("ERROR during login user" + err);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };

export const SignIn = async (req, res) => {
  const { userName, email, password } = req.body;

  if ((!userName && !email) || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required!",
    });
  }

  try {
    const user = await userModel.findOne({
      $or: [{ email: email }, { userName: userName }],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const payload = {
      userName: user.userName,
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    const token = jwt.sign(payload, secretKey, { expiresIn: "7d" });

    // Save token to the user model (optional)
    user.token = token;
    await user.save();

    // Set secure cookie
    const miliSecondIn7days = 7 * 24 * 60 * 60 * 1000;
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: miliSecondIn7days,
    });

    // Respond to client
    res.status(200).json({
      success: true,
      message: "User signed in successfully!",
    });
  } catch (err) {
    console.error("Error during login: ", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const SignOut = async (req, res) => {
  await userModel.findByIdAndUpdate(req.user._id, { token: null });

  res.clearCookie("token", {
    secure: true,
    sameSite: "none",
    path: "/",
  });

  res.json({
    success: true,
    message: "User sign-out successfully",
  });
};

export const ForgetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  // Validate input fields
  if (!email || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Email and new password are required!",
    });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long!",
    });
  }

  try {
    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Enter a registered email!",
      });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully!",
    });
  } catch (err) {
    console.error("ForgetPassword Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
