
import React, { useEffect, useState } from 'react';

const Cell = props => {


    return(
        <div className="the-cell">
            <p className="name">{props.name}</p>
            <a className="git-url" href={props.href} target="_blank"><div className="git-div" ><span className="git-label">Github</span></div></a>
            <p className="desc">{props.desc}</p>
        </div>
    );
}

export default Cell;
