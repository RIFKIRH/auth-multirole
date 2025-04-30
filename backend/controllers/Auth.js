import Users from "../models/UserModels.js";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";

export const Login = async (req, res) => {
    const user = await Users.findOne({
        where : {
            email : req.body.email
        }
    });
    if (!user) return res.status(404).json({ msg: "User not found!" });
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Wrong Password!" });
    req.session.userId = user.uuid; // Store user ID in session
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({
        uuid, name, email, role
    });
}

export const Me = async (req, res) => {
   if(!req.session.userId){
    return res.status(401).json({ msg: "Unauthorized" });
   } 
   const user = await Users.findOne({
    attributes: ['uuid', 'name', 'email', 'role'],
    where : {
        uuid : req.session.userId
    }
});
    if (!user) return res.status(404).json({ msg: "User not found!" });
    res.status(200).json(user
    );
}


export const Logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ msg: "Failed to logout" });
        }
        res.status(200).json({ msg: "Logout Successfully!" });
    });
    
}
