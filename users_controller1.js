const User = require('../models/user');


module.exports.profile = function (req, res) {
  return res.render('user_profile', {
    title: "User Profile"
  })
}


// render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    //return res.redirect('/users/profile');
    res.redirect('/');
  }


  return res.render('user_sign_up', {
    title: "Codeial | Sign Up"
  })
}


// render the sign in page
module.exports.signIn = function (req, res) {

  if (req.isAuthenticated()) {
    // return res.redirect('/users/profile');
    res.redirect('/')
  }
  return res.render('user_sign_in', {
    title: "Codeial | Sign In"
  })
}


//Creating new user
module.exports.create = async function (req, res) {
  try {
    //checking for pwd and confirm pwd
    if (req.body.password != req.body.confirm_password) {
      console.log('password not match')
      return res.redirect("back");
    }
    //if user already exist then redirect else create new user
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      console.log('user already exits')
      return res.redirect("back");

    } else {
      let user = await User.create(req.body);
      return res.redirect("sign-in");
    }
  } catch (error) {
    console.log("Error", error);
    return;
  }
};


// sing in and create a session for the user
module.exports.createSession = function (req, res) {
  return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
  req.logout((error) => {
    console.log(error);
  });

  return res.redirect('/')
}