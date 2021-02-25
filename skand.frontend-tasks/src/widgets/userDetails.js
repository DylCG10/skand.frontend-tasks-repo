import React, { Component, useState } from 'react';

// class UserDetails extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             data: data
//         }
//     }
// }


export default function UserDetails(data) {
    // const [userData, setUserData] = useState();
    // setData(data);
    console.log("DATA: ", data);
    return (
        <h1>{data.id}</h1>

    )
}