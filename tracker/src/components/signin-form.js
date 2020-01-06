import React,{useRef,useState,useEffect,useContext} from "react";
import axios from "axios";
import {NavLink,withRouter} from "react-router-dom";
import jwt_decode from "jwt-decode";
import {Trackercontext} from "../context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core';
import Spinner from "./spinner";

//create a function called validate that will check the username and password and then validate it
// if the username or password field is empty it wont send any data to the back end for authenthication
function validate(username,password){
    let validate_error = {}
    let validated = true;
    if(username == ""){
        validate_error.username = "username field is empty"
        validated = false;
    }else{
        validate_error.username = ""
    }
    if(password == ""){
        validate_error.password = "password field is empty"
        validated = false;
    }else{
        validate_error.password = ""
    }
    return {validate_error,validated}//we return the error to the error state and return the validated to the loading state

}

 function SigninForm(props){
    library.add(faSpinner);
    let store = useContext(Trackercontext);
    let [signin_user,set_singin_user] = useState({username:"",password:""});
    let [isloading,setloading] = useState(false);
    let [error,seterror] = useState({username:"",password:""});
    let myform = useRef();
    //defining the submit event handler
let submit = async (e)=>{
   e.preventDefault();
   let username = myform.current.username.value;
   let  password = myform.current.password.value;
   let {validate_error,validated} = validate(username,password)
     seterror(validate_error)
   if(validated){
       set_singin_user({username,password});
       setloading(true);
   }else{
    seterror(validate_error)
   }
}
//calling the use effect hooks where all the after effect will be taken place and any asychornous call to the backend
useEffect(()=>{
    //create an asynchronous function and make a call to the backend using axios
    async function send_data(){
        try{
            if(isloading){
                let data = await axios.post("/api/user/signin",{...signin_user})
                let user = jwt_decode(data.data.token)
                store.adduser(user);
                 localStorage["user"] = data.data.token
                 axios.defaults.headers.common["authorization"] = localStorage["user"];
                 setloading(false)
                 props.history.push("/");
               }
              
        }catch(err){
            if(err.response){
                seterror({...error,password:err.response.data.error});
            }
            setloading(false)
        }
          
    }
    //invoke the asynchronious function 
    send_data();
},[isloading])
    return(
        <form className="form mk-relative" onSubmit={submit} ref={myform} >
           {isloading && <Spinner/>}
            <h2><b>Sign in</b></h2>
            <div className="form-group">
                <label className="control-label">Username</label>
                <div className="form-input">
                    <input type="text" className="form-control" placeholder="input username" name="username"/>
                </div>
                {error.username && <span className="text-danger">{error.username}</span>}
            </div>
            <div className="form-group">
                <label className="control-label">Password</label>
                <div className="form-input">
                    <input type="text" className="form-control" placeholder="********" name='password'/>
                </div>
                     {error.password && <span className="text-danger">{error.password}</span>}
            </div>
            <div className="form-group">
                <div className="form-input">
                    <input type="submit" className="btn btn-primary"disabled={isloading}/>
                </div>
            </div>
            <NavLink to="/Signup">Signup</NavLink>
        </form>
    )
}
export default withRouter(SigninForm);