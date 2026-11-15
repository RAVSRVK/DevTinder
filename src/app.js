const express = require('express');
const { adminMiddleware } = require('../middlewares/auth');
const User = require('../models/user'); // Import the User model
const connectDb = require('./config/database'); // Connect to MongoDB
const app = express();
const port = 3000;

app.use(express.json());

const isChangeAllowed = (keys) => {
    const reqSkills = ["skills", "email", "gender", "firstName", "lastName" ]
    console.log(Object.keys(keys), reqSkills)
    return Object.keys(keys).includes(reqSkills)
}


app.get("/users", async (req, res) => {
    try {
        const {email} = req.body
        if(!email) return User.find({})
       const p = await User.find({email })
       console.log(p)
       if(!p) res.status(404).send("user not found ")
       res.send(p)
    } catch (error) {
        return error?.message
    }
});

app.post("/signup", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

app.delete("/user/:id", async (req, res) => {
    const {id} = req.params
    console.log(id)
    try {
        await User.findByIdAndDelete(id) 
        res.status(200).send("User deleted successfully")
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'Error deleting user', error });
    }
})

app.put("/user/:id", async (req, res) => {
    // console.log(id, rest)
    const {id} = req.params
    try {
        if(!isChangeAllowed(req.body)) {
            throw new Error("Unrequired keys trying to modify")
        }
        
        
        const a = await User.findByIdAndUpdate(id, req.body, {returnDocument: 'after', runValidators: true})
                res.status(200).send("User updated successfully")
    } catch (error) {
        res.send("SOmething went wrong -> ", error.message)
        console.log(error.message)
    }
})

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
})