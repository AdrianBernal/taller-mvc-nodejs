//Clases
module.exports = class User {
    static users = [];

    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    save(callback) {
        console.log("saving: " + this.getFullName());
        User.users.push(this);
        callback();
    }

    getFullName() {
        return this.firstName + " " + this.lastName;
    }

    static find() {
        return User.users;
    }
}



//Prototipos
// function User(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
// }

// User.users=[];
//
// User.prototype.save = function (callback) {
//     console.log("saving: " + this.getFullName());
//     User.users.push(this);
//     callback();
// };

// User.prototype.getFullName = function() {
//     return this.firstName + " " + this.lastName;
// };

// User.prototype.find = function () {
//     return User.users;
// };
//
// module.exports = User;