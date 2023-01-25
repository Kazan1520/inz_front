import {dehydrate, QueryClient, useQueryClient} from "@tanstack/react-query";

import { getCategories } from "@/api/category";
import { getItems } from "@/api/item";

import { LayoutRental } from "@/components/layout";
import { Products } from "@/components/product";

import { useCategories } from "@/hooks/category";
import {useItems, useItemsCount} from "@/hooks/item";
import {Paginator} from "@/components/layout/paginator";
import React, {useState} from "react";
import {usePagination} from "@/hooks/pagination";


export const getStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["categories"], getCategories);
  await queryClient.prefetchQuery(["items"], () => getItems(20, 0 ));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Rental = () => {
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [page] = useState(1);
  const { data: itemsNumber = 1 } = useItemsCount();
  const { data: categories } = useCategories();
  const [searchValue, setSearchValue] = useState("");
  const { data: items } = useItems(limit, offset, searchValue);
  const pages = usePagination(itemsNumber, page, limit)

  const changePage = (page: number) => {
    setOffset(limit * (page-1));
    window.scrollTo(0, 0);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }

  const clearSearch = () => {
    setSearchValue("");
  };

  return (
    <LayoutRental categories={categories} title="Wypożyczalnia">
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
      <Products items={items} />
      <Paginator currentPage={offset/limit + 1} paginator = {changePage} pages={pages} lastPage={Math.ceil(itemsNumber / limit)}></Paginator>
    </LayoutRental>
  );
};

export default Rental;
