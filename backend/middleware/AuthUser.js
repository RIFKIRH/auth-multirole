import Users from "../models/UserModels.js";

export const verifyUser = async (req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({ msg: "Unauthorized" });
       } 
       const user = await Users.findOne({
        where : {
            uuid : req.session.userId
        }
    });
        if (!user) return res.status(404).json({ msg: "User not found!" });
        req.userId = user.id;
        req.role = user.role;
        next();
}

export const adminOnly = async (req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({ msg: "Unauthorized" });
       } 
       const user = await Users.findOne({
        where : {
            uuid : req.session.userId
        }
    });
        if (!user) return res.status(404).json({ msg: "User not found!" });
        if (user.role !== "admin") return res.status(403).json({ msg: "Access denied" });
        next();
}