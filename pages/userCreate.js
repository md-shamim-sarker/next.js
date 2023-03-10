import axios from "axios";
import {useRouter} from "next/router";
import {useMutation} from "react-query";

const UserCreate = () => {
    const router = useRouter();

    // Create user
    const mutation = useMutation((user) => axios.post("/api/auth/users", user),
        {
            onSuccess: () => {
                router.push("/");
            }
        }
    );

    function onSubmitHandler(event) {
        event.preventDefault();
        const form = event.target;

        const username = form.username.value;
        const email = form.email.value;
        const password = form.password.value;

        const user = {username, email, password};

        mutation.mutate(user);
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