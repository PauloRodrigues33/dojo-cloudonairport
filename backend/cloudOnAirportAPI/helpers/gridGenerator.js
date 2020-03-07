module.exports = {

    CalculateDaysFromGrid(grid) {
        var dayFromFirstCloudOnAirport = 0;
        var dayFromAllAirportInCloud = 0;
        var firstCellWithCloudAndAirportFound = false;
        var isAllAirportReached = false;
        const airportQuantity = grid.cells.filter((cell) => cell.isAirport).length;

        while (!isAllAirportReached) {
            grid = this.NextDay(grid);
            const cellsWithAirportAndCloud = grid.cells.filter((cell) => cell.isCloud && cell.isAirport);

            if (!firstCellWithCloudAndAirportFound) {
                if (cellsWithAirportAndCloud) {
                    if (cellsWithAirportAndCloud.length >= 1 && cellsWithAirportAndCloud.length <= airportQuantity) {
                        dayFromFirstCloudOnAirport = grid.currentDay;
                        firstCellWithCloudAndAirportFound = true;
                    }
                }
            }
            if (cellsWithAirportAndCloud.length === airportQuantity) {
                dayFromAllAirportInCloud = grid.currentDay;
                isAllAirportReached = true;
            }
        }

        return { dayFromFirstCloudOnAirport, dayFromAllAirportInCloud }
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