/**
 * Axios instance with base URL and headers for making HTTP requests to a RESTful API.
 * @typedef {Object} AxiosInstance
 * @property {string} baseURL - The base URL for the API endpoint.
 * @property {Object.<string, string>} headers - The headers to be sent with each request.
 

 * Create an Axios instance with a base URL and default headers for making HTTP requests to a RESTful API.
 * @function
 * @returns {AxiosInstance} The Axios instance for making HTTP requests to the API.
*/
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});