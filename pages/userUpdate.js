import axios from "axios";
import {useRouter} from "next/router";
import {useMutation} from "react-query";

const UserUpdate = () => {
    const router = useRouter();

    // Update user
    const mutation = useMutation((user) => axios.patch(`/api/auth/users?_id=${router.query._id}`, user),
        {
            onSuccess: () => {
                router.push("/");
            }
        });

    const {username, email} = router.query;

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