const User = require('../models/user');

//handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

    // duplicate error code
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validatiom errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;

}

module.exports.login_get = (req, res) => {
    res.render('login');
}

module.exports.signup_post = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    

    try {
      const user = await User.create({ firstName, lastName, email, password, confirmPassword }); 
      res.status(201).json(user);

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });

    }
}

module.exports.login_post = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    console.log(firstName, lastName, email, password, confirmPassword),
    res.send('user login');
}