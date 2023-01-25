import { LayoutMain } from "@/components/layout";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { LoginUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/forms/input";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "@/api/user";

const schema = z.object({
    username: z.string(),
    password: z.string()
});

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginUser>({
        resolver: zodResolver(schema),
    });
    const mutation = useMutation({
        mutationFn: async (data: LoginUser) => {
            await loginUser(data);
        },
        onSuccess: (data) => {
            window.location.href = "/";
        }
    });

    return (
        <LayoutMain title="Logowanie">
            <div className="mx-auto p-4 max-w-sm rounded-md shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Logowanie</h2>
                <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
                    <div className="mb-4">
                        <Input
                            label={"Nazwa użytkownika"}
                            className={"form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            }
                            {...register("username")}
                            error={errors.username?.message}
                        />
                    </div>
                    <div className="mb-6">
                        <Input
                            label={"Hasło"}
                            type="password"
                            className={
                                "form-input mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            }
                            {...register("password")}
                            error={errors.password?.message}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Zaloguj
                        </button>
                    </div>
                </form>
            </div>
        </LayoutMain>
    );
};

export default Login;


