import React from "react"


export function Request(props){
    return(
        <div className="col-sm-12">
            <div className="panel panel-default">
                    <div className="panel-heading trm-padding-lr"> <span > {props.request.date}</span> </div>
                    <div className="panel-body">
                        <p>{props.request.request_content}</p>
                    </div>
                    <div className="panel-footer">
                        <span><b>REQ_ID</b> {props.request._id}</span>
                    </div>
            </div>
        </div>
    )
}

