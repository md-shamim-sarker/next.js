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