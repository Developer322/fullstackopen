import axios from 'axios'
const baseUrl = '/api/users'

export const getAllUsers = async () =>  (await axios.get(baseUrl)).data