const express = require('express')
const router = express.Router()
const Article = require('../models/article')


router.get('/new', (req, res) => {
  res.render('articles/new', {article: new Article()})
})


router.get('/edit/:id', async (req, res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article })
})


router.get('/:slug', async(req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug })
    if(article === null) res.redirect('/')
    res.render('articles/show', { article })  
  } catch(e) {
    // console.log(e)
    res.redirect('/')
  }
  // res.send(article)
})


router.post('/', async(req, res, next) => {
  res.locals.article = new Article()
  next()
}, saveAndRedirect('new'))


router.put('/:id', async (req, res, next) => {
  res.locals.article = await Article.findById(req.params.id)
  next()
}, saveAndRedirect('edit'))


router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

// used for put (mod) and post (new)
function saveAndRedirect(path) {
  return async (req, res) => {
    let article = res.locals.article
    'title description markdown'.split(' ')
      .map(i => article[i] = req.body[i])

    try {
      article = await article.save()
      res.redirect(`/articles/${article.slug}`)
    } catch(e) {
      res.render(`articles/${path}`, { article })
    }
  }
}


module.exports = router