import React,{useEffect,useContext} from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {Trackercontext} from "../context";
import SigninForm from "./signin-form";
import QuickRoute from "./quick_route";




export default function Home(props){
    let store = useContext(Trackercontext);
   
  useEffect(()=>{
     (async ()=>{
       try{
            if(localStorage["user"]){
              let user = jwt_decode(localStorage["user"]);
              store.adduser(user);
              axios.defaults.headers.common["authorization"] = localStorage["user"];
              let request = await axios.get("/api/user/get-all-request");
              console.log(request)
              store.addrequest(request.data.request);
              
          }
       }catch(err){
         console.log("an error on home ")
       }
      
    })()
    return ()=>{
      store.removerequest()
    }
  },[]);
    return(
        <div className="row">
          <div className="col-sm-8"></div>
          <div className="col-sm-4">
            {!store.user && <SigninForm/>}
            {store.user && <QuickRoute user={store.user} request={store.request} />}
          </div>
        </div>
    )
}