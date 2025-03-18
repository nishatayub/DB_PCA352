const User = require("../models/userModel.js");

const loginUser = async(req,res) => {
    try{
        const { mail, password } = req.body;

        const user = User.find({ mail });

        if (!user){
            res.status(400).json({ message: "User Not Found"});
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({ message: "Invalid Credentials" });
        }
        res.status(200).json({ message: "Login Successful", user: {username: user.username, mail: user.mail} });
    }catch(err){
        res.status(500).json({ message: "Server Error", error: err.message });
    }
}

module.exports = { loginUser };