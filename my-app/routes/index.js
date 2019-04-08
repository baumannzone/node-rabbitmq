const express = require('express')
const router = express.Router()

const controller = require('../controllers')

/* GET home page. */
// router.get('/', function (req, res, next) {
//   res.render('index', {title: 'Express'})
// })

router.get('/', controller.index)

router.get('/demo', controller.demo)

module.exports = router
