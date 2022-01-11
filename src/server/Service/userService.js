const User = require('../Model/user');
const UserDetail = require('../Model/userDetail');
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
            user.addUser().then((id) => {
                const userDetail = new UserDetail(id, name);
                return userDetail.addUserDetail();
            }).catch((err) => {
                return Promise.reject(err);
            })
        }
    });
}

userService.getUser = (id) => {
    const user = new User()
    const userDetail = new UserDetail()
    return new Promise((resolve, reject) => {
        Promise.all([user.getUserById(id), userDetail.getUserDetail(id)]).then(([user, userDetail]) => {
            if (user && userDetail) {
                resolve({ ...user, ...userDetail });
            } else {
                resolve(null);
            }
        }).catch((err) => {
            reject(err);
        })
    })
}

module.exports =  userService;