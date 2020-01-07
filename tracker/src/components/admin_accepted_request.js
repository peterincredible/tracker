
import React,{useEffect,useState} from "react";
import {withRouter} from "react-router-dom";
import {Admin_req} from "./admin_request";
import {Trackercontext} from "../context";
import axios from "axios";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import {animated,interpolate,useTransition} from "react-spring";
function Admin_a_r(props){
    let [request,setrequest] = useState([])
    let height = 160;
    let tempreq = request.length > 0 ?request.map((data,i)=>
    ({...data,y:height * i})) : request;
    let transition = useTransition(tempreq,req=>req._id,{from:{x:50,position:"absolute",opacity:0,width:"90%",marginLeft:"auto",marginRight:"auto",right:0,left:0},
        enter:({y})=>({y,x:0,opacity:1}),
        leave:{opacity:0,x:-50},
        update:({y})=>({y})
    })
    useEffect(()=>{
        (async ()=>{
           try{
                    let responserequest = await axios.get("/api/admin/get-all-accepted-request");
                    setrequest(responserequest.data.request)
           }catch(err){
               console.log("an error in the admin pending requests");
           }
        })()
    },[request])

    return (
        <div className="row">
            <div className="col-sm-6 col-sm-offset-3 rm-padding-lr">
                <h1 className="text-center"> Accepted Requests <span>{<NavLink to="/admin" className="btn btn-primary">Back to Admin</NavLink>}</span></h1>
                {request.length > 0 ?
                transition.map(({ item, props:{y,x,...rest}, key }) =>
                                    
                    <animated.div key={key} style={{...rest,transform:interpolate([y,x],(y,x)=>`translate3d(${x}px,${y}px,0)`)}}>
                        <Admin_req request={item} setallreq={setrequest}/>
                    </animated.div>
                    
            ):
            <p className="text-center">THERE IS NO CURRENT ACCEPTED REQUEST</p>
                }
            </div>

        </div>
    )
}

export default withRouter(Admin_a_r);