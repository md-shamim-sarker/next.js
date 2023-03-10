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