import React from "react";
import SignupForm from './signup-form';

export default function Signup(props){
    return(
        <div className="row">
            <div className="col-sm-4 col-sm-offset-4">
                <SignupForm/>
            </div>
        </div>
    )
}