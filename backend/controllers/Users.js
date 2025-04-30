import Users from "../models/UserModels.js"; // Tambahkan .js di akhir
import argon2 from "argon2";


export const getUsers = async (req, res) => {
    try {
        const response = await Users.findAll({
            attributes: ['uuid', 'name', 'email', 'role']
        });
        res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
     }
}   

export const getUsersById = async (req, res) => {
    try {
        const response = await Users.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where : {
                uuid : req.params.id
            }
        });
        res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
     }
}

export const createUsers = async (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;
    if (password !== confirmPassword) return res.status(400).json({ msg: "Password and Confirm Password do not match!" });
    const hashPassword = await argon2.hash(password);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({ msg: "Register Successfully!" });
    } catch (error) {
        return res.status(400).json({ msg: error.message });
        
    }
}

export const updateUsers = async (req, res) => {
    const user = await Users.findOne({
        where : {
            uuid : req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User not found!" });
    const { name, email, password, confirmPassword, role } = req.body;
    let hashPassword;
    if (password === "" || password === null) {
        hashPassword = user.password;
    }else{
        hashPassword = await argon2.hash(password);
    }
    if (password !== confirmPassword) return res.status(400).json({ msg: "Password and Confirm Password do not match!" });
    try {
        await Users.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        },{
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "Updated Successfully!" });
    } catch (error) {
        return res.status(400).json({ msg: error.message });
        
    }
}

export const deleteUsers = async (req, res) => {
    const user = await Users.findOne({
        where : {
            uuid : req.params.id
        }
    });
    if (!user) return res.status(404).json({ msg: "User not found!" });
    try {
        await Users.destroy({
            where: {
                id: user.id
            }
        });
        res.status(200).json({ msg: "Delete Successfully!" });
    } catch (error) {
        return res.status(400).json({ msg: error.message });
        
    }
}

