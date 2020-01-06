import React,{useReducer} from "react";
import {userReducer,reqReducer} from "./reducer";
import {Trackercontext} from "./context"

export function Trackerstore(props){
let [user,dispatch] = useReducer(userReducer,{user:null})//this is the state manager that functions just like redux
let [request,disRequest] = useReducer(reqReducer,[]);

let addrequest = (data)=>{
     disRequest({type:"add_request",payload:data});
}
let removerequest = ()=>{
     disRequest({type:"remove_request"});
}

let adduser = (data)=>{
     dispatch({type:"add_user",payload:data});
}
let removeuser = ()=>{
     dispatch({type:"remove_user"});
}


return (
    <Trackercontext.Provider value={{user:user.user,adduser,removeuser,request,addrequest,removerequest}}>
          {props.children}
     </Trackercontext.Provider>
)
}
