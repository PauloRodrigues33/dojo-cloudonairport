import GridModel, { Cell } from "../models/grid.model"

export default {
    GenerateGrid() {
        const maxRow = this._getMaxRow();
        const maxColumn = this._getMaxColumn();
        var gridModel = new GridModel();
        gridModel.cells = [];
        for (var x = 0; x < maxRow; x++) {
            for (var y = 0; y < maxColumn; y++) {
                const cell = new Cell();
                cell.x = x;
                cell.y = y;
                cell.isAirport = false;
                cell.isCloud = false;
                gridModel.cells.push(cell);
            }
        }
        gridModel.cells = this._randomizeAirportAndCloud(gridModel.cells);
        return gridModel
    },

    NextDay(grid) {
        const withCloudsCurrentlyGenerated = grid.cells.filter((cell) => cell.isCloud && cell.isCurrentlyGenerated);
        if (withCloudsCurrentlyGenerated) {
            withCloudsCurrentlyGenerated.forEach((cell) => {
                cell.isCurrentlyGenerated = false;
                const topCell = this._getTopCell(grid.cells, cell);
                const bottomCell = this._getBottomCell(grid.cells, cell);
                const leftCell = this._getLeftCell(grid.cells, cell);
                const rightCell = this._getRightCell(grid.cells, cell);

                if (topCell) {
                    topCell.isCurrentlyGenerated = true;
                    topCell.isCloud = true;
                }
                if (bottomCell) {
                    bottomCell.isCurrentlyGenerated = true;
                    bottomCell.isCloud = true;
                }
                if (leftCell) {
                    leftCell.isCurrentlyGenerated = true;
                    leftCell.isCloud = true;
                }
                if (rightCell) {
                    rightCell.isCurrentlyGenerated = true;
                    rightCell.isCloud = true;
                }
            });
        }
        grid.currentDay++;
        return { ...grid };
    },

    _randomizeAirportAndCloud(grid) {
        const minAirports = 3;
        const minClouds = 4;
        var airportMinReached = false;
        var cloudsMinReached = false;
        while (!airportMinReached) {
            const randomizedAirportX = Math.floor(Math.random() * (this._getMaxRow() - 0) + 0);
            const randomizedAirportY = Math.floor(Math.random() * (this._getMaxColumn() - 0) + 0);

            var gridCellForAirport = grid.filter((val) => { return val.x === randomizedAirportX && val.y === randomizedAirportY })[0];
            if (!gridCellForAirport.isAirport && !gridCellForAirport.isCloud) {
                gridCellForAirport.isAirport = true;
            }

            var airportCount = grid.filter((val) => val.isAirport === true).length;
            if (airportCount === minAirports) {
                airportMinReached = true;
            }
        }

        while (!cloudsMinReached) {
            const randomizedCloudX = Math.floor(Math.random() * (this._getMaxRow() - 0) + 0);
            const randomizedCloudY = Math.floor(Math.random() * (this._getMaxColumn() - 0) + 0);

            var gridCellForCloud = grid.filter((val) => { return val.x === randomizedCloudX && val.y === randomizedCloudY })[0];
            if (!gridCellForCloud.isAirport && !gridCellForCloud.isCloud) {
                gridCellForCloud.isCloud = true;
            }

            var cloudCount = grid.filter((val) => val.isCloud === true).length;
            if (cloudCount === minClouds) {
                cloudsMinReached = true;
            }
        }
        return grid;
    },

    _getMaxRow() {
        return 10
    },
    _getMaxColumn() {
        return 10
    },
    _getTopCell(gridCells, cellAnchor) {
        const topCellX = cellAnchor.x - 1;
        const topCellY = cellAnchor.y;
        return gridCells.find((cell) => cell.x === topCellX && cell.y === topCellY);
    },
    _getBottomCell(gridCells, cellAnchor) {
        const topCellX = cellAnchor.x + 1;
        const topCellY = cellAnchor.y;
        return gridCells.find((cell) => cell.x === topCellX && cell.y === topCellY);
    },
    _getLeftCell(gridCells, cellAnchor) {
        const topCellX = cellAnchor.x;
        const topCellY = cellAnchor.y - 1;
        return gridCells.find((cell) => cell.x === topCellX && cell.y === topCellY);
    },
    _getRightCell(gridCells, cellAnchor) {
        const topCellX = cellAnchor.x;
        const topCellY = cellAnchor.y + 1;
        return gridCells.find((cell) => cell.x === topCellX && cell.y === topCellY);
    }

}