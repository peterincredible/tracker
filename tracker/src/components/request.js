import React from "react"


export function Request(props){
    return(
        <div className="col-sm-12">
            <div className="panel panel-default">
                    <div className="panel-heading rm-padding-lr"><span> <b>ReqId</b> {props.request._id}</span> <span className="pull-right"> {props.request.date}</span> </div>
                    <div className="panel-body">
                        <p>{props.request.request_content}</p>
                    </div>
            </div>
        </div>
    )
}

