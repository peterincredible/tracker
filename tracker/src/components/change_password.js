import React,{useEffect,useState} from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import {Trackercontext} from "../context";

function Change_password(props){
 let submit = ()=>{

 }
    return(

        <div className="row">
            <div className="cols-sm-4 cols-sm-offset-4">
                <form className='form' onSubmit={submit}>
                    <div className="form-group">
                        <label className="control-label">Previous Password</label>
                        <div className="form-group">
                            <input className="form-input" type="password"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label">New Password</label>
                        <div className="form-group">
                            <input className="form-input" type="password"/>
                        </div>
                    </div>
                </form>

            </div>
                
        </div>
    )
}
export default withRouter(Change_password);