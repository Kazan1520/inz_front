import {API_URL} from "@/environment";

const headers = {
    "Content-Type": "application/json",
}

export const getRentals = async (limit: number = 20, offset : number = 0, filter: string | null = null) => {
    const response = await fetch(`${API_URL}/rental/?limit=${limit}&offset=${offset}` + (filter ? `&q=${filter}` : ""), {
        headers,
    });
    return response.json();
}

export const getRentalsCount = async (filter: string | null = null) => {
    const response = await fetch(`${API_URL}/rentalcount` + (filter ? `?q=${filter}` : "/"), {
        headers,
    });
    return response.json();
}
