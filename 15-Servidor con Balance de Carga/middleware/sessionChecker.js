const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
      res.redirect("/dashboard");
      return;
    }
    next();
};

module.exports = {sessionChecker}