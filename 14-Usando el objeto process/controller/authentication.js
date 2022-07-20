const authLogin = (req, res) => {
    res.render("pages/login", {
        loggedIn: false,
    });
}

const authLoginPost = (req, res)=>{
    res.status(200).json({
        message:'Acceso autorizado',
        authenticated: true
    })
}

const signup = (req, res) => {
    res.render("pages/signup", {
        loggedIn: false,
    });
}

const signupPost = (req, res) => {
    res.status(200).json({
        message:'Usuario registrado',
        registered: true
    })
}

const authLogout = (req, res) => {
    if (req.user != undefined) {
        const name = req.user.username;
        req.session.destroy(() => {
            req.session = null;
            res.render("pages/logout", {
                userName: name,
                loggedIn: false,
            });
        });
    }else{
        res.redirect('/login'); 
    }
}

const dashboard = (req, res) => {
    if(req.user && req.cookies.user_sid){
        res.render("pages/dashboard", {
            userName: req.user.username,
            userEmail: req.user.email,
            loggedIn: true,
        });
    }else{
        res.redirect('/login');
    }
}

const loginError = (req, res) => {
    res.status(400).json({
        message:'Acceso no autorizado',
        authenticated: false
    })
}

const signupError = (req, res) => {
    res.status(400).json({
        message:'No se pudo registrar el usuario',
        registered: false
    })
}

const LoginDisplayError = (req, res) => {
    res.render("pages/error", {
        errMsg: 'Credenciales no válidas',
        backUrl: '/login'
    });
}

const SignupDisplayError = (req, res) => {
    res.render("pages/error", {
        errMsg: 'Usuario ya registrado',
        backUrl: '/signup'
    });
}

module.exports = { authLogin, authLoginPost, authLogout, dashboard, signup, signupPost, loginError, signupError, LoginDisplayError,  SignupDisplayError}