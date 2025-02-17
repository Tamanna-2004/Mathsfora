const User = require('../models/UserSchema');

const setUser = async(req, res)=>{
    try{
        
        // Check if user already exists
        const {name, email, phone, password} = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        const newUser = new User({name, email, phone, password});
        await newUser.save();

                // Respond with success
        res.status(201).json({
           success: true,
           product: newUser
        });
    }
    catch(err){
        console.error("Error occurred:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const getUser = async(req,res)=>{
    try{
        const allUser = await User.find();

        if(!allUser){
            res.json({
                message: "Product not found"
            })
        }

        res.status(200).json({
            success: true,
            users: allUser
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Internal server error"
        }) 
    }
}

const deleteUser = async(req,res)=>{
    try{
        const {id} = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if(!deletedUser){
            res.json({
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            product: deletedUser
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Internal server error"
        }) 
    }
}

const getSingleUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Log the received data for debugging
        console.log("Received email:", email);
        console.log("Received password:", password);

        // ✅ Step 1: Find user by email only
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Log the stored password for debugging
        console.log("Stored password in DB:", user.password);

        // ✅ Step 2: Manually check the password
        if (user.password !== password) {
            console.log("Passwords do not match");
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // ✅ Step 3: Return user data if credentials match
        console.log("Login successful for user:", user.email);
        res.status(200).json({
            success: true,
            user: user,
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

module.exports = {setUser, getUser, deleteUser, getSingleUser, getUserProfile};