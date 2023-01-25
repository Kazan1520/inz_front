import { API_URL } from "@/environment";

import type { Category } from "@/types";
import {Item} from "@/types";

export const getCategories = async () => {
  const response = await fetch(`${API_URL}/categories/`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: 'include'
  });

  return (await response.json()) as Category[];
};

export const getCategoryById = async (id: Item["id"]) => {
  const response = await fetch(`${API_URL}/categories/${id}/`, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  return (await response.json()) as Category;
};
