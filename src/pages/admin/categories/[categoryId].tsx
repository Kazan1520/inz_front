import {useItemById} from "@/hooks/item";
import {LayoutAdmin} from "@/components/layout";
import type {Category, Item} from "@/types";
import {GetStaticPaths, GetStaticProps} from "next";
import {dehydrate, QueryClient, useMutation} from "@tanstack/react-query";
import {getCategories, getCategoryById} from "@/api/category";
import {getItemById} from "@/api/item";
import {useCategories, useCategoryById} from "@/hooks/category";
import dynamic from "next/dynamic";
import {z} from "zod";
import {API_URL} from "@/environment";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/forms/input";

export type CategoryProps = {
    categoryId: Category["id"];
};

export const getStaticPaths: GetStaticPaths = async () => ({
    fallback: "blocking",
    paths: [],
});

export const getStaticProps: GetStaticProps = async (context) => {
    const queryClient = new QueryClient();

    const categoryId = context.params?.categoryId;

    if (typeof categoryId !== "string") {
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
            },
        };
    }
    await queryClient.prefetchQuery(["category", categoryId], () => getCategoryById(categoryId));

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            categoryId,
        },
        revalidate: 60,
    };
};

const schema = z.object({
    name: z.string(),
})



const Category = ({ categoryId }: CategoryProps) => {
    const { data: category } = useCategoryById(categoryId);
    console.log(category);
    const {register, handleSubmit} = useForm<Category>({
        resolver: zodResolver(schema),
        defaultValues: category,
    });

    const mutation = useMutation({
        mutationFn: async (data: Category) => {
            return await fetch(`${API_URL}/categories/` + categoryId, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });
        }
    });

    const deleteCategory = async () => {
        await fetch(`${API_URL}/categories/${categoryId}/`, {
            method: "DELETE",
            credentials: "include",
        });
        window.location.href = `/admin/categories`;
        alert("Kategoria została usunięta");
    }

    return (
        <LayoutAdmin title="Kategorie | Panel administratora">
            <h3 className="p-4 font-bold w-full bg-gray-200 text-xl">Edytuj przedmiot {category?.name}</h3>
            <div className="p-4">
                <div className="mt-4 px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl font-semibold text-gray-900">Kategoria</h1>
                            <p className="mt-2 text-sm text-gray-700">
                                Edytuj kategorię
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                            {category && (
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                    onClick={deleteCategory}
                                >
                                    Usuń
                                </button>
                            )}
                        </div>
                    </div>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
            <div className="flex flex-col">
                <Input {...register("name")} label="Nazwa" />
                <button
                    type="submit"
                    className="mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                    Zapisz
                </button>
            </div>
        </form>
                </div>
            </div>
    </LayoutAdmin>
);
};

export default Category;
