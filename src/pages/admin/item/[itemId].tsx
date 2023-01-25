import {useItemById} from "@/hooks/item";
import {LayoutAdmin} from "@/components/layout";
import type {Item} from "@/types";
import {GetStaticPaths, GetStaticProps} from "next";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {getCategories} from "@/api/category";
import {getItemById} from "@/api/item";
import {useCategories} from "@/hooks/category";
import dynamic from "next/dynamic";

const ItemForm = dynamic(() => import("@/components/admin/ItemForm"), {
    ssr: false
});

export type ItemProps = {
    itemId: Item["id"];
};

export const getStaticPaths: GetStaticPaths = async () => ({
    fallback: "blocking",
    paths: [],
});

export const getStaticProps: GetStaticProps = async (context) => {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(["categories"], getCategories);

    const itemId = context.params?.itemId;

    if (typeof itemId !== "string") {
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
            },
        };
    }
    await queryClient.prefetchQuery(["categories"], getCategories);
    await queryClient.prefetchQuery(["item", itemId], () => getItemById(itemId));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            itemId,
        },
        revalidate: 60,
    };
};


const Item = ({ itemId }: ItemProps) => {
    const { data: item } = useItemById(itemId);
    const { data: categories } = useCategories();
    if (item)
    if ('detail' in item) {
        return <LayoutAdmin title="Przedmioty | Panel administratora" />

    }

    return (
        <LayoutAdmin title="Przedmioty | Panel administratora">
            <h3 className="p-4 font-bold w-full bg-gray-200 text-xl">Edytuj przedmiot {item?.name}</h3>
            <ItemForm item={item} categories={categories} itemId={itemId} />
        </LayoutAdmin>
    );
};

export default Item;
