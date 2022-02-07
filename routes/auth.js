const { Router } = require('express')
const authArticle = require('../controllers/authArticle');

const router = Router()

router.post('/signup', authArticle.signup_post);
router.get('/login', authArticle.login_get);
router.post('/login', authArticle.login_post);

module.exports = router;