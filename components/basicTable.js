import {useMemo} from "react";
import {useGlobalFilter, usePagination, useTable} from "react-table";
import DATA from "./DATA.json";
import Table from "./table";

const COLUMNS = [
    {accessor: "id"},
    {accessor: "first_name"},
    {accessor: "last_name"},
    {accessor: "email"},
    {accessor: "gender"},
    {accessor: "country"}
];

const BasicTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => DATA, []);

    const {
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        setPageSize,
        state,
        setGlobalFilter
    } = useTable(
        {columns, data},
        useGlobalFilter,
        usePagination);

    const {globalFilter, pageIndex, pageSize} = state;

    return (
        <>
            {/* Global Filter Option */}
            Search: {' '}
            <input
                type="search"
                value={globalFilter || ''}
                onChange={e => setGlobalFilter(e.target.value)}
            />

            {/* Table */}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Country</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        page.map(row => <Table
                            key={row.values.id}
                            row={row.values}
                        ></Table>)
                    }
                </tbody>
            </table>

            {/* Pagination */}
            <div>
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>

                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>
                    {' '}
                </span>

                <select
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}
                >
                    <option value="10">Show 10</option>
                    <option value="20">Show 20</option>
                    <option value="30">Show 30</option>
                    <option value="40">Show 40</option>
                    <option value="50">Show 50</option>
                </select>

                <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            </div>
        </>
    );
};

export default BasicTable;