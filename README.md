# Next.js Note

## Create Next.js API
### Install Mongoose and BCrypt
```code
npm install mongoose bcrypt
```
### database/conn.js
```js
import mongoose from "mongoose";

mongoose.set('strictQuery', true);

const MONGO_URI = "mongodb://127.0.0.1:27017/nextapp";

const connectMongo = async () => {
    try {
        const {connection} = await mongoose.connect(MONGO_URI);
        if(connection.readyState === 1) {
            console.log('Database Connected!');
        } else {
            console.log('Database Not Connected!');
        }
    } catch(error) {
        console.log(error.message);
    }
};

export default connectMongo;
```
### model/userSchema.js
```js
import {model, models, Schema} from "mongoose";

const userSchema = new Schema(
    {
        username: String,
        email: String,
        password: String
    }
);

const Users = models.user || model('user', userSchema);

export default Users;
```
### controller/userController.js
```js
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
            .catch(() => res.json({error: "Error in create method!"}));
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
```
### pages/api/auth/users.js
```js
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
```

## Now it's time to check all api endpoint in any api client like postman.