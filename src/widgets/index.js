import React, {Component} from "react";

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { createBrowserHistory } from 'history';

import { widgetRequest, widgetCreate, widgetDelete } from './actions';
import { logoutRequest } from '../login/actions';



import { Pagination } from "./Pagination";
import { Table, Button, Row } from "react-bootstrap";

import '../css/widgets.css';

const browserHistory = createBrowserHistory();


const renderHeader = () => {
    let headerElement = ['id', 'email', 'Jobs Count', 'Active', '']

    return headerElement.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>
    })
}


const postsPerPage = 3;
let indexOfLastPost;
let indexOfFirstPost;

class Widgets extends Component {
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
            filterActive: false,
            showAll: true,
            filteredPosts: [],



        }


    }

    async componentDidMount() {

        console.log("hi");
        await this.setState({ indexOfLastPost: this.state.currentPage * postsPerPage });
        await this.setState({ indexOfFirstPost: this.state.indexOfLastPost - postsPerPage });
        await this.setState({ currentPosts: this.props.widgets.list.slice(this.state.indexOfFirstPost, this.state.indexOfLastPost) });

        this.setState({ filteredPosts: this.props.widgets.list })

        document.getElementById("showall-checkbox").checked = true

    }

    fetchUsers = () => {

        const { widgetRequest } = this.props;
        console.log("clientasdf: ", this.props.client);
        if (this.props.client && this.props.client.token) return widgetRequest(this.props.client, null);
        return false;
    }

    onSubmit = () => {
        console.log("Form submitted");
    }

    viewData = async (id) => {

        console.log("view user: ", this.props.client);

        browserHistory.push(`/users/${id}`);
        window.location.reload();

    }

    editData = (id) => {

        console.log("edit");
        browserHistory.push(`/edit/${id}`);
        window.location.reload();

        const user = this.props.widgets.list;
        console.log(user);
    }

    removeData = async (id) => {

        console.log("delete");

        const prevList = await this.props.widgets.list;
        console.log('prevList: ', prevList);
        await this.props.widgetDelete(this.props.client, id);

        console.log("COMPARE: ", "props: ", this.props.widgets.list, prevList);
    }

    logout() {
        this.props.logoutRequest(this.props.client);
    }

    handleFilterChange = e => {
        const value = e.target.value || undefined;
        this.setState({ filterInput: value });
    }

    renderBody = (data) => {
        if (window.location.pathname === "/users") {
            console.log(data);
            return data && data.map(({ id, email, jobs_count, active }) => {
                return (
                    <tr key={id}>
                        <td>{id}</td>
                        <td>{email}</td>
                        <td>{jobs_count}</td>
                        <td>{active.toString()} {/*{typeof active === "boolean" ? JSON.stringify(active) : active} */}</td>
                        <td className='operation'>
                            {/* <Link to={`/users/${id}`} onClick = {() => window.location.reload()}>View</Link> */}
                            {/* <Link onClick = {this.reload(id)}>View</Link> */}
                            
                            <Row>
                                <Button className = "btn btn-logo" onClick={() => {
                                    this.viewData(id);
                                    // window.location.reload()
                                }
                                }>
                                    <img src = "/edit_icon.png"></img></Button>
                                <Button className='btn btn-logo' size = "sm" onClick={() => {
                                    this.removeData(id);
                                    // window.location.reload()
                                }
                                }><img src = "/bin_icon.png"/></Button>

                            </Row>

                        </td>
                    </tr>
                )
            })
        }
    }

    

    paginate = async pageNumber => {
        await this.setState({ currentPage: pageNumber });
        await this.setState({ indexOfLastPost: this.state.currentPage * postsPerPage });
        await this.setState({ indexOfFirstPost: this.state.indexOfLastPost - postsPerPage });

        await this.setState({ currentPosts: this.state.filteredPosts.slice(this.state.indexOfFirstPost, this.state.indexOfLastPost) });

    }

    filterCheckbox = async e => {
        await this.setState({ filterActive: e.target.checked });

        await this.setState({filteredPosts: this.state})

    }

    filterState = async e => {
        const event = e;

        if (e.target.type === "text") {
            console.log("text");
            await this.setState({ filterStr: e.target.value.toLowerCase() });
    

        }
        
        else {
            console.log("value: ", event.target.id);

            if (event.target.id === "active-checkbox")
                await this.setState({ filterActive: event.target.checked })
            else
                await this.setState({ showAll: event.target.checked})
        }

        await this.setState({filteredPosts: this.props.widgets.list.filter(element => element.email.toLowerCase().includes(this.state.filterStr) && element.active === this.state.filterActive)})
        
        if (this.state.showAll)
            await this.setState({ filteredPosts: this.props.widgets.list })
        
        await this.setState({ currentPosts: this.state.filteredPosts.slice(this.state.indexOfFirstPost, this.state.indexOfLastPost) })

    }

    reload = id => e => {
        if (id)
            browserHistory.push(`/users/${id}`)
        else
            browserHistory.push("/users/add");
        window.location.reload();
    }

    

    render() {
        return (
            <div className="widgets-page">
                <h1 id='title'>Skand: Employees</h1>
                {/* <Button className = "btn" variant = "primary" id = "logout-button" onClick={() => this.logout()}>Logout</Button> */}

                <div class="filters">
                    <div className = "filter-group">
                        <label>Filter email:</label>
                        <input type = "text" value = {this.state.filterStr} onChange = {this.filterState} />
                    
                    </div>
                    <div className ="filter-group">
                        <label>Filter active status:</label>
                        <input id = "active-checkbox" type = "checkbox" value = {this.state.filterActive} onChange = {this.filterState} />
                    </div>
                    <div className ="filter-group">
                        <label>Show all</label>
                        <input id = "showall-checkbox" type = "checkbox" value = {this.state.showAll} onChange = {this.filterState} />

                    </div>
                </div>
                                     
                {/* <table id='Data'> */}
                <Table hover borderless responsive="sm">
                    <thead>
                        <tr>{renderHeader()}</tr>
                    </thead>
                    <tbody>
                        {console.log("actual data: ", this.props.currentPosts)}
                        {this.renderBody(this.state.currentPosts)} 
                    </tbody>
                    {/* </table> */}
                </Table>
            <Pagination postsPerPage={postsPerPage} totalPosts={this.state.filteredPosts.length} paginate={this.paginate} />
            {/* <Link to={"/users/add"} onClick = {() => window.location.reload()}>Create User</Link> */}
            <Link onClick = {this.reload(false)}>Create User</Link>

            </div>
            )
    }
}
              
    
const mapStateToProps = state => ({
    client: state.client,
    widgets: state.widgets,
});
    
const connected = connect(mapStateToProps, { widgetCreate, widgetRequest, widgetDelete, logoutRequest  })(Widgets);
const formed = reduxForm({
    form: 'widgets'
})(connected);

export default formed;