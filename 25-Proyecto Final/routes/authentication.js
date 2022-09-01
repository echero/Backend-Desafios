const passport = require('passport')
const { Router } = require('express');
const { sessionChecker} = require('../middleware/sessionChecker')
const {authLogin, authLoginPost, authLogout, dashboard, signup, signupPost, loginError, signupError, LoginDisplayError,  SignupDisplayError, ImageUpload } = require('../controller/authentication');
const upload = require('../middleware/multer');

const router = Router();

router.get('/', sessionChecker, (req, res) => {
	res.redirect("/login");
})


router.get('/login',sessionChecker,authLogin)
router.post('/login',passport.authenticate('login', {failureRedirect: '/fLogin'}), authLoginPost);
router.get('/signup', signup)
router.post('/signup', passport.authenticate('register', {failureRedirect: '/fRegister'}), signupPost)
router.get('/logout',authLogout)
router.get('/dashboard',dashboard)
router.get('/fRegister', signupError)
router.get('/fLogin', loginError)
router.get('/failLogin', LoginDisplayError)
router.get('/failSignup', SignupDisplayError)
router.post('/ImageUpload', upload.single('imagen'), ImageUpload)

module.exports = router;