const Socekt = require('../Socket');
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
                const userDetail = new UserDetail(id, name, email);
                return userDetail.addUserDetail();
            }).catch((err) => {
                return Promise.reject(err);
            })
        }
    });
}

userService.getUser = (id) => {
    const userDetail = new UserDetail()
    return new Promise((resolve, reject) => {
        userDetail.getUserDetail(id).then((userDetail) => {
            if (userDetail) {
                resolve(userDetail);
            } else {
                reject(new Error('User not found'));
            }
        }).catch((err) => {
            reject(err);
        })
    })
}

userService.search = (keyword, email) => {
    const userDetail = new UserDetail()
    if (keyword && keyword.length > 0) {
        return new Promise((resolve, reject) => {
            userDetail.searchUserDetail(keyword, email).then((userDetail) => {
                if (userDetail) {
                    resolve(userDetail.map((userDetail) => ({...userDetail, isOnline: Socekt.isOnline(userDetail.email)})));
                } else {
                    reject(new Error('User not found'));
                }
            }).catch((err) => {
                reject(err);
            })
        })
    } else {
        return Promise.reject(new Error('Keyword is required'));
    }
}

module.exports = userService;