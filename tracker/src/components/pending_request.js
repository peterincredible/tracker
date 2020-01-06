import React,{useEffect,useState,useContext} from "react";
import {withRouter} from "react-router-dom";
import {Request} from "./request";
import {Trackercontext} from "../context";
import {animated,useTransition} from "react-spring";
import axios from "axios";
function Pending_request(props){
    let {request,addrequest,removerequest}= useContext(Trackercontext);
    let [tempreq,settempreq] = useState(request.filter((req)=>req.request_status == "pending"))
    let Transition = useTransition(tempreq,data=>data._id,{trail:400,from:{ transform:"translatex(50px)",opacity:0}
        ,enter:{transform:"translatex(0)",opacity:1}
})
    useEffect(()=>{
        (async ()=>{
           try{
                if(tempreq.length == 0){
                    let responserequest = await axios.get("/api/user/get-all-request");
                    settempreq(responserequest.data.request.filter((req)=>req.request_status == "pending"))
                    addrequest(responserequest.data.request);
                }
           }catch(err){

           }
        })()
    },[tempreq])

    return (
        <div className="row">
            <div className="col-sm-6 col-sm-offset-3 ">
                <h1 className="text-center"> Pending Requests</h1>
                {tempreq.length > 0 ?
                 Transition.map(({key,item,props})=>
                 <animated.div key={key} style={props}>
                     <Request request={item}/>
                 </animated.div>
                 ):
                 <h4 className="text-center">No Pending Request</h4>
                }
            </div>

        </div>
    )
   
}

export default withRouter(Pending_request);