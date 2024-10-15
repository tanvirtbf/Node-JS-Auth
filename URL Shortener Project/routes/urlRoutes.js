const express = require('express')
const { handleGenerateNewShortUrl, handleGetAnalytics } = require('../controllers/urlController.js')
const { handleRedirectUrl } = require('../controllers/redirectController.js')

const router = express.Router()

router.post('/', handleGenerateNewShortUrl)

router.get('/analytics/:shortId', handleGetAnalytics)

router.get('/:shortId', handleRedirectUrl)

module.exports = router

