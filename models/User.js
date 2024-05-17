class User {
    id;
    username;
    fullname;
    password;

    static currentId = 0;

    constructor(username, fullname, password) {
        this.id = ++User.currentId;
        this.username = username;
        this.fullname = fullname;
        this.password = password;
    }

    getId() {
        return this.id;
    }

    getUsername() {
        return this.username;
    }

    setUsername(username) {
        this.username = username;
    }

    getFullname() {
        return this.fullname;
    }

    setFullname(fullname) {
        this.fullname = fullname;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }
}