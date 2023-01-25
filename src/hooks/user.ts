import { useQuery } from "@tanstack/react-query";

import {getUser, getUserData, getUserRentals} from "@/api/user";

export const useUserData = () => useQuery(["userData"], getUserData);

export const useUser = () => useQuery(["user"], getUser);

export const useUserRentals = () => useQuery(["userRentals"], getUserRentals);
