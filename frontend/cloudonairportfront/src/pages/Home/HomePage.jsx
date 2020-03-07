import React, { Component } from 'react'
import Grid from '../../templates/Grid/Grid';
import { connect } from 'react-redux';
import Cell from '../../templates/Grid/Cell/Cell';
import Cloud from '../../templates/Cloud/Cloud';
import Airport from '../../templates/Airport/Airport';
import { Row, Col } from 'react-bootstrap';
import Menu from '../../templates/Menu/Menu';


class HomePage extends Component {

    renderCell = (cell, index) => {
        var renderCelldata = [];
        if (cell.isCloud) {
            renderCelldata.push(<Cloud key={index + 'cloud'} />)
        }
        if (cell.isAirport) {
            renderCelldata.push(<Airport key={index + 'airport'} />)
        }
        return (
            <Cell key={index}>
                {renderCelldata}
            </Cell>
        )
    }

    renderGrid() {
        return (
            <Grid>
                {this.props.grid.cells.map(this.renderCell)}
            </Grid>
        )
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={4}>
                        <Menu />
                    </Col>
                    <Col xs={4}>
                        {this.renderGrid()}
                    </Col>
                    <Col xs={4}>
                        
                    </Col>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    grid: state.grid
})

export default connect(mapStateToProps)(HomePage);