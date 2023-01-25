import { LayoutAdmin } from "@/components/layout";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import React, {ReactNode, useState} from "react";
import {ItemList} from "@/components/admin";
import {Category, Item} from "@/types";
import {Paginator} from "@/components/layout/paginator";
import {getCategories} from "@/api/category";
import {useCategories} from "@/hooks/category";
import pages from "@/pages";
import {CategoryList} from "@/components/admin/categoryList";

export const getStaticProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(["categories"], () => getCategories());

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
};


const AdminCategories = () => {
    const {data: categories} = useCategories();

    return (
        <LayoutAdmin title="Przedmioty | Panel administratora">
            <CategoryList
                edithref="categories"
                data={categories}
                ths={["Nazwa", "ID"]}
                cols={[
                    "name",
                    "id",
                ] as (keyof {
                    [K in keyof Category as Category[K] extends ReactNode ? K : never]: Category[K];
                })[]}
            />
        </LayoutAdmin>

    );
};

export default AdminCategories;
