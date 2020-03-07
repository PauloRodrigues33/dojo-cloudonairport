export default class GridModel {
    cells
    currentDay = 1
}

export class Cell {
    x = 0
    y = 0
    isCloud = false
    isAirport = false
    isCurrentlyGenerated = true
}