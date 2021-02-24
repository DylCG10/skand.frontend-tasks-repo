import React, {Component} from "react";
import { useEffect, useState } from "react";
//import styled from "styled-components";
import { useTable } from "react-table";
import { useParams } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';


import getUsers from '../mockServer/users/index';
import { widgetRequest, widgetCreate } from './actions';

import Messages from '../notifications/Messages';
import Errors from '../notifications/Errors';

class Widgets extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        invalid: PropTypes.bool.isRequired,
        client: PropTypes.shape({
            id: PropTypes.number.isRequired,
            token: PropTypes.object.isRequired,
        }),
        widgets: PropTypes.shape({
            list: PropTypes.array,
            requesting: PropTypes.bool,
            successful: PropTypes.bool,
            messages: PropTypes.array,
            errors: PropTypes.array,
        }).isRequired,
        widgetCreate: PropTypes.func.isRequired,
        widgetRequest: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,

    }

    constructor(props) {
        super(props);
        console.log("WIDGETS");

        this.fetchUsers();
    }

    fetchUsers = () => {
        const { client, widgetRequest } = this.props;
        console.log("client: ", client);
        if (client && client.token) return widgetRequest(client);
        return false;
    }

    render() {
        const {
            handleSubmit,
            invalid,
            widgets: {
                list,
                requesting,
                successful,
                messages,
                errors,
            },
        } = this.props;

        return (
            <div>
                <h1>Widgets</h1>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    client: state.client,
    widgets: state.widgets,
});
    
const connected = connect(mapStateToProps, { widgetCreate, widgetRequest })(Widgets);
const formed = reduxForm({
    form: 'widgets'
})(connected);

export default formed;


// export default function () {
//     // let { userId } = useParams();

//     useEffect(() => {
//         fetchItems();
//     }, []);

//     const fetchItems = async () => {
//         const data = await fetch('/api/v2/users');

//         const items = await data.json();

//         console.log(data);
//     }

//     return (
//         <div>
//             <h1>HI</h1>
//         </div>
//     )
// }

// function Table({ columns, data }) {
//     // Use the state and functions returned from useTable to build your UI
//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         rows,
//         prepareRow
//     } = useTable({
//         columns,
//         data
//     });
    
//     // Render the UI for your table
//     return (
//         <table {...getTableProps()}>
//         <thead>
//             {headerGroups.map((headerGroup) => (
//             <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map((column) => (
//                 <th {...column.getHeaderProps()}>{column.render("Header")}</th>
//                 ))}
//             </tr>
//             ))}
//         </thead>
//         <tbody {...getTableBodyProps()}>
//             {rows.map((row, i) => {
//             prepareRow(row);
//             return (
//                 <tr {...row.getRowProps()}>
//                 {row.cells.map((cell) => {
//                     // console.log("cell: ", cell);
//                     // console.log("row: ", String(cell.value));

//                     return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
//                 })}
//                 </tr>
//             );
//             })}
//         </tbody>
//         </table>
//     );
// }

// function UsersIndexTable() {
//     console.log("users");
    
//     const columns = React.useMemo(
//         () => [
//             {
//                 Header: "ID",
//                 accessor: "id"
//             },
//             {
//                 Header: "Email",
//                 accessor: "email"
//             },
//             {
//                 Header: "Jobs Count",
//                 accessor: "jobs_count"
//             },
//             {
//                 Header: "Active",
//                 accessor: "active"
//             }
//         ],
//         []
//     );

//     return (
//         <Table columns={columns} data={getUsers.data} />
//     );
// }

// export default UsersIndexTable;




































// const userData = fetch("/api/v2/users").then((schema, request) => {
    //     console.log("FETCHED");
    //     console.log(request);

    // }).catch(() => {
    //     console.log("ERROR")
    // });

    // console.log("user data: ", userData);




// const data = React.useMemo(() => makeData(20), []);
    
    
//   const data = React.useMemo(
//     () => [
//       {
//         id: "5f07599680b803abb0997c15",
//         email: "test1@skand.io",
//         first_name: "Test",
//         last_name: "User 1",
//         jobs_count: 1,
//         active: true,
//         slack_username: "U57V3NH8W"
//       },
//       {
//         id: "5f27e597364664a7f3770f92",
//         email: "random@gmail.com",
//         first_name: "Random",
//         last_name: "Gmail",
//         jobs_count: 12,
//         active: true,
//         slack_username: "ES9V3NH2A"
//       },
//       {
//         id: "5f27e588ef01b4a7d615c377",
//         email: "size@skand.io",
//         first_name: "Size",
//         last_name: "ASDF",
//         jobs_count: 30,
//         active: false,
//         slack_username: null
//       },
//       {
//         id: "5f27e51be071e6a778ed6bbd",
//         email: "ml@skand.io",
//         first_name: "Machine",
//         last_name: "Learning",
//         jobs_count: 0,
//         active: true,
//         slack_username: "ES9V3AH2A"
//       },
//       {
//         id: "5f27e481c7956fa728038b15",
//         email: "YAhOO@yahoo.com",
//         first_name: "Yahoo",
//         last_name: "Com",
//         jobs_count: 1,
//         active: true,
//         slack_username: null
//       },
//       {
//         id: "5f21101d2ec106dfbe585335",
//         email: "acceleration@skand.io",
//         first_name: "Accelerate",
//         last_name: "Velocity",
//         jobs_count: 2,
//         active: true,
//         slack_username: ""
//       },
//       {
//         id: "5f2110142ec106dfbe585331",
//         email: "community@skand.io",
//         first_name: "Community",
//         last_name: "Friendly",
//         jobs_count: 0,
//         active: true,
//         slack_username: ""
//       }
//     ],
//     []
//   );
