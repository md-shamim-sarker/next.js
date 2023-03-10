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