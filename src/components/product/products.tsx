import Link from "next/link";

import { SERVER_URL } from "@/environment";

import type { Item } from "@/types";

export type ProductsProps = {
  items?: Item[];
};

export const Products = ({ items = [] }: ProductsProps) => (

<div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
    {items.map(item => (
        <div key={item.id} className="max-w-sm rounded-lg shadow-lg overflow-hidden">
            <Link href={`/rental/item/${item.id}/`}>
                <img src={`${SERVER_URL}/${item.images[0]?.image}`} alt={item.name} className="w-full" />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{item.name}</div>
                    <p className="text-gray-700 text-base">
                        {item.description}
                    </p>
                </div>
                <div className="px-6 py-4">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#{item.serial_number}</span>
                </div>
            </Link>
        </div>
    ))}
</div>
);
