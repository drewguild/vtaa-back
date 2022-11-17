const express = require('express')
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config()

const app = express()
const port = 3001
const BASE_SERVICE_URL = "https://api.airtable.com/v0/appUFi3IVRgOv95nN"

app.use(morgan('dev'));

function createProxyUrl(clientPath, servicePath) {
  app.use(clientPath, createProxyMiddleware({
    target: BASE_SERVICE_URL + servicePath,
    changeOrigin: true,
    pathRewrite: {
      [`^${clientPath}`]: '',
    },
    headers: {
      'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`
    }
  }))
}

createProxyUrl('/data', '/Points')
createProxyUrl('/itineraries', '/Itineraries')

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
