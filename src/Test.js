import * as React from "react";
import { GetUserbyEmail,GetUserbyId,AddUser,EditUser } from "./dataLayer/appAccesss";
import bgimage from './static/nashville.png';

export const Test = () =>{
    // const [user, setObj] = React.useState({});
React.useEffect(() =>{
    const userAdd = {
        email: "flo@prog.com",
        id: 2,
        isAdmin: false,
        moderator: false,
        name: "Flow Annoying",
        password: "pass1234"}
        EditUser(userAdd)
    .then(res => {
            // if(res.length > 0){
            //     alert(res[0].name)
            // }
            let r = 9;
            
    })

}, []);


    return (<><div style={{ backgroundImage:{bgimage}, lineHeight : 2, padding: 1 }}>dsfsdff</div><h1>I am home</h1></>);
}
// {
// email: "cdouglass516@gmail.com"
// id: 0
// isAdmin: true
// moderator: false
// name: "Chris Douglass"
// password: "pass1234"}3