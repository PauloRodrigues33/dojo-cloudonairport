const initialState = {
    cells: [],
    currentDay: 1
}

const gridReducer = (grid, action) => {
    switch (action.type) {
        case 'SET_GRID':
            grid = JSON.parse(JSON.stringify(action.grid))
            return grid;
        default: 
            return initialState
    }
}

export default gridReducer;