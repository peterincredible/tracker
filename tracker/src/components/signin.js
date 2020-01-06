import React from "react";
import SigninForm from "./signin-form";

export default function Signin(props){
    return(
        <div className="row rm-margin-lr">
          <div className="col-sm-4 col-sm-offset-4 rm-padding-lr">
                <SigninForm/>
          </div>
    </div>
    )
}