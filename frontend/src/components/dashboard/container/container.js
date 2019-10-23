import React from 'react';
import './container.css'

export default function Usercontainer(props) {
    return (
        <div className="content-container-wrapper-1">
            <div className="content-container-inner">
                {props.children}
            </div>
        </div>
    )
}

