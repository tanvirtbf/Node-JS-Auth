const express = require('express')
const { connectDb } = require('./connection.js')
const URL = require('./models/url.js')
const path = require('path')

const urlRoute = require('./routes/urlRoutes.js')
const staticRoute = require('./routes/staticRouter.js')
const userRoute = require('./routes/user.js')


const app = express()

connectDb('mongodb://127.0.0.1:27017/urlShortner')
  .then(()=> console.log('MongoDB Connected!'))
  .catch((err)=> console.log(err))

// express ke bole dilam ami kon template engine use korchi..
app.set('view engine', 'ejs')

// amar ejs file ami kothay rekhechi seta bole dite hobe..
app.set('views', path.resolve('./views'))

// Middleware (for accept form data as json)
app.use(express.json())
app.use(express.urlencoded({extended : false}))

// Routes
app.get('/test', async (req,res)=>{
  const allUrls = await URL.find({})
  return res.render('home', {
    urls : allUrls,
    name : 'Tanvir'
  })
})

app.use('/url', urlRoute)
app.use('/user', userRoute)
app.use('/', staticRoute)




const port = process.env.PORT || '3000'
app.listen(port, ()=> console.log(`Server Run with http://localhost:${port}`))
