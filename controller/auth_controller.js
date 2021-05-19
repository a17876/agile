const passport = require("../middleware/passport");
const userController = require("./user_controller");

let authController = {
    login: (req, res) => {
        res.render("auth/login", { loggedIn: false, message: req.flash("info") });
    },

    register: (req, res) => {
        res.render("auth/register", { loggedIn: false, message: req.flash("info") });
    },

    loginSubmit: (req, res, next) => {
        req.flash("info", "The username or password is incorrect. Please try again.")
        passport.authenticate("local", {
            successRedirect: "/flashcards",
            failureRedirect: "/login",
            failureFlash: true
        })(req, res, next);
    },

    registerSubmit: async (req, res, next) => {
        let { name, email, password } = req.body

        let registerResult = await userController.registerUser(name, email, password)
        req.flash("info", "An account with this email already exists.")

        if (registerResult) {
            passport.authenticate("local", {
                successRedirect: "/flashcards",
                failureRedirect: "/login",
                failureFlash: true
            })(req, res, next);
        } 
        else {

            res.render("auth/register", { loggedIn: false, message: req.flash("info") })
        }
    },

    logout: (req, res) => {
        req.logout();
        res.status(200).clearCookie('connect.sid', {
            path: '/'
          });
          req.session.destroy(function (err) {
            res.redirect('/');
        });
    }
};

module.exports = authController;