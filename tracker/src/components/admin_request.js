import React,{useEffect,useState} from "react"
import {NavLink} from "react-router-dom";
import axios from "axios";


export function Admin_req({request,setallreq}){
       let [reject,setreject] = useState(false);
       let [accept,setaccept] = useState(false);
       let [resolve,setresolve] = useState(false);
       let onreject = ()=>{
           setreject(true)
       }
       let onaccept = ()=>{
           setaccept(true)
       }
       let onresolve = ()=>{
           setresolve(true)
       }

         useEffect(()=>{
            (async()=>{
                if(reject){
                    try{
                        await axios.get(`/api/admin/reject-request/${request._id}`)
                        setallreq(oldreq=>{
                            return oldreq.filter(data=>data._id != request._id)
                                  }) 
                        setreject(false)
                    }catch(err){
                        setreject(false)
                        console.log("error reject")
                    }
                    
                }
                if(accept){
                    try{
                        await axios.get(`/api/admin/accept-request/${request._id}`)
                        setallreq(oldreq=>{
                            return oldreq.filter(data=>data._id != request._id)
                                  })
                        setaccept(false)
                    }catch(err){
                        setaccept(false)
                        console.log("error accept")
                    }
                }
                if(resolve){
                    try{
                        let data = await axios.get(`/api/admin/resolve-request/${request._id}`)
                        setallreq(oldreq=>{
                            return oldreq.filter(data=>data._id != request._id)
                                  }
        
                            )
                        setresolve(false)
                    }catch(err){
                        setresolve(false)
                        console.log("error resolve")
                    }
                   
                }
              
            })()
         },[reject,accept,resolve])
    return(
        <div className="col-sm-12">
            <div className="panel panel-default">
                    <div className="panel-heading ">
                        <span> <b> {request.user && request.user.username}</b>  {request && request.date} </span>
                        <span className="pull-right">
                            {request.request_status == "pending"&&<button className=" text-danger req-btn" id="reject" onClick={onreject}>Reject</button>}
                            {request.request_status == "pending"&&<button className="text-primary req-btn"  id="accept"onClick={onaccept}>Accept</button>}
                            {request.request_status == "accepted" &&<button className="text-primary req-btn"  id="resolve"onClick={onresolve}>Resolve</button>}
                        </span>
                    </div>
                    <div className="panel-body">
                        <p>{request.request_content}</p>
                    </div>
                    <div className="panel-footer">
                        <span><b>REQ_ID</b> {request._id}</span>
                    </div>
            </div>
        </div>
    )
}
