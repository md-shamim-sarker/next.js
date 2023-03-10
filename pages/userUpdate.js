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