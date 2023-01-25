import type { GetStaticPaths, GetStaticProps } from "next";

import { dehydrate, QueryClient } from "@tanstack/react-query";

import { getCategories } from "@/api/category";
import { getItemsByCategory } from "@/api/item";

import { LayoutRental } from "@/components/layout";
import { Products } from "@/components/product";

import {useCategories, useCategoryItemsCount} from "@/hooks/category";
import {useItemsByCategory} from "@/hooks/item";

import type { Category } from "@/types";
import {Paginator} from "@/components/layout/paginator";
import {useState} from "react";
import {usePagination} from "@/hooks/pagination";

export type RentalCategoryProps = {
  categoryId: Category["id"];
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = await getCategories();

  return {
    fallback: "blocking",
    paths: categories.map(({ id: categoryId }) => ({
      params: {
        categoryId,
      },
    })),
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["categories"], getCategories);

  const categoryId = context.params?.categoryId;

  if (typeof categoryId !== "string") {
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }

  await queryClient.prefetchQuery(["categoryItems", categoryId], () =>
    getItemsByCategory(categoryId)
  );

  return {
    props: {
      categoryId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const RentalCategory = ({ categoryId }: RentalCategoryProps) => {
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [page] = useState(1);
  const { data: itemsNumber = 1 } = useCategoryItemsCount(categoryId);
  const { data: categories } = useCategories();
  const { data: items } = useItemsByCategory(categoryId, limit, offset);
  const pages = usePagination(itemsNumber, page, limit)


  const changePage = (page: number) => {
    setOffset(limit * (page-1));
    window.scrollTo(0, 0);
  }

  return (
    <LayoutRental
      categories={categories}
      title={categories?.find((category) => category.id === categoryId)?.name}
    >
      <Products items={items} />
      <Paginator currentPage={offset/limit + 1} paginator = {changePage} pages={pages} lastPage={Math.ceil(itemsNumber / limit)}></Paginator>
    </LayoutRental>
  );
};

export default RentalCategory;
