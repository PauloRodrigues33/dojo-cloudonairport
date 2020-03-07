import Axios from "axios"
import { API_URL } from "../constants/api-url.constant"

const GET_DAYS_AIRPORT_ON_CLOUD = 'calculator';

export function getDaysAirportOnCloud(grid) {
    return Axios.post(`${API_URL}${GET_DAYS_AIRPORT_ON_CLOUD}`, grid)
}