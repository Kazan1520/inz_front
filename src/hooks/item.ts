import { useQuery } from "@tanstack/react-query";

import {getItemById, getItems, getItemsByCategory, getItemsCount} from "@/api/item";

import type { Category, Item } from "@/types";

export const useItemById = (id: Item["id"]) =>
  useQuery(["item", id], () => getItemById(id));

export const useItems = (limit: number, offset: number, filter: string | null = null) => useQuery(["items", limit, offset, filter], () => getItems(limit, offset, filter), { keepPreviousData: true });

export const useItemsByCategory = (id: Category["id"], limit: number, offset: number) =>
  useQuery(["categoryItems", id, limit, offset], () => getItemsByCategory(id, limit, offset));

export const useItemsCount = (filter: string | null = null) => useQuery(["itemsCount", filter],() => getItemsCount(filter));
