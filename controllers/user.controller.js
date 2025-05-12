import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/user.models.js"
import Company from "../models/company.models.js"

export const register = async (req, res) => {
  try {
    const { companyName, companyDomain, name, email, password } = req.body;

    // Check if the company with the given domain already exists
    const existingCompany = await Company.findOne({ domain: companyDomain });

    if (existingCompany) {
      return res.status(400).json({ message: "Company already exists" });
    }

    // Create new company
    const company = new Company({ name: companyName, domain: companyDomain });
    await company.save();

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user for the new company
    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      role: "Admin",
      companyId: company._id,  // Save the company reference
    });

    await user.save();

    return res.status(201).json({ message: "Company and admin user registered successfully" });
  } catch (error) {
    console.error("Registration error", error);
    res.status(500).json({ message: "Server error" });
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email }).populate('companyId'); // Populate company details

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong credentials" });
    }

    // Create JWT tokens
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role, companyId: user.companyId._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error("Login Server error", error);
    res.status(500).json({ message: "Error in the server" });
  }
}

export const listUsers = async (req,res) =>{
    try {
        const users = await User.find({companyId:req.params.companyId})
        res.status(201).json(users)
    } catch (error) {
    console.error("List users error:", error);
    res.status(500).json({ message: "Server error" })
    }
}

//update User (Admin Only)

export const updateUser = async (req,res)=>{

    try {
        const {userId} = req.params
        const {name,email,role} = req.body

        const user = await User.findByIdAndUpdate(userId
            ,{
               name,email,role 
            },{new:true}
        )

        if (!user) {
            return res.status(404).json({message:"User not found"})
        }

 res.status(200).json({ message: "User updated successfully", user });

    } catch (error) {
      console.error("Update user error",error)  
      res.status(500).json({ message: "Server error" });
    }
}