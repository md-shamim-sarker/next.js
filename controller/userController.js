import Users from "@/model/userSchema";
import {hash} from "bcrypt";

// http://localhost:3000/api/auth/users
export const getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        return res.json(users);
    } catch(error) {
        return res.json({error});
    }
};

// http://localhost:3000/api/auth/users
export const postUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const user = {username, email, password: await hash(password, 10).catch(() => res.json({error: "Error in hash!"}))};

        Users.create(user)
            .then(data => {
                return res.json({status: "user created", data});
            })
            .catch((error) => res.json({message: "This user already exits!"}));
    } catch(error) {
        return res.json({error: "Error in posting data!"});
    }
};

// http://localhost:3000/api/auth/users?_id=...
export const patchUser = async (req, res) => {
    try {
        const {_id} = req.query;
        const formData = req.body;
        const user = await Users.findByIdAndUpdate(_id, formData);
        return res.json({status: "updated", user});
    } catch(error) {
        return res.json({error: "Error in updating data!"});
    }
};

// http://localhost:3000/api/auth/users?_id=...
export const deleteUser = async (req, res) => {
    try {
        const {_id} = req.query;
        const user = await Users.findByIdAndDelete(_id);
        return res.json({status: "deleted", user});
    } catch(error) {
        return res.json({error: "Error in deleting data!"});
    }
};