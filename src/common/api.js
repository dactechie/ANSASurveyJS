// import Vue from "vue";

import axios from 'axios'
import {API_URL} from '../constants'

const myAxios = axios.create({ baseURL: API_URL });

myAxios.defaults.headers.common['Authorization'] =
                            'Bearer ' + localStorage.getItem('token');

export default myAxios;