const model = require('../services/sequelizer')

async function checkingRegistrationData(username, password, password2) {
    let errors = []

    if (!username || !password || !password2)
        errors.push({msg: 'Please enter all fields'})

    if (password !== password2)
        errors.push({msg: 'Passwords do not match'})


    const user = await model.User.findOne({where: {username: username}})
    if (user)
        errors.push({msg: 'Login already exists'})

    let dataIsCorrect = errors.length === 0;

    return [errors, dataIsCorrect]
}

module.exports = checkingRegistrationData
