const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/walmart-oa/:pageNum/:pageSize', (req, res) => {
  let pageNum = req.params.pageNum,
    pageSize = req.params.pageSize;
  axios
    .get(`https://mobile-tha-server.firebaseapp.com/walmartproducts/${pageNum}/${pageSize}`)
    .then((data) => res.json(data.data))
    .catch((e) => console.log(e));
});

app.listen(8080, () => console.log('listen on 8080'));
