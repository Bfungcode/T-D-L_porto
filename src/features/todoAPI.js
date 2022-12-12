import axios from 'axios';

const API_URL = "https://jsonplaceholder.typicode.com";

const getTodos = (pagi) => {
    const response = axios.get(`${API_URL}/todos?_page=${pagi}&_limit=20`)
    return response;
}
// const makeTodos = (title, body, userId) => {
//     const response = 
// }
const todoAPI = {
    getTodos,
}
export default todoAPI;