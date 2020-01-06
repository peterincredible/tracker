import React,{useEffect,useState,useContext} from "react";
import {withRouter} from "react-router-dom";
import {Request} from "./request";
import {Trackercontext} from "../context";
import axios from "axios";
import {animated,useTransition} from "react-spring";

function Reject_request(props){
    let {request,addrequest,removerequest}= useContext(Trackercontext);
    let[tempreq,settempreq] = useState(request.filter((req)=>req.request_status == "rejected"))
    let Transition = useTransition(tempreq,data=>data._id,{trail:400,from:{ transform:"translatex(50px)",opacity:0}
    ,enter:{transform:"translatex(0)",opacity:1}
})
    useEffect(()=>{
        (async ()=>{
           try{
                if(tempreq.length == 0){
                    let responserequest = await axios.get("/api/user/get-all-request");
                    settempreq(responserequest.data.response.filter((req)=>req.request_status == "rejected"));
                    addrequest(responserequest.data.request);
                }
           }catch(err){

           }
        })()
    },[tempreq])
    return (
        <div className="row">
        <div className="col-sm-4 col-sm-offset-4 ">
            <h1 className="text-center"> Rejected Requests</h1>
            {tempreq.length > 0 ?
                 /*tempreq.map((req,i)=><Request request={req} key={i}/>)*/
                 Transition.map(({key,item,props})=>
                 <animated.div key={key} style={props}>
                     <Request request={item}/>
                 </animated.div>
                 ):
                 <h4 className="text-center">No Rejected Request</h4>
                }
        </div>

    </div>
    )
   
}

export default withRouter(Reject_request);