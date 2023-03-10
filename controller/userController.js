import Users from "@/model/userSchema";
import {hash} from "bcrypt";

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