import React,{useEffect,useState,useRef,useContext } from "react";
import axios from "axios";
import Spinner from "./spinner";
import {Trackercontext} from "../context";
import {withRouter} from "react-router-dom";


function Create_request(props){
       let formref = useRef();
       let [loading,setloading] = useState(false);
       let {user} = useContext(Trackercontext);
let submit = (e)=>{
    e.preventDefault();
    setloading(true);
}
    useEffect(()=>{
         if(loading){
             (async function(){
                try{
                    let select_options = formref.current.select_options.value;
                    let describe_request = formref.current.describe_request.value;
                    let request_response =  await axios.post("/api/user/create-request",{request_content:describe_request,
                        request_type:select_options,
                        user:user._id
                    })
                    props.history.push("/dashboard")
                    
                }catch(err){
                   console.log("an error occured");
                }
                
             }())
          
             setloading(false);
         }
    },[loading])
    return (
        <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
                <h1> Create A Request</h1>
                <form className="form"  ref={formref} onSubmit={submit}>
                    {loading && <Spinner/>}
                    <div className="form-group">
                        <label className="control-label">Request type</label>
                        <div className="">
                             <select className="form-control" name="select_options">
                                <option value="maintenance">maintenance</option>
                                <option value="repair">repair</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                         <label className="control-label"> Describe Request</label>
                         <div className="">
                             <textarea placeholder="write short note of your request" className="form-control" cols="7" rows="7" name="describe_request"/>
                         </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary"/>
                    </div>
                </form>

            </div>

        </div>
    )
   
}

export default withRouter(Create_request);
