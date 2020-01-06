import React,{useContext,useState,useEffect} from "react";
import {NavLink,withRouter} from "react-router-dom";
import {Trackercontext} from "../context";
import jwt_decode from "jwt-decode";

 function Header(props){
let {removeuser,adduser,user} = useContext(Trackercontext);
let activestyle = {color:"pink"};
let myclick = (e)=>{
    e.preventDefault();
    delete localStorage["user"];
   removeuser();
 props.history.push("/home");
}
useEffect(()=>{
    if(!user && localStorage["user"]){
        adduser(jwt_decode(localStorage["user"]))
    }
},[user])
    return(
            <div className="flex-container flex-row flex-justify mynavbar">
                <div>
                    <NavLink to="/home" className ="btn mynavbar-btn"activeClassName="mynavbar-btn-active">Home</NavLink>
                </div>
                <div>
                    {user &&<NavLink to="/Signout"  activeClassName="mynavbar-btn-active" className ="btn mynavbar-btn" onClick={myclick}>Signout</NavLink>}
                    {user &&<NavLink to="/Dashboard" activeClassName="mynavbar-btn-active" className ="btn mynavbar-btn">Dashboard</NavLink>}
                    {!user &&<NavLink to="/signin"  activeClassName="mynavbar-btn-active" className ="btn mynavbar-btn">Signin</NavLink>}
                    {!user &&<NavLink to="/Signup" activeClassName="mynavbar-btn-active" className ="btn mynavbar-btn">Signup</NavLink>}


                </div>
            </div>
        
    )
}
export default withRouter(Header);