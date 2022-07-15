const authLogin = (req, res) => {
    res.render("pages/login", {
        loggedIn: false,
    });
}

const authLoginPost = async (req, res)=>{
    const {username} = req.body;
    if(username){
        req.session.user = username;
        res.redirect('/dashboard');
    }else{
        res.redirect('/login');
    }
}

const authLogout = (req, res) => {
    if (req.session.user != undefined) {
        const name = req.session.user;
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
    if(req.session.user && req.cookies.user_sid){
        res.render("pages/dashboard", {
            userName: req.session.user,
            loggedIn: true,
        });
    }else{
        res.redirect('/login');
    }
}

module.exports = { authLogin, authLoginPost, authLogout, dashboard }