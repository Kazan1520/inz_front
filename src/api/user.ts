import {LoginResponse, LoginUser, RegisterUser, RentalResponse, User} from "@/types";
import {API_URL, SERVER_URL} from "@/environment";

const headers = {
    "Content-Type": "application/json",
};

export const registerUser = async (user: RegisterUser) => {
    const response = await fetch(`${API_URL}/register/`, {
        method: "POST",
        headers,
        body: JSON.stringify(user),
    });
    return (await response.json()) as RegisterUser;
}

export const getUserData = async () => {
    const response = await fetch(`${API_URL}/user/`, {
        headers,
        credentials: "include",
    });
    return (await response.json()) as User;
}

export const loginUser = async (user: LoginUser) => {
    const response = await fetch(`${API_URL}/login/`, {
        method: "POST",
        headers,
        credentials: "include",
        body: JSON.stringify(user),
    });
    return (await response.json()) as LoginResponse;
}

export const getUser = async () => {
    const response = await fetch(`${API_URL}/get_self_data/`, {
        "headers": {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    return (await response.json()) as User;
}


export const getUserRentals = async () => {
    const response = await fetch(`${API_URL}/userrentals/`, {
        headers,
        credentials: "include",
    });
    return (await response.json()) as RentalResponse[];
}
