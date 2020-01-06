import React from "react";
import {withRouter,NavLink} from "react-router-dom";

function QuickRoute({user,request}){

    return(
        <div className="col-sm-12">
            <h4 className="text-center"><b>Hi {user.username}</b></h4>
            <ul className="list-group">
                <li className="list-group-item rm-padding-lr rm-padding-tb"><NavLink to="/pending-request" className="quick_link mk-padding text-center"><b>Pending Request</b></NavLink></li>
                <li className="list-group-item rm-padding-lr rm-padding-tb"><NavLink to="/accepted-request" className="quick_link mk-padding text-center"><b>Accepted Request</b></NavLink></li>
                <li className="list-group-item rm-padding-lr rm-padding-tb"><NavLink to="/resolved-request" className="quick_link mk-padding text-center"><b>Resolved Request</b></NavLink></li>
                <li className="list-group-item rm-padding-lr rm-padding-tb"><NavLink to="/rejected-request" className="quick_link mk-padding text-center"><b>Rejected Request</b></NavLink></li>
            </ul>
            
            
        </div>
    )
}

export default withRouter(QuickRoute);