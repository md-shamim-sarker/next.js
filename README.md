# Next.js Note

## Next.js CRUD Operation
### Install Axios and React-Query
```code
npm install axios react-query
```

### Wrap with react-query (pages/_app.js)
```js
import '@/styles/globals.css';
import {QueryClient, QueryClientProvider} from 'react-query';

export const queryClient = new QueryClient();

export default function App({Component, pageProps}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
```

### components/users/users.js
```js
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
```

### components/users/user
```js
import axios from "axios";

const User = ({index, user, router, onDelete}) => {
    const {_id, username, email} = user;
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{username}</td>
            <td>{email}</td>
            <td>
                <button onClick={() => {
                    router.push({
                        pathname: "/userUpdate",
                        query: {_id, username, email}
                    });
                }}>Update</button>
            </td>
            <td>
                <button onClick={() => onDelete(_id)}>Delete</button>
            </td>
        </tr>
    );
};

export default User;
```

### pages/index.js
```js
import Users from "@/components/users/users";

const Home = () => {
  return (
    <div>
      <Users></Users>
    </div>
  );
};

export default Home;
```

### pages/userCreate.js
```js
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
```

### pages/userUpdate.js
```js
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
```