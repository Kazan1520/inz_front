import {clsx} from "clsx";
import {Item, ParsedRentalsForList} from "@/types";
import {ReactNode} from "react";
import {useForm} from "react-hook-form";
import {API_URL} from "@/environment";

type ListProps = {
    ths: string[],
    cols: (keyof { [K in keyof ParsedRentalsForList as ParsedRentalsForList[K] extends ReactNode ? K : never]: ParsedRentalsForList[K] })[],
    data?: ParsedRentalsForList[],
}

export const RentalsList = ({ths, data, cols}: ListProps) => {

    const approveRental = (id: Item["id"]) => {
        fetch(`${API_URL}/rental/${id}/approve/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
    }

    const rejectRental = (id: Item["id"]) => {
        fetch(`${API_URL}/rental/${id}/reject/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
    }

    const returnRental = (id: Item["id"]) => {
        fetch(`${API_URL}/rental/${id}/return/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
    }

    return (
        <div className="mt-4 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Wypożyczenia</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Lista wszystkich wypożyczeń
                    </p>
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
                                            <td className={clsx("whitespace-nowrap text-sm", index === 0 ? "py-4 pl-4 pr-3 font-medium text-gray-900 sm:pl-6": "px-3 py-4 text-gray-500")}>
                                                {dataItem[col]}
                                            </td>
                                            //add a button to approve or reject the rental
                                        ))}
                                        <td key={dataItem.id}>
                                            {(dataItem.status === "Awaiting") ? (
                                                <div className="flex justify-end">
                                            <button
                                                className="mx-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => {approveRental(dataItem.id)
                                                    window.location.reload()}}
                                            >
                                                Zatwierdź
                                            </button>
                                            <button
                                                className="mx-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() => {rejectRental(dataItem.id)
                                                    window.location.reload()}}
                                            >
                                                Odrzuć
                                            </button>
                                                    </div>) : dataItem.status === "Returned" || dataItem.status === "Rejected" ? "" : (
                                                <button
                                                    className="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => {returnRental(dataItem.id)
                                                        window.location.reload()}}
                                                >
                                                    Potwierdź zwrot
                                                </button> )}
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
