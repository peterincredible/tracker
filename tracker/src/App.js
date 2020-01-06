import React,{useContext} from 'react';
import {Trackercontext} from "./context";
import {animated,useTransition} from "react-spring";
import {
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import Home from "./components/home";
import Private from "./components/private-route";
import Signin from "./components/signin";
import Signup from "./components/singup";
import Dashboard from "./components/dashboard";
import Admin from "./components/admin";
import Create_request from "./components/create_request";
import Accept_request from "./components/accept_request";
import Pending_request from "./components/pending_request";
import Reject_request from "./components/reject_request";
import Resolved_request from "./components/resolved_request";
import Admin_p_r from "./components/admin_pending_request"
import Admin_a_r from "./components/admin_accepted_request"
import Admin_r_r from "./components/admin_rejected_request"
import Admin_rs_r from "./components/admin_resolved_request"
import Edit_profile from "./components/edit_profile";
import Change_password from "./components/change_password";


function App() {
  let trackerstate = useContext(Trackercontext)
  let location = useLocation();
  let transitions = useTransition(location, location =>location.pathname, {
    from:{opacity:0,position:"absolute",width:"100%",height:"100%"},
    enter:{opacity:1},
    leave:{opacity:0}
  })
  return (
      <div className="container-fluid flex-container rm-padding-lr">
        <div className="row rm-margin-lr flex-header">
          <div className="col-sm-12 rm-padding-lr">
            <Header/>
          </div>
        </div>
        <div className="row flex-body rm-margin-lr">
          
           {
             transitions.map(({item,props,key})=>(
               <animated.div className='col-sm-12' key={key} style={props}>
                   <Switch location={item}>
                        <Redirect exact from="/" to="/home" />
                        <Route path="/home" exact component={Home}/>
                        <Route path="/signin" exact component={Signin}/>
                        <Route path="/signup" exact component={Signup}/>
                        <Private path="/dashboard" exact component={Dashboard} role="user"/>
                        <Private path="/admin" exact component={Admin} role="admin"/>
                        <Private path="/admin-pending-request" exact component={Admin_p_r} role="admin"/>
                        <Private path="/admin-accepted-request" exact component={Admin_a_r} role="admin"/>
                        <Private path="/admin-resolved-request" exact component={Admin_rs_r} role="admin"/>
                        <Private path="/admin-rejected-request" exact component={Admin_r_r} role="admin"/>
                        <Private path="/changepassword" exact component={Change_password} role="user"/>
                        <Private path="/editprofile" exact component={Edit_profile} role="user"/>
                        <Private path="/create-request" exact component={Create_request} role="user"/>
                        <Private path="/accepted-request" exact component={Accept_request} role="user"/>
                        <Private path="/pending-request" exact component={Pending_request} role="user"/>
                        <Private path="/rejected-request" exact component={Reject_request} role="user"/>
                        <Private path="/resolved-request" exact component={Resolved_request} role="user"/>
                  </Switch>
                             
               </animated.div>
             ))
           }
            
        
        </div>
        <div className="row flex-footer rm-margin-lr">
          <div className="col-sm-12">
            <Footer/>
          </div>
        </div>

              
      </div>
  );
}

export default App;
