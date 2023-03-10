import {postUser} from "@/controller/userController";
import {default as connectMongo} from "@/database/conn";

const handler = async (req, res) => {
    await connectMongo()
        .catch(() => {
            res.json({error: "Connection Failed!"});
        });

    switch(req.method) {
        case "POST":
            postUser(req, res);
            break;
        default:
            res.json({message: `${req.method} not allowed!`});
            break;
    }
};

export default handler;