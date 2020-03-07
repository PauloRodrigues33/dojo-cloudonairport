import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setGrid } from '../../actions/gridActions'
import './Menu.css'
import gridGenerator from '../../helpers/gridGenerator'
import { Row, Col } from 'react-bootstrap'
import { getDaysAirportOnCloud } from '../../services/Api'

class Menu extends Component {

    state = {
        canShowNextDayButton: false,
        dayFromFirstCloudOnAirport: undefined,
        dayFromAllAirportInCloud: undefined
    }

    onClickGenerateMap = () => {
        const { setGrid } = this.props;
        var newGrid = gridGenerator.GenerateGrid();
        setGrid(newGrid);
        this.setState({ ...this.state, canShowNextDayButton: true })
        getDaysAirportOnCloud(newGrid).then((res) => {
            if (res.data) {
                this.setState({ ...this.state, dayFromFirstCloudOnAirport: res.data.dayFromFirstCloudOnAirport, dayFromAllAirportInCloud: res.data.dayFromAllAirportInCloud });
            }
        }, (err) => {
            this.setState({ ...this.state, dayFromFirstCloudOnAirport: 'Offline', dayFromAllAirportInCloud: 'Offline' });
        })
    }

    onClickNextDay = () => {
        const { grid, setGrid } = this.props;
        var newGrid = gridGenerator.NextDay(grid)
        setGrid(newGrid);
        this.canRenderNextDay()
    }

    canRenderNextDay = () => {
        const { grid } = this.props;
        const cloudCount = grid.cells.filter((c) => c.isCloud === true);
        if (cloudCount) {
            if (cloudCount.length >= 100) {
                this.setState({ ...this.state, canShowNextDayButton: false })
                return;
            }
        }
        this.setState({ ...this.state, canShowNextDayButton: true })
    }

    render() {
        const nextDayStyle = { display: this.state.canShowNextDayButton ? 'block' : 'none' };
        return (
            <div className="menu">
                <Row>
                    <div className="button-container">
                        <button className="button" onClick={() => this.onClickGenerateMap()}>Gerar Mapa</button>
                        <button className="button" onClick={() => this.onClickNextDay()} style={nextDayStyle}>Avançar dia</button>
                    </div>
                </Row>
                <div className="mt-4">
                    <Row>
                        <Col>
                            Dia Atual: <h2>{this.props.grid.currentDay}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            O primeiro aeroporto irá ser coberto por nuvens no dia: <h2>{this.state.dayFromFirstCloudOnAirport}</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Todos os aeroportos irão ser cobertos por nuvens no dia: <h2>{this.state.dayFromAllAirportInCloud}</h2>
                        </Col>
                    </Row>
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