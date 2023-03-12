import React, {useMemo} from 'react';
import {useTable} from 'react-table';
import {COLUMNS} from './columns';
import MOCK_DATA from "./MOCK_DATA.json";

const BasicTable = () => {
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => MOCK_DATA, []);

    const tableInstance = useTable({columns, data});

    const {getTableProps, headerGroups, getTableBodyProps, rows, prepareRow, footerGroups} = tableInstance;

    return (
        <table {...getTableProps}>
            <thead>
                {
                    headerGroups.map((headerGroup, i) => <tr
                        key={i}
                        {...headerGroup.getHeaderGroupProps()}>
                        {
                            headerGroup.headers.map((column, i) => <th
                                key={i}
                                {...column.getHeaderProps()}>
                                {column.render('Header')}</th>)
                        }
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>)
                }
            </thead>
            <tbody {...getTableBodyProps}>
                {
                    rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr key={i} {...row.getRowProps()}>
                                {
                                    row.cells.map((cell, i) => <td
                                        key={i}
                                        {...cell.getCellProps()}
                                    >{cell.render('Cell')}</td>)
                                }
                                <td>
                                    <button>Edit</button>
                                </td>
                                <td>
                                    <button>Delete</button>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
            <tfoot>
                {
                    footerGroups.map((footerGroup, i) => <tr
                        key={i}
                        {...footerGroup.getFooterGroupProps()}>
                        {
                            footerGroup.headers.map((column, i) => <th
                                key={i}
                                {...column.getFooterProps}>
                                {column.render('Footer')}
                            </th>)
                        }
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>)
                }
            </tfoot>
        </table>
    );
};

export default BasicTable;