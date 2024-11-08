export interface IRegister {
    email: string
    password: string
    password2: string
    username: string
}

export interface ILogin {
    password: string
    username: string
}

export interface IProduct {
    description: string;
    id: number;
    image: string;
    price: string;
    quantity: number;
    rating: number;
    title: string
}

export interface IProfile {
    username: string;
    email: string;
    password: string;
    avatar: string;
}

export interface IProfileInfo {
    username: string;
    email: string;
    password: string;
    id: number;
}
export interface IProfileAvatar {
    id: number;
    avatar: FormData;
}

