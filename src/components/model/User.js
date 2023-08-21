export class User {
    id;
    username;
    password;
    email;
    nickname;
    img;
    price;
    gender;
    dob;
    status;
    money;
    viewCount;
    rentCount;
    isLocked;
    options;
    address;
    constructor(id, username, password, email, nickname, img, price, gender, dob,
                status, money, viewCount, rentCount,isLocked, options, address) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.nickname = nickname;
        this.img = img;
        this.price = price;
        this.gender = gender;
        this.dob = dob;
        this.status = status;
        this.money = money;
        this.viewCount = viewCount;
        this.rentCount = rentCount;
        this.isLocked = isLocked;
        this.options = options;
        this.address = address;
    }

}