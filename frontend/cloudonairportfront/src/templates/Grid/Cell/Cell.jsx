import React from 'react'
import './Cell.css'

export default (props) => (
    <div className="cell">
        {props.children}
    </div>
)