const Table = ({row}) => {
    const {id, first_name, last_name, email, gender, country} = row;
    return (
        <tr>
            <td>{id}</td>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{email}</td>
            <td>{gender}</td>
            <td>{country}</td>
            <td>
                <button>Edit</button>
            </td>
            <td>
                <button>Delete</button>
            </td>
        </tr>
    );
};

export default Table;