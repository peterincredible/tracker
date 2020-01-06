import React,{useEffect,useState} from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import {Trackercontext} from "../context";

function Edit_profile(props){
    let submit = (e)=>{
        console.log("nothing");
    }

    return(

        <div className="row">
                <div className="col-sm-6 col-sm-offset-3">
                    <h2>Edit your profile</h2>
                    <form className="form" onSubmit={submit}>
                        <div className="form-group">
                            <label className="control-label">Name</label>
                            <div className="form-input">
                                <input className="form-control" type="text"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Surame</label>
                            <div className="form-input">
                                <input className="form-control" type="text"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Username</label>
                            <div className="form-input">
                                <input className="form-control" type="text"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Email</label>
                            <div className="form-input">
                                <input className="form-control" type="email"/>
                            </div>
                        </div>
                        <div className="form-group">
                             <div className="form-input">
                                <input className="btn btn-primary" type="submit"/>
                            </div>
                         </div>
                    </form>
                </div>
        </div>
    )
}
export default withRouter(Edit_profile);