import Axios from "axios"
import { API_URL } from "../constants/api-url.constant"

export default () => {

    const GENERATE_URL = 'generategrid'
    const GET_FIRST_AIRPORT_ON_CLOUD = 'getfirstairportoncloud'
    const GET_DAY_ALL_AIRPORT_ON_CLOUD = 'getdayallairportoncloud'

    generateGrid = () => {
        return Axios.get(`${API_URL}${GENERATE_URL}`)
    }

    getFirstAirportOnCloud = () => {
        return Axios.get(`${API_URL}${GET_FIRST_AIRPORT_ON_CLOUD}`)
    }

    getDayAllAirportOnCloud = () => {
        return Axios.get(`${API_URL}${GET_DAY_ALL_AIRPORT_ON_CLOUD}`)
    }
}