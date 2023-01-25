import { Tab } from "@headlessui/react";

import { clsx } from "clsx";

import {API_URL, SERVER_URL} from "@/environment";

import type { Item } from "@/types";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useUser} from "@/hooks/user";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";

export type ProductProps = {
  item: Item;
};

const schema = z.object({
  start_date: z.string(),
    end_date: z.string(),
});

interface FormValues {
    start_date: string;
    end_date: string;
}

export const Product = ({ item }: ProductProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleSubmit, register, formState: { errors } } = useForm<FormValues>(
        {
            resolver: zodResolver(schema),
        }
  );
  const { data: user } = useUser();

  const mutation = useMutation({
    mutationFn: async (data: {start_date: string, end_date: string}) => {
      onSubmit(data.start_date, data.end_date);
    },
    onSuccess: () => {
      alert("Wypożyczono przedmiot, czekaj na potwierdzenie");
    }
  });

  const onSubmit = async (start_date: string, end_date: string) => {
    try {
        const rental = {
            item: item.id,
            user: user?.id,
            start_date: new Date(start_date).toISOString().split('T')[0],
            end_date: new Date(end_date).toISOString().split('T')[0],
        }
      await fetch(`${API_URL}/rentitem/`, {
        method: 'POST',
        body: JSON.stringify(rental),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
      setIsModalOpen(false);

    } catch (error) {
        console.error(error);
    }
  };
  console.log(item.status);
  return (
    <div>
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <Tab.Group as="div" className="flex flex-col-reverse">
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {item.images.map(({ id, image}) => (
                  <Tab
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    key={id}
                  >
                    {({ selected }) => (
                      <>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className="h-32 w-32 object-cover object-center"
                            src={`${SERVER_URL}/${image}`}
                            alt=""
                          />
                        </span>
                        <span
                          aria-hidden="true"
                          className={clsx(
                            "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2",
                            selected ? "ring-indigo-500" : "ring-transparent"
                          )}
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>
            <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
              {item.images.map(({  id, image }) => (
                <Tab.Panel key={id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="h-full w-full object-cover object-center sm:rounded-lg"
                    src={`${SERVER_URL}/${image}`}
                    alt=""
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {item.name}
            </h1>
            <div className="mt-3">
              <h2 className="sr-only">Informacje o produkcie</h2>
              <p className="text-3xl tracking-tight text-gray-900">
              {/*  cena */}
              </p>
            </div>
            <div className="mt-6">
              <h3 className="sr-only">Opis</h3>
              <div className="space-y-6 text-base text-gray-700">
                {item.description}
              </div>
            </div>
              <div className="sm:flex-col1 mt-10 flex">
                {user ? item.status === "Rented" ?
                    <button
                        disabled={true}
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-500 hover:bg-gray-700 md:py-4 md:text-lg md:px-10"
                    >
                        Przedmiot niedostępny
                    </button>
                    :
                    (
                <button
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  onClick={() => { user ? setIsModalOpen(true) : window.location.href = '/login' }}
                >
                  Wypożycz
                </button>) : (
                    <button
                        className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                        onClick={() => { window.location.href = '/login' }}
                    >
                        Zaloguj się
                    </button>
                )}
                {isModalOpen && (
                    <div className="fixed top-0 left-0 h-full w-full bg-gray-700 bg-opacity-50 flex items-center justify-center">
                      <div className="max-w-md m-4 bg-white rounded-lg shadow-lg">
                        <div className="p-8">
                          <h2 className="text-xl font-bold mb-4">Wypożycz {item.name}</h2>
                          <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
                            <label className="block mb-2 font-bold">Od kiedy:</label>
                            <input
                                type="date"
                                className="border p-2 w-full"
                                {...register("start_date", { required: true })}
                            />
                            {errors.start_date && <p className="text-red-600">To pole jest wymagane</p>}
                            <label className="block mt-4 mb-2 font-bold">Do kiedy:</label>
                            <input
                                type="date"
                                className="border p-2 w-full"
                                {...register("end_date", { required: true })}
                            />
                            {errors.end_date && <p className="text-red-600">To pole jest wymagane</p>}
                            <div className="flex justify-end mt-6">
                              <button type="button" className="mx-2 px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400" onClick={() => setIsModalOpen(false)}>
                                Anuluj
                              </button>
                              <button type="submit" className="mx-2 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white">
                                Wypożycz
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
