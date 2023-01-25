import React from "react";
import {LayoutMain, LayoutRental} from "@/components/layout";
import {useUser, useUserRentals} from "@/hooks/user";
import {clsx} from "clsx";


const UserRentals = () => {
    const { data: rentals } = useUserRentals();
    return (
        <LayoutMain>
        <div className="flex flex-col w-full p-6">
        <h2 className="text-2xl font-bold mb-6">Moje wypożyczenia</h2>
            {rentals ?
                rentals.length === 0 ?
                    <p className="text-gray-600">Brak aktualnych wypożyczeń.</p>
                :
                    <table className="w-full mt-4 text-left">
                        <thead>
                        <tr className="text-sm font-medium text-gray-600 uppercase">
                            <th className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                                Nazwa przedmiotu
                            </th>
                            <th className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                                Data wypożyczenia
                            </th>
                            <th className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                                Data zwrotu
                            </th>
                            <th className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                                Status
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {rentals.map((rental) => (
                            <tr key={rental.id} className="text-sm font-medium text-gray-700">
                                <td className="px-4 py-3 border-b border-gray-200">
                                    {rental.item.name}
                                </td>
                                <td className="px-4 py-3 border-b border-gray-200">
                                    {rental.start_date}
                                </td>
                                <td className={clsx("px-4 py-3 border-b border-gray-200", new Date(rental.end_date) < new Date() ? "text-red-600" : "")}>
                                    {rental.end_date}
                                </td>
                                <td className="px-4 py-3 border-b border-gray-200">
                                    {rental.status == 'Returned' ? "Zwrócono" : "Nie zwrócono"}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    : <p className="text-gray-600">Ładowanie...</p>
}

    </div>
        </LayoutMain>
  );
};

export default UserRentals;
