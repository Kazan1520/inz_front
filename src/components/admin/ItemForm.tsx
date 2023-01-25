import {Input} from "@/components/forms/input";
import {Select} from "@/components/forms/select";
import {useForm} from "react-hook-form";
import {Category, Item, UpdateItem} from "@/types";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {useMutation} from "@tanstack/react-query";
import {API_URL, SERVER_URL} from "@/environment";

export type ItemFormProps = {
    item?: Item;
    categories?: Category[];
    itemId?: Item["id"];
}

const imageSchema = z
    .instanceof(FileList)
    .refine((value) => value.length === 0)
    .or(
        z
            .instanceof(FileList)
            .refine(
                (file) => {
                    const fileType = file.item?.(0)?.type || "";
                    return fileType === "image/png" || fileType === "image/jpeg";
                },
                {
                    message: "Plik musi być w odpowiednim formacie (png, jpg)",
                }
            )
    );


const schema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    category: z.string(),
    serial_number: z.string().optional(),
    images: imageSchema,
});

const file2Base64 = (file:File):Promise<string> => {
    return new Promise<string> ((resolve,reject)=> {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result?.toString() || '');
        reader.onerror = error => reject(error);
    })
}

const ItemForm = ({item, categories, itemId}: ItemFormProps) => {
    const { register, handleSubmit, formState: { errors, dirtyFields }, watch } = useForm<UpdateItem>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: item?.name,
            description: item?.description,
            category: (item ? item.category : categories ? categories[0].id : ""),
            serial_number: item?.serial_number,
        },
    });
    const mutation = useMutation({
        mutationFn: async (data: UpdateItem) => {
            const newData = Object.fromEntries(Object.entries(data).filter(([key]) => dirtyFields[key as keyof UpdateItem])) as Partial<Omit<UpdateItem, "images"> & { images?: { image: string }[]; }>;
            newData.category = data.category;
            if (newData.images) {
                newData.images = [];
                for (let i = 0; i < data.images?.length; i++) {
                    newData.images.push({image: await file2Base64(data['images'][i] as File)});
                }
            }
            return await fetch(`${API_URL}/item/` + (itemId ? `${itemId}/` : ""), {
            method: (itemId ? "PATCH" : "POST"),
            headers: {
                "Content-Type": "application/json",
            },
                credentials: "include",
            body: JSON.stringify(newData),
        })},
        onSuccess: () => {
            window.location.href = `/admin/items`;
        }
    });

    const deleteItem = async () => {
        await fetch(`${API_URL}/item/${itemId}/`, {
            method: "DELETE",
            credentials: "include",
        });
        window.location.href = `/admin/items`;
        alert("Przedmiot został usunięty");
    }

    const images = watch("images");
    return (
        <div className="p-4">
            <div className="mt-4 px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Przedmiot</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            Edytuj przedmiot
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        {item && (
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                            onClick={deleteItem}
                        >
                            Usuń
                        </button>
                        )}
                    </div>
                </div>
            <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
                <Input label="Nazwa" {...register("name")} />
                <Input label="Opis" {...register("description")}/>
                <Select label="Kategoria" {...register("category")} options={categories}/>
                <Input label="Numer seryjny" {...register("serial_number")}/>
                <Input multiple label="Zdjęcie" {...register("images")} type="file" />
                <div className="flex">
                    {images?.[0] ?

                    Array.from(images).map((image, index) => (
                        <div key={index} className="w-1/4 shadow rounded-md p-4 m-auto">
                            <img key={index} src={URL.createObjectURL(image)} alt="zdjęcie" className="w-auto h-auto"/>
                        </div>
                    ))
                    : item?.images?.[0].image ?
                        Array.from(item.images).map((image, index) => (
                            <div key={index} className="w-1/4 shadow rounded-md p-4">
                                <img key={index} src={`${SERVER_URL}${image.image}`} alt="zdjęcie" className="w-auto h-auto"/>
                            </div>
                        ))
                        : null

                }
                </div>
                <button
                    type="submit"
                    className="mt-4 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                    {item ? "Zapisz" : "Dodaj"}
                </button>
            </form>
            <div>
                {errors.name?.message}
                {errors.description?.message}
                {errors.category?.message}
                {errors.images?.message}
            </div>
        </div>
        </div>
    );
}

export default ItemForm;


