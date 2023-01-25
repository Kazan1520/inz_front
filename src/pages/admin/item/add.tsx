import {LayoutAdmin} from "@/components/layout";
import type {Item} from "@/types";
import { GetStaticProps} from "next";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {getCategories} from "@/api/category";
import {useCategories} from "@/hooks/category";
import dynamic from "next/dynamic";

const ItemForm = dynamic(() => import("@/components/admin/ItemForm"), {
    ssr: false
});

export type ItemProps = {
    itemId: Item["id"];
};

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(["categories"], getCategories);

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 60,
    };
};


const ItemAdd = () => {
    const {data: categories} = useCategories();


    return (
        <LayoutAdmin title="Przedmioty | Panel administratora">
            <h3 className="p-4 font-bold w-full bg-gray-200 text-xl">Dodaj przedmiot</h3>
            <ItemForm categories={categories}/>
        </LayoutAdmin>
    );
};

export default ItemAdd;
