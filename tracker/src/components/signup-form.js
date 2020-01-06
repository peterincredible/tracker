import React,{useState,useRef,useEffect,useContext} from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import {validate_form} from "../validate";
import {Trackercontext} from "../context";
import jwt_decode from "jwt-decode";
import Spinner from "./spinner";



 function SignupForm(props){
    
    //now access all our state and store management state and dispatch function
    let store = useContext(Trackercontext);
    //created a form ref 
    let form_ref = useRef();
    //created a state that will handle all the errors
    let [error,setError] = useState({name:"",username:"",password:"",email:"",surname:""});
    let [user_reg,setuser_reg] = useState({name:"",username:"",password:"",email:"",surname:""});
    let [isloading,setloading] = useState(false);
   
    //creating the submit function handler
    let submit = async (e)=>{
        e.preventDefault();
        form_ref = form_ref.current
        let {name,surname,username,email,password,confirm_password} = form_ref;
        let {validate_error,validated} = validate_form(name.value,surname.value,username.value,password.value,confirm_password.value,email.value);
         
        if(validated){
            setuser_reg({name:name.value,surname:surname.value,username:username.value,email:email.value,password:password.value})
            setError({...error,...validate_error})
            setloading(validated)
        }
        else{
            setError({...error,...validate_error})
        }
    }
    //use the useeffect hooks for any api calling and update 
    useEffect(()=>{
        //created an async function called send_data which send data when is loading is true and later changes isloading to false when 
        // the asynchrounous call is done
        async function send_data(){
            try{
                if(isloading){
                   let data = await axios.post("/api/user/signup",{...user_reg})
                  let user = jwt_decode(data.data.token)
                   store.adduser(user);
                    localStorage["user"] = data.data.token
                    axios.defaults.headers.common["authorization"] = localStorage["user"];
                    setloading(false)
                    props.history.push("/");
                }
               
            }catch(err){
                if(err.response){
                    setError({...error,username:err.response.data.error});
                }
              
                setloading(false);
            }
        }
        send_data()
       
    },[isloading])

    return(
        <form className="form mk-relative" onSubmit={submit} ref={form_ref}>
            <h2><b>Create Account</b></h2>
             {isloading && <Spinner/>}
           <div className="form-group">
                     <label className="control-label">Name</label>
                     <div className="form-input">
                         <input className="form-control" type="text" name="name" placeholder="input name"/>
                     </div>
                     {error.name &&<span className="text-danger">{error.name}</span>}
            </div>
            <div className="form-group">
                     <label className="control-label">Surname</label>
                     <div className="form-input">
                         <input className="form-control" type="text"name="surname" placeholder="input name"/>
                     </div>
                     {error.surname && <span className="text-danger">{error.surname}</span>}
            </div>
            <div className="form-group">
                     <label className="control-label">Username</label>
                     <div className="form-input">
                         <input className="form-control" type="text"name="username" placeholder="input Username"/>
                     </div>
                     {error.username &&<span className="text-danger">{error.username}</span>}
            </div>
            <div className="form-group">
                     <label className="control-label">Email</label>
                     <div className="form-input">
                         <input className="form-control" type="email" name="email" placeholder="email@example.com"/>
                     </div>
                     {error.email &&<span className="text-danger">{error.email}</span>}
            </div>
            <div className="form-group">
                     <label className="control-label">Password</label>
                     <div className="form-input">
                         <input className="form-control" type="password" name="password"placeholder="*******"/>
                     </div>
                     {error.password &&<span className="text-danger">{error.password}</span>}
            </div>
            <div className="form-group">
                     <label className="control-label">Confirm Password</label>
                     <div className="form-input">
                         <input className="form-control" type="password" name="confirm_password"placeholder="*******"/>
                     </div>
            </div>
                
            <div className="form-group">
                     <div className="form-input">
                         <input className="btn btn-primary" type="submit" disabled={isloading}/>
                     </div>
            </div>
        </form>
    )
}
export default withRouter(SignupForm);