import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setGrid } from '../../actions/gridActions'
import './Menu.css'
import gridGenerator from '../../helpers/gridGenerator'

class Menu extends Component {

    onClickGenerateMap = () => {
        const { setGrid } = this.props;
        var newGrid = gridGenerator.GenerateGrid();
        setGrid(newGrid);
    }

    onClickNextDay = () => {
        const { grid, setGrid } = this.props;
        var newGrid = gridGenerator.NextDay(grid)
        setGrid(newGrid);
    }

    render() {
        return (
            <div className="menu">
                <div className="button-container">
                    <button className="button" onClick={() => this.onClickGenerateMap()}>Gerar Mapa</button>
                    <button className="button" onClick={() => this.onClickNextDay()}>Avançar dia</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    grid: state.grid
})
const mapDispatchToProps = dispatch => bindActionCreators({ setGrid }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Menu)