import {clsx} from "clsx";
import {Item, ParsedRentalsForList} from "@/types";
import {ReactNode} from "react";

type ListProps = {
    ths: string[],
    cols: (keyof { [K in keyof Item as Item[K] extends ReactNode ? K : never]: Item[K] })[],
    data?: Item[],
    edithref?: string,
    addhref?: string,
}

export const ItemList = ({ths, data, cols, edithref, addhref}: ListProps) => {
    return (
        <div className="mt-4 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Przedmioty</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Lista wszystkich przedmiotów
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    {addhref &&
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                            onClick={() => window.location.href = addhref}
                        >
                            Dodaj przedmiot
                        </button>
                    }
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                {ths.map((th, index) => (
                                    <th
                                        key={th}
                                        scope="col"
                                        className={clsx("text-left text-sm font-semibold text-gray-900", index === 0 ? "py-3.5 pl-4 pr-3 sm:pl-6" : "px-3 py-3.5")}
                                        >
                                        {th}
                                    </th>
                                ))}
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Edytuj</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {data?.map((dataItem) => (
                                    <tr key={dataItem.id}>
                                        {cols.map((col, index) => (
                                          <td key={col} className={clsx("whitespace-nowrap text-sm", index === 0 ? "py-4 pl-4 pr-3 font-medium text-gray-900 sm:pl-6": "px-3 py-4 text-gray-500")}>
                                                {dataItem[col]}
                                          </td>
                                        ))}
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <a href={"/admin/" + edithref +  "/" + dataItem.id + '/'} className="text-indigo-600 hover:text-indigo-900">
                                                Edytuj<span className="sr-only">, {dataItem.name}</span>
                                            </a>
                                        </td>
                                    </tr>

                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
