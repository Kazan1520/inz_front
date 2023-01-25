import { useQuery } from "@tanstack/react-query";

import {getCategories, getCategoryById} from "@/api/category";
import {getCategoryItemsCount, getItemById} from "@/api/item";
import {Category, Item} from "@/types";

export const useCategories = () => useQuery(["categories"], getCategories);

export const useCategoryItemsCount = (id: Category["id"]) =>
    useQuery(["categoryItemsCount", id], () => getCategoryItemsCount(id));

export const useCategoryById = (id: Category["id"]) =>
    useQuery(["category", id], () => getCategoryById(id));
