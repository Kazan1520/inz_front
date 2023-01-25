import {LayoutAdmin} from "@/components/layout";
import {ItemList} from "@/components/admin";
import {dehydrate, QueryClient} from "@tanstack/react-query";

import {getItems} from "@/api/item";
import {useItems, useItemsCount} from "@/hooks/item";
import type {Item, ParsedRentalsForList, RentalResponse} from "@/types";
import React, {ReactNode, useState} from "react";
import {Paginator} from "@/components/layout/paginator";
import {usePagination} from "@/hooks/pagination";
import {API_URL} from "@/environment";
import {useRentals, useRentalsCount} from "@/hooks/rental";
import {RentalsList} from "@/components/admin/rentalList";
import {getRentals} from "@/api/rental";


export const getStaticProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(["items"], () => getItems(20, 0));
    await queryClient.prefetchQuery(["rentals"], () => getRentals(20, 0));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};


const AdminProducts = () => {
    const [limit] = useState(20);
    const [offset, setOffset] = useState(0);
    const [page] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const {data: rentalsNumber = 1} = useRentalsCount(searchValue);
    const pages = usePagination(rentalsNumber, page, limit)
    const {data: rentals} = useRentals(limit, offset, searchValue);

    const downloadSummary = () => {
        fetch(`${API_URL}/rentalstoexcel/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',

        })
            .then(response => response.blob())
            .then(blob => {
                    window.location.href = window.URL.createObjectURL(blob);
                }
            )
    }

//function that returns the list of ParsedRentalsForList
const parseRentals = (rentals: RentalResponse[]): ParsedRentalsForList[] => {
        if (rentals == null) return [];
    return rentals.map((rental) => {
        return {
            id: rental.id,
            serial_number: rental.item.serial_number,
            name: rental.item.name,
            user: rental.user.first_name + " " + rental.user.last_name,
            start_date: rental.start_date,
            end_date: rental.end_date,
            status: rental.status,
        }
    })
}

    const changePage = (page: number) => {
        setOffset(limit * (page - 1));
        window.scrollTo(0, 0);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    const clearSearch = () => {
        setSearchValue("");
        // tutaj można wysłać zapytanie do API bez wyszukiwanego słowa
    };
    return (
        <LayoutAdmin title="Wypożyczenia | Panel administratora">
            <div className="flex items-center mb-6">
                <input
                    type="text"
                    value={searchValue}
                    onChange={handleChange}
                    placeholder="Wyszukaj..."
                    className="ml-8 px-4 py-2 w-3/5 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                {searchValue !== "" && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="ml-4 px-4 py-2 font-bold text-white bg-gray-600 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Wyczyść
                    </button>
                )}
            </div>
            <RentalsList
                data={parseRentals(rentals)}
                ths={["Przedmiot", "Użytkownik", "Numer seryjny", "Data wypożyczenia", "Data zwrotu", "Status"]}
                cols={[
                    "name",
                    "user",
                    "serial_number",
                    "start_date",
                    "end_date",
                    "status"
                ] as (keyof {
                    [K in keyof ParsedRentalsForList as ParsedRentalsForList[K] extends ReactNode ? K : never]: ParsedRentalsForList[K];
                })[]}
            />
            <div className="flex justify-center mt-6">
                <button
                    type="button"
                    className="px-4 py-2 mb-4 font-bold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => downloadSummary()}
                >
                    Pobierz raport
                </button>
            </div>
            <Paginator
                currentPage={offset / limit + 1}
                paginator={changePage}
                pages={pages}
                lastPage={Math.ceil(rentalsNumber / limit)}
            />
        </LayoutAdmin>

    );
};

export default AdminProducts;
