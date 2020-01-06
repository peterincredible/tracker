import React,{useEffect,useState,useRef} from "react";
import {withRouter,NavLink} from "react-router-dom";
import axios from "axios";
import {Admin_req} from "./admin_request";
import {useTransition,animated,interpolate} from "react-spring";


function Admin(props){
     let [allreq,setallreq] = useState([]);
     let height = 160;
     let tempreq = allreq.length > 0 ?allreq.filter((data)=>data.request_status == "pending").slice(0,4).map((data,i)=>
     ({...data,y:height * i,delay:`${i *300}ms`})) : allreq;
     let Transitions= useTransition(tempreq,req=>req._id,{from:{x:50,opacity:0,width:"90%",position:"absolute"} ,
     enter: ({y})=>({x:0,opacity:1,y}),
     leave: {x:-50,opacity:0},
     update:({y})=>({y})
     })


    useEffect(()=>{
      (async ()=>{
         try{
               let request = await axios.get("/api/admin/get-all-request")
               setallreq((oldreq=>[...oldreq,...request.data.request]))
               
         }catch(err){
             console.log("error on the admin page")
         }
      })();
    },[])

    return (
        <div className="row full-height">
            <div className="col-sm-10 col-sm-offset-1 full-height">
                <div className="row full-height">
                    <div className="col-sm-4 ">
                        <div className="panel panel-default" style={{marginTop:"10px"}}>
                                <div className="panel-heading rm-padding-lr"><p className="text-center">Admin Actions </p></div>
                                <div className="panel-body">
                                <ul className="list-group text-center rm-borderline">
                                           <li className="list-group-item rm-borderline"><NavLink to="/admin-pending-request" >Pending Request</NavLink></li>
                                           <li className="list-group-item rm-borderline"><NavLink to="/admin-accepted-request" >Accepted Request</NavLink></li>
                                           <li className="list-group-item rm-borderline"><NavLink to="/admin-rejected-request" >Rejected Request</NavLink></li>
                                           <li className="list-group-item rm-borderline"><NavLink to="/admin-resolved-request" >Resolved Request</NavLink></li>
                                        </ul>
                                       
                                </div>
                        </div>
                    </div>
                      <div className="col-sm-8 mk-relative full-height ">
                            <h1 className="rm-margin-tb text-center ">Recent Request</h1>
                           {Transitions.map(({ item, props:{y,x,...rest}, key }) =>
                                    
                                    <animated.div key={key} style={{...rest,transform:interpolate([y,x],(y,x)=>`translate3d(${x}px,${y}px,0)`)}}>
                                        <Admin_req request={item} setallreq={setallreq}/>
                                    </animated.div>
                                
                                 )}
                     </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Admin);