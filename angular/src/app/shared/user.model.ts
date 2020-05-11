export class User {
    fullname: string;
    email: string;
    password: string;
}

export class UserRes{
    id: string;
    fullname: string;
    email: string;
    password: string;
    saltsecret: string;
}

export class Product{
    name: string;
    cid: number;
    description: string;
    price: number;
}

export class chatData{
    _id:string;
    from:string;
    to:string;
    productId:string;
    productName:string;
    issue:string
}