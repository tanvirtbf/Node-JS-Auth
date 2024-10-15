const URL = require("../models/url")

async function handleRedirectUrl(req,res){
  const shortId = req.params.shortId
  const entry = await URL.findOneAndUpdate({
    shortId
  }, { $push : {
    visitHistory: {
      timestamp : Date.now(),
    }
  }})
  console.log(entry)
  res.redirect(entry.redirectUrl)
}

module.exports = {
  handleRedirectUrl,
}