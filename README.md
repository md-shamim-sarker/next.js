# Next.js Note

## Next.js CRUD Operation

### Install Dependency
```code
npm install axios mongoose bcrypt
```

## Backend Section

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
        username: {type: String, unique: true},
        email: {type: String, unique: true},
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
            .catch((error) => res.json({message: "This user already exits!"}));
    } catch(error) {
        return res.json({error: "Error in posting data!"});
    }
};

// http://localhost:3000/api/auth/users?_id=...
export const patchUser = async (req, res) => {
    try {
        const {_id} = req.query;
        const {username, email, password} = req.body;
        const updatedUser = {username, email, password: await hash(password, 10).catch(() => res.json({error: "Error in hash!"}))};
        const user = await Users.findByIdAndUpdate(_id, updatedUser);
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

## Frontend Section

### components/users/users.js
```js
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import User from "./user";

const Users = () => {
    const router = useRouter();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("/api/auth/users")
            .then(data => setUsers(data.data))
            .catch(err => console.log(err));
    }, [users]);

    // Data delete
    const onDelete = async (_id) => {
        await axios.delete(`/api/auth/users?_id=${_id}`);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => <User
                            key={user._id}
                            user={user}
                            index={index}
                            router={router}
                            onDelete={onDelete}
                        ></User>)
                    }
                </tbody>
            </table>
            <Link href="/userCreate">Create New User</Link>
        </div>
    );
};

export default Users;
```
### components/users/user.js
```js
const User = ({index, user, router, onDelete}) => {
    const {_id, username, email} = user;
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{username}</td>
            <td>{email}</td>
            <td>
                <button onClick={() => {
                    router.push({
                        pathname: "/userUpdate",
                        query: {_id, username, email}
                    });
                }}>Update</button>
            </td>
            <td>
                <button onClick={() => onDelete(_id)}>Delete</button>
            </td>
        </tr>
    );
};

export default User;
```
### pages/index.js
```js
import Users from "@/components/users/users";

const Home = () => {
  return (
    <div>
      <Users></Users>
    </div>
  );
};

export default Home;
```
### pages/userCreate.js
```js
import axios from "axios";
import {useRouter} from "next/router";

const UserCreate = () => {
    const router = useRouter();

    // Create user

    function onSubmitHandler(event) {
        event.preventDefault();
        const form = event.target;

        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;

        const user = {username, email, password};

        axios.post("/api/auth/users", user)
            .then(() => {
                router.push("/");
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h1>Create New User</h1>
            <form onSubmit={onSubmitHandler}>
                <input type="text" name="username" placeholder="username" autoComplete="username" /><br /><br />
                <input type="email" name="email" placeholder="email" autoComplete="email" /> <br /><br />
                <input type="password" name="password" placeholder="password" autoComplete="password" /> <br /><br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default UserCreate;
```
### pages/userUpdate.js
```js
import axios from "axios";
import {useRouter} from "next/router";

const UserUpdate = () => {
    const router = useRouter();

    // Update user
    const {_id, username, email} = router.query;

    function onSubmitHandler(event) {
        event.preventDefault();
        const form = event.target;

        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;

        const user = {username, email, password};

        axios.patch(`/api/auth/users?_id=${_id}`, user)
            .then(() => {
                router.push("/");
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <h1>Update User</h1>
            <form onSubmit={onSubmitHandler}>
                <input type="text" name="username" autoComplete="username" defaultValue={username} /><br /><br />
                <input type="email" name="email" placeholder="email" autoComplete="email" defaultValue={email} /> <br /><br />
                <input type="password" name="password" placeholder="new password" autoComplete="password" /> <br /><br />
                <input type="submit" value="Update User" />
            </form>
        </div>
    );
};

export default UserUpdate;
```