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
        username: {type: String, unique: true},
        email: {type: String, unique: true},
        password: {type: String}
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
```

### pages/api/auth/users.js
```js
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
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                connectMongo().catch(error => {error: "Connection Failed!";});

                // check user email
                const result = await Users.findOne({email: credentials.email});
                if(!result) {
                    throw new Error("No user found, please register.");
                }

                // check password
                const checkPassword = await compare(credentials.password, result.password);

                // incorrect password
                if(!checkPassword || result.email !== credentials.email) {
                    throw new Error("Username and Password doesn't match");
                }
                return result;
            }
        })
    ],
};

export default NextAuth(authOptions);
```

### pages/_app.js
```js
import Navbar from '@/components/navbar';
import '@/styles/globals.css';
import {SessionProvider} from "next-auth/react";

export default function App({
  Component, pageProps: {session, ...pageProps}
}) {
  return (
    <SessionProvider session={session}>
      <Navbar></Navbar>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
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