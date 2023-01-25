//register page
import {LayoutMain} from "@/components/layout";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {RegisterUser} from "@/types";
import {zodResolver} from "@hookform/resolvers/zod";
import {Input} from "@/components/forms/input";
import {useMutation} from "@tanstack/react-query";
import {API_URL} from "@/environment";


const schema = z.object({
    username: z.string().min(3, "Nazwa użytkownika musi mieć minimum 3 znaki").max(20, "Nazwa użytkownika może mieć maksymalnie 20 znaków").regex(/^[a-zA-Z0-9]+$/),
    email: z.string().email(),
    password1: z.string().min(8, "Hasło musi posiadać conajmniej 8 znaków").max(20, "Hasło może posiadać maksymalnie 20 znaków"),
    password2: z.string(),
    phone_number: z.string().min(3).max(50).regex(/^\d{9}$/, "Numer telefonu jest niepoprawny"),
    first_name: z.string().min(3).max(50).regex(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/, "Imię jest niepoprawne"),
    last_name: z.string().min(3).max(50).regex(/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/, "Nazwisko jest niepoprawne"),
    rodo: z.boolean(),
    terms_of_use: z.boolean(),
}).refine((data) => data.password1 === data.password2, {
    message: "Hasła muszą być takie same",
}).refine((data) => data.rodo, {
    message: "Musisz zaakceptować RODO",
}).refine((data) => data.terms_of_use, {
    message: "Musisz zaakceptować regulamin",
});





const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterUser>({
        resolver: zodResolver(schema),
    });

    const mutation = useMutation({
        mutationFn: async (data: RegisterUser) => {
            await fetch(`${API_URL}/registration/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then((response) => {
                if (response.ok) {
                    window.location.href = "/login";
                }
                else {
                    let error = response.json().then((data) => {
                        console.log(data);
                    });
                    alert("Wystąpił błąd podczas rejestracji");
                }
            }).catch((error) => {
                console.log(error)
                alert("Wystąpił błąd podczas rejestracji");
            });
        },
    });

    return (
        <LayoutMain title="Rejestracja">
            <div className="mx-auto p-4 max-w-sm rounded-md shadow-lg sm:w-auto md:w-2/3">
                <h2 className="text-2xl font-bold mb-6 text-center">Rejestracja</h2>
                <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
                    <Input label={" Nazwa użytkownika"} {...register("username")} error={errors.username?.message} className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"/>
                    <Input type="email" label={"Email"} {...register("email")} error={errors.email?.message} className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"/>
                    <Input type="password" label={"Hasło"} {...register("password1")} error={errors.password1?.message} className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"/>
                    <Input type="password" label={"Powtórz hasło"} {...register("password2")} className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"/>
                    <Input label={"Numer telefonu"} {...register("phone_number")} error={errors.phone_number?.message} className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"/>
                    <Input label={"Imię"} {...register("first_name")} error={errors.first_name?.message} className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"/>
                    <Input label={"Nazwisko"} {...register("last_name")} error={errors.last_name?.message} className="form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 mb-4"/>
                    <div className="pt-4 mb-4 flex items-center">
                        <input
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            {...register("rodo")}
                        />
                        <label htmlFor="rodo" className="ml-2 block text-sm text-gray-900">
                            Akceptuję <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">RODO</a>
                        </label>
                        {errors.rodo?.message && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.rodo?.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            {...register("terms_of_use")}
                        />
                        <label htmlFor="terms_of_use" className="ml-2 block text-sm text-gray-900">
                            Akceptuję <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">regulamin</a>
                        </label>
                        {errors.terms_of_use?.message && (
                            <p className="mt-2 text-sm text-red-600">
                                {errors.terms_of_use?.message}
                            </p>
                        )}
                    </div>
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline-indigo">
                        Zarejestruj się
                    </button>
                </form>
            </div>
        </LayoutMain>
    );
}

export default Register;
