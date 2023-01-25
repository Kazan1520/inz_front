import {useQuery} from "@tanstack/react-query";
import {getRentals, getRentalsCount} from "@/api/rental";
import {getItemsCount} from "@/api/item";

export const useRentals = (limit: number = 20, offset: number = 0, filter: string | null = null) => useQuery(["rentals", limit, offset,  filter],() => getRentals(limit, offset, filter), {keepPreviousData: true});
export const useRentalsCount = (filter: string | null = null) => useQuery(["rentalsCount", filter], () => getRentalsCount(filter));
