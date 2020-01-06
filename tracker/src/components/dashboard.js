import React,{useEffect,useContext,useState} from "react";
import {NavLink} from "react-router-dom"
import {Trackercontext} from "../context";
import axios from "axios";

export default function Dashboard(props){
    let {request,addrequest,removerequest}= useContext(Trackercontext);
    let [p_r_length,set_p_r_length] = useState(0);
    let [a_r_length,set_a_r_length] = useState(0);
    let [r_r_length,set_r_r_length] = useState(0);
    let [res_r_length,set_res_r_length] = useState(0);
useEffect(()=>{
      (async ()=>{
          try{
                if(request.length == 0){
                    
                }
                let responserequest = await axios.get("/api/user/get-all-request");
                    addrequest(responserequest.data.request);
                 set_p_r_length(request.filter(((data)=> data.request_status == "pending")).length);
                 set_a_r_length(request.filter(((data)=> data.request_status == "accepted")).length);
                 set_r_r_length(request.filter(((data)=> data.request_status == "rejected")).length);
                 set_res_r_length(request.filter(((data)=> data.request_status == "resolved")).length);
          }catch(err){

          }
          
      })();
      
},[request,p_r_length,r_r_length,res_r_length,a_r_length]);
    
    return(
        <div className="row">
             <div className="col-sm-12">
                 <div className="row" style={{marginTop:"10px"}}>
                     <div className="col-sm-3">
                        <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h3 className="panel-title text-center">Your Dashboard</h3>
                                </div>
                                <div className="panel-body rm-padding-lr rm-padding-tb">
                                        <ul className="list-group text-center ">
                                            <li className="list-group-item rm-borderline "> <NavLink to="/editprofile" >Edit Profile</NavLink></li>
                                            <li className="list-group-item rm-borderline"><NavLink to="/changepassword" >Change Password</NavLink></li>
                                           {props.user && props.user.role == "admin" && <li className="list-group-item rm-borderline"><NavLink to="/admin" >Admin</NavLink></li>}
                                        </ul>
                                   
                                    
                                </div>
                        </div>
                     </div>
                     <div className="col-sm-9">
                         <div className="panel panel-default">
                             <div className="panel-heading">
                                <h3 className="panel-title text-center">Your Request</h3>    
                             </div>
                             <div className="panel-body rm-padding-lr rm-padding-tb ">
                                 <div className="row">
                                     <div className="col-sm-12">
                                         <div className="row">
                                             <div className="col-sm-2">
                                                <NavLink to="/create-request" className="text-center mk-block"><b>Create Request</b></NavLink>
                                             </div>
                                             <div className="col-sm-2">
                                                  <NavLink to="/accepted-request" className="text-center mk-block"><b>Accepted Request ({a_r_length})</b></NavLink>
                                             </div>
                                             <div className="col-sm-2">
                                                 <NavLink to="/rejected-request" className="text-center mk-block"><b>Rejected Request ({r_r_length})</b></NavLink>
                                             </div>
                                             <div className="col-sm-2">
                                                 <NavLink to="/resolved-request" className="text-center mk-block"><b>Resolved Request ({res_r_length})</b></NavLink>
                                             </div>
                                             <div className="col-sm-2">
                                                 <NavLink to="/pending-request" className="text-center mk-block"><b>Pending Request({p_r_length})</b></NavLink>
                                             </div>
                                         </div>
                                     </div>
                                 </div>
                                  
                                   
                                   
                                    
                             </div>

                         </div>
                     </div>
                 </div>
             </div>
        </div>
    )
}