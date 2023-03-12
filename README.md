# Next.js Note

## Create React Table

### Install Dependency
```code
npm install react-table
```
### components/DATA.json
```json
[
    {
        "id": 1,
        "first_name": "Elihu",
        "last_name": "Shobrook",
        "email": "eshobrook0@umich.edu",
        "gender": "Male",
        "dob": "10/1/2001",
        "country": "Russia",
        "phone": "100-301-4151"
    },
    {
        "id": 2,
        "first_name": "Jasen",
        "last_name": "Murfin",
        "email": "jmurfin1@dagondesign.com",
        "gender": "Male",
        "dob": "11/3/1995",
        "country": "China",
        "phone": "898-427-4011"
    },
    {
        "id": 3,
        "first_name": "Lorry",
        "last_name": "Greeves",
        "email": "lgreeves2@ihg.com",
        "gender": "Male",
        "dob": "1/20/1997",
        "country": "Argentina",
        "phone": "755-748-3655"
    },
    {
        "id": 4,
        "first_name": "Hilary",
        "last_name": "Gainsford",
        "email": "hgainsford3@istockphoto.com",
        "gender": "Male",
        "dob": "5/24/1996",
        "country": "Portugal",
        "phone": "219-790-5537"
    },
    {
        "id": 5,
        "first_name": "Conn",
        "last_name": "Zywicki",
        "email": "czywicki4@newyorker.com",
        "gender": "Male",
        "dob": "3/28/2003",
        "country": "Brazil",
        "phone": "345-677-4534"
    },
    {
        "id": 6,
        "first_name": "Ansley",
        "last_name": "Heiner",
        "email": "aheiner5@pagesperso-orange.fr",
        "gender": "Female",
        "dob": "3/25/2002",
        "country": "Venezuela",
        "phone": "740-499-1987"
    },
    {
        "id": 7,
        "first_name": "Raffaello",
        "last_name": "Eynaud",
        "email": "reynaud6@va.gov",
        "gender": "Male",
        "dob": "12/12/1991",
        "country": "China",
        "phone": "193-216-7004"
    },
    {
        "id": 8,
        "first_name": "Merrielle",
        "last_name": "Tunkin",
        "email": "mtunkin7@toplist.cz",
        "gender": "Female",
        "dob": "3/16/2001",
        "country": "Indonesia",
        "phone": "978-636-7457"
    },
    {
        "id": 9,
        "first_name": "Georgena",
        "last_name": "Collacombe",
        "email": "gcollacombe8@addthis.com",
        "gender": "Female",
        "dob": "9/23/2020",
        "country": "Philippines",
        "phone": "891-464-0689"
    },
    {
        "id": 10,
        "first_name": "Danika",
        "last_name": "Spivie",
        "email": "dspivie9@1und1.de",
        "gender": "Female",
        "dob": "7/6/2014",
        "country": "Argentina",
        "phone": "269-622-4048"
    },
    {
        "id": 11,
        "first_name": "Hardy",
        "last_name": "Hubbucks",
        "email": "hhubbucksa@imgur.com",
        "gender": "Male",
        "dob": "8/19/1998",
        "country": "Philippines",
        "phone": "539-384-7689"
    },
    {
        "id": 12,
        "first_name": "Damiano",
        "last_name": "Spratling",
        "email": "dspratlingb@jalbum.net",
        "gender": "Male",
        "dob": "5/19/2008",
        "country": "Philippines",
        "phone": "961-401-4993"
    },
    {
        "id": 13,
        "first_name": "Evyn",
        "last_name": "Dury",
        "email": "eduryc@google.ca",
        "gender": "Genderfluid",
        "dob": "4/13/1995",
        "country": "Brazil",
        "phone": "752-707-4706"
    },
    {
        "id": 14,
        "first_name": "Ariadne",
        "last_name": "Fewless",
        "email": "afewlessd@umich.edu",
        "gender": "Female",
        "dob": "5/10/2006",
        "country": "China",
        "phone": "859-652-6482"
    },
    {
        "id": 15,
        "first_name": "Manny",
        "last_name": "Murdoch",
        "email": "mmurdoche@microsoft.com",
        "gender": "Male",
        "dob": "3/6/1990",
        "country": "Czech Republic",
        "phone": "770-436-2442"
    },
    {
        "id": 16,
        "first_name": "Dickie",
        "last_name": "Cowins",
        "email": "dcowinsf@apache.org",
        "gender": "Male",
        "dob": "3/11/2017",
        "country": "Philippines",
        "phone": "535-305-8954"
    },
    {
        "id": 17,
        "first_name": "Tome",
        "last_name": "Smieton",
        "email": "tsmietong@barnesandnoble.com",
        "gender": "Bigender",
        "dob": "1/4/2011",
        "country": "China",
        "phone": "945-561-4766"
    },
    {
        "id": 18,
        "first_name": "Benyamin",
        "last_name": "Hegden",
        "email": "bhegdenh@sciencedirect.com",
        "gender": "Genderqueer",
        "dob": "10/8/1992",
        "country": "United States",
        "phone": "816-270-3384"
    },
    {
        "id": 19,
        "first_name": "Amory",
        "last_name": "Panther",
        "email": "apantheri@so-net.ne.jp",
        "gender": "Male",
        "dob": "8/9/1999",
        "country": "China",
        "phone": "110-341-8227"
    },
    {
        "id": 20,
        "first_name": "Maxy",
        "last_name": "Critchley",
        "email": "mcritchleyj@foxnews.com",
        "gender": "Male",
        "dob": "5/12/2019",
        "country": "Poland",
        "phone": "917-540-0812"
    },
    {
        "id": 21,
        "first_name": "Sunshine",
        "last_name": "Clouter",
        "email": "sclouterk@columbia.edu",
        "gender": "Non-binary",
        "dob": "3/6/1994",
        "country": "Russia",
        "phone": "104-175-4515"
    },
    {
        "id": 22,
        "first_name": "Sybil",
        "last_name": "Calcutt",
        "email": "scalcuttl@mlb.com",
        "gender": "Female",
        "dob": "6/15/1993",
        "country": "Poland",
        "phone": "665-736-9418"
    },
    {
        "id": 23,
        "first_name": "Elvis",
        "last_name": "Belfield",
        "email": "ebelfieldm@51.la",
        "gender": "Male",
        "dob": "11/7/1990",
        "country": "Malaysia",
        "phone": "128-882-7173"
    },
    {
        "id": 24,
        "first_name": "Guillemette",
        "last_name": "Gleasane",
        "email": "ggleasanen@a8.net",
        "gender": "Female",
        "dob": "12/9/2009",
        "country": "Hungary",
        "phone": "356-715-7594"
    },
    {
        "id": 25,
        "first_name": "Gib",
        "last_name": "Durrant",
        "email": "gdurranto@netscape.com",
        "gender": "Male",
        "dob": "6/19/2018",
        "country": "China",
        "phone": "330-287-3569"
    },
    {
        "id": 26,
        "first_name": "Jeremias",
        "last_name": "Tarbard",
        "email": "jtarbardp@nsw.gov.au",
        "gender": "Male",
        "dob": "6/22/2007",
        "country": "China",
        "phone": "883-124-5610"
    },
    {
        "id": 27,
        "first_name": "Salvador",
        "last_name": "Fair",
        "email": "sfairq@angelfire.com",
        "gender": "Male",
        "dob": "5/8/1997",
        "country": "Philippines",
        "phone": "633-859-6487"
    },
    {
        "id": 28,
        "first_name": "Ermanno",
        "last_name": "Davidavidovics",
        "email": "edavidavidovicsr@nsw.gov.au",
        "gender": "Male",
        "dob": "6/27/2009",
        "country": "Philippines",
        "phone": "767-570-0083"
    },
    {
        "id": 29,
        "first_name": "Neille",
        "last_name": "Kembery",
        "email": "nkemberys@vistaprint.com",
        "gender": "Female",
        "dob": "7/15/2005",
        "country": "Philippines",
        "phone": "280-645-2082"
    },
    {
        "id": 30,
        "first_name": "Edith",
        "last_name": "Steutly",
        "email": "esteutlyt@fotki.com",
        "gender": "Female",
        "dob": "5/9/2011",
        "country": "China",
        "phone": "893-747-8715"
    },
    {
        "id": 31,
        "first_name": "Beatrix",
        "last_name": "Lilion",
        "email": "blilionu@lycos.com",
        "gender": "Female",
        "dob": "1/9/1994",
        "country": "Indonesia",
        "phone": "381-443-8007"
    },
    {
        "id": 32,
        "first_name": "Ellyn",
        "last_name": "Maskall",
        "email": "emaskallv@ox.ac.uk",
        "gender": "Female",
        "dob": "6/17/2007",
        "country": "Indonesia",
        "phone": "699-795-3423"
    },
    {
        "id": 33,
        "first_name": "Fawn",
        "last_name": "Wilber",
        "email": "fwilberw@barnesandnoble.com",
        "gender": "Female",
        "dob": "3/29/1999",
        "country": "Indonesia",
        "phone": "981-765-5544"
    },
    {
        "id": 34,
        "first_name": "Duncan",
        "last_name": "Stapylton",
        "email": "dstapyltonx@friendfeed.com",
        "gender": "Polygender",
        "dob": "12/9/1993",
        "country": "Serbia",
        "phone": "564-467-2122"
    },
    {
        "id": 35,
        "first_name": "Errick",
        "last_name": "Forgie",
        "email": "eforgiey@columbia.edu",
        "gender": "Male",
        "dob": "3/15/2019",
        "country": "Brazil",
        "phone": "723-779-4961"
    },
    {
        "id": 36,
        "first_name": "Cam",
        "last_name": "Constant",
        "email": "cconstantz@angelfire.com",
        "gender": "Female",
        "dob": "10/1/2022",
        "country": "Philippines",
        "phone": "936-885-8251"
    },
    {
        "id": 37,
        "first_name": "Howard",
        "last_name": "Noury",
        "email": "hnoury10@pen.io",
        "gender": "Male",
        "dob": "1/4/1998",
        "country": "Philippines",
        "phone": "508-114-1494"
    },
    {
        "id": 38,
        "first_name": "Kipper",
        "last_name": "Maseyk",
        "email": "kmaseyk11@vinaora.com",
        "gender": "Male",
        "dob": "5/28/1994",
        "country": "Pakistan",
        "phone": "830-227-9363"
    },
    {
        "id": 39,
        "first_name": "Evania",
        "last_name": "Morais",
        "email": "emorais12@ow.ly",
        "gender": "Female",
        "dob": "8/8/2010",
        "country": "China",
        "phone": "254-912-6929"
    },
    {
        "id": 40,
        "first_name": "Evania",
        "last_name": "Caustic",
        "email": "ecaustic13@so-net.ne.jp",
        "gender": "Bigender",
        "dob": "11/6/2019",
        "country": "Japan",
        "phone": "257-684-6279"
    },
    {
        "id": 41,
        "first_name": "Clo",
        "last_name": "Van Leeuwen",
        "email": "cvanleeuwen14@youtu.be",
        "gender": "Female",
        "dob": "3/9/1996",
        "country": "Thailand",
        "phone": "968-298-9555"
    },
    {
        "id": 42,
        "first_name": "Jessie",
        "last_name": "Soigoux",
        "email": "jsoigoux15@ameblo.jp",
        "gender": "Female",
        "dob": "8/3/2014",
        "country": "Bosnia and Herzegovina",
        "phone": "374-947-2076"
    },
    {
        "id": 43,
        "first_name": "Cecily",
        "last_name": "Rowden",
        "email": "crowden16@vistaprint.com",
        "gender": "Agender",
        "dob": "7/13/2017",
        "country": "Honduras",
        "phone": "868-478-3494"
    },
    {
        "id": 44,
        "first_name": "Jackson",
        "last_name": "Bratch",
        "email": "jbratch17@yahoo.com",
        "gender": "Male",
        "dob": "3/24/2007",
        "country": "Macedonia",
        "phone": "869-409-4136"
    },
    {
        "id": 45,
        "first_name": "Jamaal",
        "last_name": "Waye",
        "email": "jwaye18@army.mil",
        "gender": "Male",
        "dob": "10/5/1990",
        "country": "Argentina",
        "phone": "982-700-4146"
    },
    {
        "id": 46,
        "first_name": "Darnell",
        "last_name": "Skaid",
        "email": "dskaid19@noaa.gov",
        "gender": "Male",
        "dob": "1/18/2022",
        "country": "Brazil",
        "phone": "383-759-1676"
    },
    {
        "id": 47,
        "first_name": "Nicky",
        "last_name": "Lidgley",
        "email": "nlidgley1a@fastcompany.com",
        "gender": "Male",
        "dob": "10/8/1991",
        "country": "Morocco",
        "phone": "825-633-2760"
    },
    {
        "id": 48,
        "first_name": "Mimi",
        "last_name": "D'Adda",
        "email": "mdadda1b@illinois.edu",
        "gender": "Female",
        "dob": "9/10/2007",
        "country": "Japan",
        "phone": "524-469-8348"
    },
    {
        "id": 49,
        "first_name": "Cad",
        "last_name": "Cockshtt",
        "email": "ccockshtt1c@so-net.ne.jp",
        "gender": "Male",
        "dob": "4/1/2009",
        "country": "Costa Rica",
        "phone": "228-599-1986"
    },
    {
        "id": 50,
        "first_name": "Suzanne",
        "last_name": "Paybody",
        "email": "spaybody1d@uiuc.edu",
        "gender": "Female",
        "dob": "2/13/1995",
        "country": "China",
        "phone": "315-274-0728"
    }
]
```
### components/basicTable.js
```js
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
```
### components/table.js
```js
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
```
### pages/index.js
```js
import BasicTable from '@/components/basicTable';

const Home = () => {
  return (
    <div>
      <h1>React Table</h1>
      <BasicTable></BasicTable>
    </div>
  );
};

export default Home;
```
### styles/globals.css
```css
h1 {
    text-align: center;
}

table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

table td,
table th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

table tr:nth-child(even) {
    background-color: #f2f2f2;
}

table tr:hover {
    background-color: #ddd;
}

table th {
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: #04AA6D;
    color: white;
}
```