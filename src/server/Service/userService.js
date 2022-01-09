const User = require('../Model/user');
const userService = {}

userService.authenticate = (username, password) => {
    const user = new User()
    return user.authenticate(username, password);
}

userService.register = (name, email, password) => {
    const user = new User()
    const userData = user.getUser(email);
    return userData.then((user) => {
        if (user) {
            return Promise.reject(new Error('User already exists'));
        } else {
            user = new User(name, email, password);
            return user.addUser();
        }
    });
}

module.exports =  userService;