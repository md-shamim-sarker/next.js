import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import User from "./user";

const Users = () => {
    const router = useRouter();

    // Data fetching
    const {isLoading, isError, data, refetch} = useQuery(
        'users',
        () => axios.get("/api/auth/users"),
    );

    if(isLoading) {
        return <h1>Loading...</h1>;
    }

    if(isError) {
        return <h1>Unable to fetch data...</h1>;
    }

    const users = data.data;

    // Data delete
    const onDelete = async (_id) => {
        axios.delete(`/api/auth/users?_id=${_id}`);
        await refetch();
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