import {deleteUser, getUsers, patchUser, postUser} from "@/controller/userController";
import {default as connectMongo} from "@/database/conn";

const handler = async (req, res) => {
    await connectMongo()
        .catch(() => {
            res.json({error: "Connection Failed!"});
        });

    switch(req.method) {
        case "GET":
            getUsers(req, res);
            break;
        case "POST":
            postUser(req, res);
            break;
        case "PATCH":
            patchUser(req, res);
            break;
        case "DELETE":
            deleteUser(req, res);
            break;
        default:
            res.json({message: `${req.method} not allowed!`});
            break;
    }
};

export default handler;