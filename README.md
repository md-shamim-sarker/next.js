# Next.js Note

## Next.js Authentication

### Install Dependency
```code
npm install next-auth mongoose bcrypt axios
```

## API Section

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
        fullname: String,
        designation: String,
        email: {type: String, unique: true},
        phone: {type: String, unique: true},
        password: {type: String},
        role: String,
        createdAt: Date,
        approved: Boolean
    }
);

const Users = models.user || model('user', userSchema);

export default Users;
```

### controller/userController.js
```js
import Users from "@/model/userSchema";
import {hash} from "bcrypt";

// GET API
// http://localhost:3000/api/auth/users
export const getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        return res.json(users);
    } catch(error) {
        return res.json({error});
    }
};

// http://localhost:3000/api/auth/user?email=...
export const getUser = async (req, res) => {
    try {
        const {email} = req.query;
        const user = await Users.findOne({email});
        return res.json(user);
    } catch(error) {
        return res.json({error});
    }
};

// POST API
// http://localhost:3000/api/auth/users
export const postUser = async (req, res) => {
    try {
        const {fullname, designation, email, phone, password, role, createdAt, approved} = req.body;

        const hashPassword = await hash(password, 1)
            .catch(() => res.json({
                error: "Error in hash!"
            }));

        const user = {fullname, designation, email, phone, password: hashPassword, role, createdAt, approved};

        Users.create(user)
            .then(data => {
                return res.json({status: "user created", data});
            })
            .catch((error) => res.json({error: "This user already exits!"}));
    } catch(error) {
        return res.json({error: "Error in posting data!"});
    }
};

// PATCH API
// http://localhost:3000/api/auth/users?id=...
export const patchUser = async (req, res) => {
    try {
        const {_id} = req.query;
        const {fullname, designation, email, phone, password} = req.body;
        const hashPassword = await hash(password, 1)
            .catch(() => res.json({
                error: "Error in hash!"
            }));
        const data = {fullname, designation, email, phone, password: hashPassword};
        const user = await Users.findByIdAndUpdate(_id, data);
        return res.json({status: "updated", user});
    } catch(error) {
        return res.json({error: "Error in updating user!"});
    }
};

// DELETE API
// http://localhost:3000/api/auth/users?id=...
export const deleteUser = async (req, res) => {
    try {
        const {_id} = req.query;
        const data = await Users.findByIdAndDelete(_id);
        return res.json({status: "deleted", data});
    } catch(error) {
        return res.json({error: "Error in deleting user!"});
    }
};

// Approved PATCH API
// http://localhost:3000/api/auth/users?id=...
export const patchApprovedUser = async (req, res) => {
    try {
        const {_id} = req.query;
        const user = await Users.findByIdAndUpdate(_id, req.body);
        return res.json({status: "updated", user});
    } catch(error) {
        return res.json({error: "Error in updating user!"});
    }
};

// Approved PATCH API
// http://localhost:3000/api/auth/users?id=...
export const patchRoleUser = async (req, res) => {
    try {
        const {_id} = req.query;
        const user = await Users.findByIdAndUpdate(_id, req.body);
        return res.json({status: "updated", user});
    } catch(error) {
        return res.json({error: "Error in updating user!"});
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

## Authentication Section

### pages/api/auth/[...nextauth].js
```js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/database/conn";
import Users from "@/model/userSchema";
import {compare} from "bcrypt";

export const authOptions = {
    // Session Strategy
    session: {
        strategy: 'jwt',
    },
    //Specify Provider
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                connectMongo().catch(error => {error: "Connection Failed!";});

                const {email, password} = credentials;

                // check user email
                const user = await Users.findOne({email});

                if(!user) {
                    throw new Error("No user found, please register.!");
                }

                // check password
                const checkPassword = await compare(password, user.password);

                // check email and password combine
                if(!checkPassword || user.email !== credentials.email) {
                    throw new Error("Username and Password doesn't match!");
                }

                // check account approval
                if(user.approved === false) {
                    throw new Error("This user isn't approved yet!");
                }
                return user;
            }
        }),
    ],

    callbacks: {
        async session({session, token}) {
            if(token) {
                session._id = token._id;
                session.email = token.email;
                session.phone = token.phone;
                session.role = token.role;
                session.fullname = token.fullname;
            }
            return session;
        },
        async jwt({token, user}) {
            if(user) {
                token._id = user._id;
                token.email = user.email;
                token.phone = user.phone;
                token.role = user.role;
                token.fullname = user.fullname;
            }
            return token;
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        error: "/login"
    }
};

export default NextAuth(authOptions);
```

### pages/_app.js
```js
import UserContext from '@/context/userContext';
import CommonLayout from '@/layout/commonLayout';
import '@/styles/globals.css';
import {SessionProvider} from "next-auth/react";
import dynamic from 'next/dynamic';
import {Toaster} from 'react-hot-toast';

const App = ({
  Component, pageProps: {session, ...pageProps}
}) => {
  const getLayout = Component.getLayout;
  // const getLayout = Component.getLayout || ((page) => page);

  if(getLayout) {
    return (
      <SessionProvider session={session}>
        <UserContext>
          {
            getLayout(<Component {...pageProps} />)
          }
          <Toaster position="top-center" reverseOrder={false} />
        </UserContext>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider session={session}>
      <UserContext>
        <CommonLayout>
          <Component {...pageProps} />
        </CommonLayout>
        <Toaster position="top-center" reverseOrder={false} />
      </UserContext>
    </SessionProvider>
  );
};

export default dynamic(() => Promise.resolve(App), {ssr: false});

```

## Frontend Section

### components/navbar.js
```js
import {signOut, useSession} from "next-auth/react";
import Link from "next/link";
import style from "../styles/Navbar.module.css";

const Navbar = () => {
    const {data: session} = useSession();
    return (
        <div className={style.navStyle}>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/dashboard">Dashboard</Link>
            {
                !session ?
                    <Link href={"/login"}>
                        <button>Login</button>
                    </Link>
                    :
                    <button onClick={() => signOut()}>Logout</button>
            }
            {
                session && <div>{session.user.email}</div>
            }
        </div>
    );
};

export default Navbar;
```
### pages/index.js
```js
import React from 'react';

const Home = () => {
  return (
    <div>
      <h1>Home page</h1>
      <p>lorem</p>
    </div>
  );
};

export default Home;
```
### pages/about.js
```js
const About = () => {
    return (
        <div>
            <h1>About page</h1>
            <p>lorem</p>
        </div>
    );
};

export default About;
```
### pages/dashboard.js
```js
import {getSession} from "next-auth/react";

const Dashboard = () => {
    return (
        <div>
            <h1>Dashboard page</h1>
            <p>lorem</p>
        </div>
    );
};
```
### pages/login.js
```js
import Link from "next/link";
import {signIn} from "next-auth/react";

const Login = () => {

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        await signIn("credentials", {
            redirect: true,
            email,
            password,
            callbackUrl: "/"
        });
    };

    return (
        <div>
            <h1>Login page</h1>
            <form onSubmit={onSubmitHandler}>
                <input type="email" name="email" placeholder="email" autoComplete="email" />
                <input type="password" name="password" placeholder="password" autoComplete="password" />
                <input type="submit" value="Login" />
            </form>
            <Link href="/register">Register</Link>
        </div>
    );
};

export default Login;
```
### pages/register.js
```js
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/router";

const Register = () => {
    const router = useRouter();

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const form = event.target;
        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;
        const user = {username, email, password};

        axios.post("/api/auth/users", user)
            .then(() => {
                router.push("/login");
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h1>Register page</h1>
            <form onSubmit={onSubmitHandler}>
                <input type="text" name="username" placeholder="username" autoComplete="username" />
                <input type="email" name="email" placeholder="email" autoComplete="email" />
                <input type="password" name="password" placeholder="password" autoComplete="password" />
                <input type="submit" value="Register" />
            </form>
            <Link href="/login">Login</Link>
        </div>
    );
};

export default Register;
```
### (Create Protected Route) middleware.js
```js
import {NextResponse} from "next/server";

const middleware = (req) => {
    const baseUrl = "http://localhost:3000/";
    let verify = req.cookies.get('next-auth.session-token');
    let url = req.url;

    if(!verify && url.includes("/dashboard")) {
        return NextResponse.redirect(`${baseUrl}login`);
    }

    if(verify && url.includes("/login")) {
        return NextResponse.redirect(`${baseUrl}`);
    }
};

export default middleware;
```
### styles/globals.css
```css
* {
  margin: 0;
  padding: 2px;
  box-sizing: border-box;
}

body {
  width: 60%;
  margin: auto;
  display: flex;
  justify-content: center;
}

input {
  display: block;
  margin-top: 5px;
}
```
### styles/Navbar.module.css
```css
.navStyle {
    display: flex;
    column-gap: 10px;
    justify-content: center;
    align-items: center;
}

.navStyle>a {
    text-decoration: none;
}
```