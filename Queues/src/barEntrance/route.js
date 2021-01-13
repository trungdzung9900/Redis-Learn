const express = require('express')
const router = express.Router();
const {entrance,getall} = require('./controller')
router.post('/add-user',entrance)
router.get('/get-user',getall)

module.exports = (app)=>{
    app.use('/bar-entrance',router)
};
