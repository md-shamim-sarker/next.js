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