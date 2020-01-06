import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faSpinner);

function Spinner(props){
    return(
        <div className="col-sm-12 mk-absolute mk-transparent mk-absolute-center full-height">
          <FontAwesomeIcon icon="spinner" size ="3x" rotation={180} spin/>
        </div>
    )
}

export default Spinner;