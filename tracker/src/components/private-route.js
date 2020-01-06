import React,{useState,useEffect,useContext} from "react";
import {Route,Redirect} from "react-router-dom";
import {Trackercontext} from "../context";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function Private ({component:Component,role,...rest}){
    let tempuser;
     if(localStorage["user"]){
         tempuser = jwt_decode(localStorage["user"])
         axios.defaults.headers.common["authorization"] = localStorage["user"];
     }
        

    return(
        <Route {...rest} render={()=> tempuser && (tempuser.role == "admin" || tempuser.role == role ) ?<Component {...rest} user={tempuser}/> :<Redirect to="/home"/>}/>
    )
}