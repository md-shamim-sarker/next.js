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