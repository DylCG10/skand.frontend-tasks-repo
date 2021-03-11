import React, {Component} from "react";
import { useEffect, useState } from "react";
//import styled from "styled-components";
import { useTable } from "react-table";
import { useParams, Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { createBrowserHistory } from 'history';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import getUsers from '../mockServer/users/index';
import { widgetRequest, widgetCreate, widgetRequestSuccess, widgetDelete } from './actions';

import UserDetails from './userDetails';

import Messages from '../notifications/Messages';
import Errors from '../notifications/Errors';

import '../css/widgets.css';
import { Pagination }  from "./Pagination";

const browserHistory = createBrowserHistory();


// function Table({ columns, data }){
    
//     const viewData = (id) => {

//         console.log("view user: ", id);
        
//         Widgets.singleUser(id);
//         // console.log("here: ", userData);
//         browserHistory.push(`/users/${id}`);

//         // UserDetails(userData.users);

//     }

//     const editData = (id) => {

//         console.log("edit");
//         browserHistory.push(`/edit/${id}`);
        
//     }
//     const removeData = (id) => {

//         console.log("delete");
//     }

//     const renderHeader = () => {
//         let headerElement = ['id', 'email', 'Jobs Count', 'Active', 'operation']

//         return headerElement.map((key, index) => {
//             return <th key={index}>{key.toUpperCase()}</th>
//         })
//     }


//     const renderBody = () => {
//         return data && data.map(({ id, email, jobs_count, active }) => {
//             return (
//                 <tr key={id}>
//                     <td>{id}</td>
//                     <td>{email}</td>
//                     <td>{jobs_count}</td>
//                     <td>{active}</td>
//                     <td className='opration'>
//                         <button className='button' onClick={() => viewData(id)}>View</button>
//                         <button className='button' onClick={() => editData(id)}>Edit</button>
//                         <button className='button' onClick={() => removeData(id)}>Delete</button>
//                     </td>
//                 </tr>
//             )
//         }) 
//     }
    
//     return (
//         <>
//             <h1 id='title'>React Table</h1>
//             <table id='Data'>
//                 <thead>
//                     <tr>{renderHeader()}</tr>
//                 </thead>
//                 <tbody>
//                     {renderBody()}
//                 </tbody>
//             </table>
//         </>
//     )
// }

const renderHeader = () => {
    let headerElement = ['id', 'email', 'Jobs Count', 'Active', 'operation']

    return headerElement.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
    })
}

const validationSchema = Yup.object().shape({
    id: Yup.string()
        .required('ID is required'),
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
    jobs_count: Yup.string()
        .required('Jobs Count is required'),
    active: Yup.string().required("Active status is required")
});

const isAddMode = false;
const isEditMode = false;

const postsPerPage = 3;
let currentPage;
let indexOfLastPost;
let indexOfFirstPost;

class Widgets extends Component {
    // function Widgets () {
    // static propTypes = {
    //     handleSubmit: PropTypes.func.isRequired,
    //     invalid: PropTypes.bool.isRequired,
    //     client: PropTypes.shape({
    //         id: PropTypes.number.isRequired,
    //         token: PropTypes.string.isRequired
    //     }),
    //     widgets: PropTypes.shape({
    //         list: PropTypes.array,
    //         requesting: PropTypes.bool,
    //         successful: PropTypes.bool,
    //         messages: PropTypes.array,
    //         errors: PropTypes.array,
    //     }).isRequired,
    //     widgetCreate: PropTypes.func.isRequired,
    //     widgetRequest: PropTypes.func.isRequired,
    //     reset: PropTypes.func.isRequired,

    // }

    constructor(props) {
        super(props);
        console.log("WIDGETS: ", this.props.widgets.list);

        if (this.props.widgets.list === undefined || this.props.widgets.list.length === 0) {
            console.log("fetching users");
            this.fetchUsers();
        }

        this.state = {
            isAddMode: false,
            showingSingleUser: null,
            currentPage: 1, //start of changes
            indexOfLastPost: 2, //make dynamic,
            indexOfFirstPost: 0,
            currentPosts: this.props.widgets.list.slice(indexOfFirstPost, indexOfLastPost),
            filterStr: '',
            filteredPosts: [],



        }
        // console.log(getUsers.data);
        // const { client, widgetRequest } = this.props;

    }

    async componentDidMount() {
        console.log("hi");
        await this.setState({ indexOfLastPost: this.state.currentPage * postsPerPage });
        await this.setState({ indexOfFirstPost: this.state.indexOfLastPost - postsPerPage });
        await this.setState({ currentPosts: this.props.widgets.list.slice(this.state.indexOfFirstPost, this.state.indexOfLastPost) });
        // console.log("list: ", this.props.widgets.list.slice(this.state.indexOfFirstPost,this.state.indexOfLastPost));
        this.setState({filteredPosts: this.props.widgets.list})
        console.log("state: ", this.state);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log(prevProps.widgets.list, this.props.widgets.list);
        // if (prevProps.widgets.list !== this.props.widgets.list)
        //     this.fetchUsers();
    }

    fetchUsers = () => {
        const { client, widgetRequest } = this.props;
        console.log("clientasdf: ", this.props.client);
        if (this.props.client && this.props.client.token) return widgetRequest(this.props.client, null);
        return false;
    }

    // singleUser = (id) => {
    //     const { client, widgetRequest } = this.props;
    //     console.log(this.props.client);
    //     if (this.props.client && this.props.client.token) return widgetRequest(this.props.client, true);

    // }

    onSubmit = () => {
        console.log("Form submitted");
    }

    viewData = async (id) => {

        console.log("view user: ", this.props.client);
        // await this.props.widgetRequest(this.props.client, id);
        // const user = this.props.widgets.list;

        browserHistory.push(`/users/${id}`);
        // UserDetails(user);


        // UserDetails(userData.users);

    }

    editData = (id) => {
        //isEditMode = true;

        console.log("edit");
        browserHistory.push(`/edit/${id}`);
        const user = this.props.widgets.list;
        console.log(user);

        // return <UserDetails user={this.props.widgets.list} />
        //UserDetails(user);

        const initialValues = {
            id: user.id,
            email: user.email,
            jobs_count: user.jobs_count,
            active: user.active,
        }

        
    }
    removeData = async (id) => {

        console.log("delete");

        const prevList = this.props.widgets.list;
        console.log('prevList: ', prevList);
        this.props.widgetDelete(this.props.client, id);
        // this.props.widgetRequest(this.props.client);

        // this.props.widgets.list.filter(widget => prevList.indexOf(widget) > -1)
        console.log("COMPARE: ", "props: ", this.props.widgets.list, prevList);
    }

    handleFilterChange = e => {
        const value = e.target.value || undefined;
        this.setState({ filterInput: value })
    }

    renderBody = (data) => {
        // console.log("DATA: ", this.props.widgets.list);
        // console.log(window.location.pathname);
        // const data = this.props.widgets.list;
        console.log("data1: ", data);
        if (window.location.pathname === "/users") {
            
            return data && data.map(({ id, email, jobs_count, active }) => {
                return (
                    <>
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{email}</td>
                            <td>{jobs_count}</td>
                            <td>{typeof active === "boolean" ? JSON.stringify(active) : active}</td>
                            <td className='operation'>
                                <Link to={`/users/${id}`}>View</Link>
                                {/* <button className='button' onClick={() => {
                                    this.setState({ showingSingleUser: this.props.widgets.list.filter(user => user.id === id) });
                                }}>View</button> */}
                                <button className='button' onClick={() => this.removeData(id)}>Delete</button>

                            </td>
                        </tr>
                        
                    </>
                )
            })
        }
    }

    

    paginate = async pageNumber => {
        console.log("paginate: ", this.state.currentPage, pageNumber);
        await this.setState({ currentPage: pageNumber });
        console.log(this.state.currentPage, postsPerPage, this.state.currentPage *postsPerPage);
        await this.setState({ indexOfLastPost: this.state.currentPage * postsPerPage });
        await this.setState({ indexOfFirstPost: this.state.indexOfLastPost - postsPerPage });
        // await this.setState({ currentPosts: this.props.widgets.list.slice(this.state.indexOfFirstPost, this.state.indexOfLastPost) });
        await this.setState({ currentPosts: this.state.filteredPosts.slice(this.state.indexOfFirstPost, this.state.indexOfLastPost) });
        console.log("state: ", this.state);

    }

    filterState = async e => {
        await this.setState({filterStr: e.target.value});
        console.log("current posts1: ", this.state.currentPosts);
        console.log("input: ", this.state.filterStr)
        console.log("filtered: ", this.state.currentPosts.filter(element => element.email.includes(this.state.filterStr)));
        // await this.setState({filteredPosts: this.state.currentPosts.filter(element => element.email.includes(this.state.filterStr))});
        await this.setState({filteredPosts: this.props.widgets.list.filter(element => element.email.includes(this.state.filterStr))});
        await this.setState({currentPosts: this.state.filteredPosts.slice(this.state.indexOfFirstPost, this.state.indexOfLastPost)})
        console.log("filtered / current posts: ", this.state.filteredPosts, this.state.currentPosts);
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
                    <>
                        <h1 id='title'>Widgets</h1>
                        <label>Filter email:</label>
                        <input type = "text" value = {this.state.filterStr} onChange = {this.filterState} />
                        <br></br>
                        <label>Filter active status:</label>

                        {/*Add ACTIVE FILTER */}
                        {/* <label>Active</label>
                                    <Field name="active" as="select">
                                        <option value="True">True</option>
                                        <option value="False">False</option>
                                    </Field>
                                     */}
                                     
                        <table id='Data'>
                            <thead>
                                <tr>{renderHeader()}</tr>
                            </thead>
                            <tbody>
                                {console.log("actual data: ", this.props.currentPosts)}
                                {this.renderBody(this.state.currentPosts)} {/* changed from this.props.widgets.list -> this.state.currentPosts */}
                            </tbody>
                        </table>
                        <Link to={"/users/add"}>Create User</Link>
                    </>
                    <Pagination postsPerPage={postsPerPage} totalPosts={this.state.filteredPosts.length} paginate={this.paginate} />
                </div>
            )
        // }
        
        // return (
        //     // console.log("STUFF: ", this.props.widgets.list, this.state.showingSingleUser)
        //     <UserDetails2 list={this.props.widgets.list} user = {this.state.showingSingleUser[0]} client = {this.props.client} />
        // )
    }
}
                    /* 
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={this.onSubmit}>
                            {({ errors, touched, isSubmitting, setFieldValue }) => {
                                const [user, setUser] = useState({});
                                const [showPassword, setShowPassword] = useState(false);

                                useEffect(() => {
                                    if (!isAddMode) {
                                        // get user and set form fields
                                        console.log("update user");
                                        // userService.getById(id).then(user => {
                                        //     const fields = ['title', 'firstName', 'lastName', 'email', 'role'];
                                        //     fields.forEach(field => setFieldValue(field, user[field], false));
                                        //     setUser(user);
                                        // });
                                    }
                                }, []);

                                return (
                                    <Form>
                                        <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
                                        <div className="form-row">
                                            <div className="form-group col">
                                                <label>Title</label>
                                                <Field name="title" as="select" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')}>
                                                    <option value=""></option>
                                                    <option value="Mr">Mr</option>
                                                    <option value="Mrs">Mrs</option>
                                                    <option value="Miss">Miss</option>
                                                    <option value="Ms">Ms</option>
                                                </Field>
                                                <ErrorMessage name="title" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col-5">
                                                <label>First Name</label>
                                                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col-5">
                                                <label>Last Name</label>
                                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-7">
                                                <label>Email</label>
                                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col">
                                                <label>Role</label>
                                                <Field name="role" as="select" className={'form-control' + (errors.role && touched.role ? ' is-invalid' : '')}>
                                                    <option value=""></option>
                                                    <option value="User">User</option>
                                                    <option value="Admin">Admin</option>
                                                </Field>
                                                <ErrorMessage name="role" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        {!isAddMode &&
                                            <div>
                                                <h3 className="pt-3">Change Password</h3>
                                                <p>Leave blank to keep the same password</p>
                                            </div>
                                        }
                                        <div className="form-row">
                                            <div className="form-group col">
                                                <label>
                                                    Password
                                            {!isAddMode &&
                                                        (!showPassword
                                                            ? <span> - <a onClick={() => setShowPassword(!showPassword)} className="text-primary">Show</a></span>
                                                            : <span> - {user.password}</span>
                                                        )
                                                    }
                                                </label>
                                                <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                                <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                            </div>
                                            <div className="form-group col">
                                                <label>Confirm Password</label>
                                                <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        Save
                                    </button>
                                            <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
                                        </div>
                                    </Form>
                                );
                            }}
                        </Formik> */
              
     



const mapStateToProps = state => ({
    client: state.client,
    widgets: state.widgets,
});
    
const connected = connect(mapStateToProps, { widgetCreate, widgetRequest, widgetDelete })(Widgets);
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
