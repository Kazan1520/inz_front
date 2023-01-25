import { API_URL } from "@/environment";

import type {Category, Item} from "@/types";

const headers = {
  "Content-Type": "application/json",
};

export const getItemById = async (id: Item["id"]) => {
  const response = await fetch(`${API_URL}/item/${id}/`, {
    headers,
      credentials: "include",
  });
  return (await response.json()) as Item | { detail: string };
};

export const getItems = async (limit: number = 20, offset: number = 0, filter: string | null = null) => {
  const response = await fetch(`${API_URL}/item/?limit=${limit}&offset=${offset}` + (filter ? `&q=${filter}` : ""), {
    headers,
        credentials: "include",
  });
  return (await response.json()) as Item[];
};

export const getItemsByCategory = async (id: Category["id"], limit: number = 20, offset: number = 0) => {
  const response = await fetch(`${API_URL}/categoryitems/${id}?limit=${limit}&offset=${offset}`, {
    headers,
        credentials: "include",
  });

  return (await response.json()) as Item[];
};

export const getItemsCount = async (filter: string | null) => {
    const response = await fetch(`${API_URL}/itemcount` + (filter ? `?q=${filter}` : "/"), {
        headers,
        credentials: "include",
    });
    return (await response.json() as number);
}

export const getCategoryItemsCount = async (id: Category["id"]) => {
    const response = await fetch(`${API_URL}/categoryitemscount/${id}/`, {
        headers,
        credentials: "include",
    });

    return (await response.json() as number);
}
