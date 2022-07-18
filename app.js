const express = require('express')
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config()

const app = express()
const port = 3001
const API_SERVICE_URL = "https://api.airtable.com/v0/appUFi3IVRgOv95nN/Points";

app.use(morgan('dev'));

app.use('/data', createProxyMiddleware({
  target: API_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: {
    [`^/data`]: '',
  },
  headers: {
    'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`
  }
}))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
