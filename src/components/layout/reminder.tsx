import React, { useState } from "react";
import {clsx} from "clsx";
import {useUserRentals} from "@/hooks/user";

const ReturnReminder = () => {
    const { data: rentals } = useUserRentals();
    const [showMessage, setShowMessage] = useState(true);


    return (

        <div className={clsx("bg-red-500 text-white py-2 px-4 rounded-md", showMessage ? "" : "hidden")} onClick={() => window.location.href = "/profile/rentals"}>
        <p className="text-sm font-medium">
            Masz niezwrócone przedmioty.
    </p>
    <button
        type="button"
    className="text-sm font-medium text-indigo-600 underline ml-2"
    onClick={() => setShowMessage(false)}
>
    Zamknij
    </button>
    </div>

);
};

export default ReturnReminder;
