import React, { Component } from 'react'
import './Grid.css'
export default class Grid extends Component {


    renderGrid = () => {
        return (
            <div className="grid" >
                {this.props.children}
            </div>
        )
    }

    render() {
        return this.renderGrid();
    }
}