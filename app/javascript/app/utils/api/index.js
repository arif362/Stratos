import axios from "axios"

const client = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-type": "application/json"
  },
  transformResponse: [function (data) {
    return JSON.parse(data).data;
  }],
})


export {
  client
}