const express = require('express')
const mongoose = require('mongoose')
const app = express()
const methodOverride = require('method-override')
const articleRoutes = require('./routes/articles')
const Article = require('./models/article')

mongoose.connect('mongodb://localhost/md_blog_wds', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

// set up dev stuff, livereload, etc
if(process.env.NODE_ENV != 'production') {
  const path = require('path')
  const livereload = require('livereload').createServer({
    exts:['pug', 'ejs', 'html', 'js', 'css', 'jpg', 'png', 'svg']
  })
  livereload.watch([
    path.join(__dirname, 'public'),
    path.join(__dirname, 'views')
  ])

  app.use(
    require('connect-livereload')()
  )
  // upon reload send livereloadserver refresh after a bit of wait
  livereload.server.once("connection", () => {
    setTimeout(() => {
      livereload.refresh("/");
    }, 100);
  });
  console.log('livereload up and watching...')
}
// ---- dev part end


app.set('view engine', 'pug')
app.set('x-powered-by', false)
app.use('/public',   express.static('public'))
app.use(express.urlencoded({ extended: false })) // 4 form data decoder
app.use(methodOverride('_method')) // html has no put/delete only get post

app.use('/articles', articleRoutes)


app.get('/', async(req, res) => {
  // res.send(process.env)
  const articles = await Article.find().sort('-createdAt')
  // const articles = [{
  //   title: 'test article',
  //   createdAt: new Date(),
  //   description: 'lorem ipsum'
  // }]
  res.render('articles/index', { articles })
})

app.listen(5000, 'localhost', _ => console.log('http://localhost:5000/ started...'))
