import Head from "next/head";

import { useState, useEffect, FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { Nav } from "./components/Nav";
import { Input } from "./components/Input";

import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

type DataProps = {
  id: string;
  carNumber: string;
  dateTime: string;
  tu: string;
  carrier: string;
  shipTo: string;
  weight: string;
  numberOfItems: string;
  pickingStatus: string;
  createAt: Date;
};

export default function Transportation() {
  const [items, setItems] = useState<DataProps[]>([]);
  const [open, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios("http://localhost:4000/deliveryitems").then((response) =>
      setItems(response.data)
    );
  }, []);

  function handleDelete(id: string) {
    try {
      const response = axios.delete(
        `http://localhost:4000/deliveryitems/${id}`
      );
      setItems(items.filter((p) => p.id !== id));
      alert("Item deleted with success");
    } catch (error) {
      console.log(error);
      alert("Error while trying to delete the item!");
    }
  }

  async function handleCreateItem(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios.post(`http://localhost:4000/deliveryitems`, {
        carNumber: data.carNumber,
        dateTime: data.dateTime,
        tu: data.tu,
        carrier: data.carrier,
        shipTo: data.shipTo,
        weight: data.weight,
        numberOfItems: data.numberOfItems,
        pickingStatus: data.pickingStatus,
      });

      setItems([response.data, ...items]);
      setIsOpen(false);
    } catch (err) {
      console.log(err);
      alert("Error while creating item!");
    }
  }

  function createDialog() {
    return open ? (
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-zinc-700 bg-[#0d1117] py-8 px-10 text-white shadow-lg shadow-black/25">
          <Dialog.Title className="text-center">
            Add a new delivery
          </Dialog.Title>
          <Dialog.Description className="pt-0.5 text-center text-sm text-[#8B949E]">
            Fill in all fields
          </Dialog.Description>
          <form onSubmit={handleCreateItem} className="mt-8">
            <div className="flex flex-col gap-4">
              <div className="flex justify-evenly">
                <div>
                  <label
                    htmlFor="carNumber"
                    className="text-xs font-semibold text-white"
                  >
                    Del. Number
                  </label>
                  <Input
                    type="text"
                    placeholder="Del. Number"
                    name="carNumber"
                    id="carNumber"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="dateTime"
                    className="text-xs font-semibold text-white"
                  >
                    Date / Time
                  </label>
                  <Input
                    type="datetime-local"
                    placeholder="Date / Time"
                    name="dateTime"
                    id="dateTime"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-evenly">
                <div>
                  <label
                    htmlFor="tu"
                    className="text-xs font-semibold text-white"
                  >
                    TU
                  </label>
                  <Input
                    type="text"
                    placeholder="TU"
                    name="tu"
                    id="tu"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="carrier"
                    className="text-xs font-semibold text-white"
                  >
                    Carrier
                  </label>
                  <Input
                    type="text"
                    placeholder="Carrier"
                    name="carrier"
                    id="carrier"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-evenly">
                <div>
                  <label
                    htmlFor="shipTo"
                    className="text-xs font-semibold text-white"
                  >
                    Ship to
                  </label>
                  <Input
                    type="text"
                    placeholder="Ship to"
                    name="shipTo"
                    id="shipTo"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="weight"
                    className="text-xs font-semibold text-white"
                  >
                    Weight
                  </label>
                  <Input
                    type="text"
                    placeholder="Weight"
                    name="weight"
                    id="weight"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-evenly">
                <div>
                  <label
                    htmlFor="numberOfItems"
                    className="text-xs font-semibold text-white"
                  >
                    Number of items
                  </label>
                  <Input
                    type="text"
                    placeholder="No. of items"
                    name="numberOfItems"
                    id="numberOfItems"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="pickingStatus"
                    className="text-xs font-semibold text-white"
                  >
                    Status
                  </label>
                  <Input
                    type="text"
                    placeholder="Status"
                    name="pickingStatus"
                    id="pickingStatus"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex justify-end gap-4">
              <Dialog.Close>
                <button className="h flex h-[40px] w-[120px] items-center justify-center gap-1 rounded-lg border border-zinc-700 bg-[#0d1117] pt-0  text-sm font-bold text-white duration-300  hover:bg-[#131922] hover:outline-none hover:transition-colors">
                  Cancel
                </button>
              </Dialog.Close>

              <button
                type="submit"
                className="flex h-[40px] w-[120px] items-center justify-center gap-1 rounded-lg border border-zinc-700 bg-[#0d1117] pt-0 text-sm font-bold text-white duration-300  hover:border-[#1f61fb] hover:bg-[#131922] hover:text-white  hover:outline-none hover:ring-1 hover:ring-[#1f61fb] hover:transition-colors"
              >
                Add deliver
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    ) : null;
  }

  return (
    <div>
      <Head>
        <title>Transport Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="h-screen w-screen pt-[82px] pl-48">
        <div className="max-w-screen max-h-screen py-20 px-28">
          <div className="flex justify-between pb-12">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-3 text-center align-middle">
                <h1 className="font-bold text-white ">Deliveries</h1>
                <ArrowPathIcon className="h-4 w-4 cursor-pointer text-white" />
              </div>

              <p className="pb-3 text-sm text-white">
                Table last updated 2 hours ago
              </p>

              <div className="flex gap-6">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-center">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-auto rounded-lg border border-zinc-700 bg-[#161b22] p-2.5 pl-10 text-sm  text-white placeholder-gray-400 focus:border-[#1f61fb] focus:outline-none focus:ring-1 focus:ring-[#1f61fb] sm:text-sm"
                    placeholder="Search deliveries"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <Dialog.Root open={open} onOpenChange={setIsOpen}>
                  {createDialog()}
                  <Dialog.Trigger>
                    <button className="flex h-[40px] w-[120px] items-center justify-center gap-1 rounded-lg border border-zinc-700 bg-[#161b22] pt-0 text-sm font-medium text-gray-400 duration-700 hover:border-[#1f61fb] hover:text-white  hover:outline-none hover:ring-1 hover:ring-[#1f61fb] hover:transition-colors">
                      New delivery
                    </button>
                  </Dialog.Trigger>
                </Dialog.Root>
              </div>
            </div>
          </div>

          <div className="h-[470px] overflow-y-scroll shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-400  ">
              <thead className="border border-zinc-700 bg-[#12151b] text-xs font-bold uppercase text-white ">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-all-search"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                      />
                      <label className="sr-only">checkbox</label>
                    </div>
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Del. number
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Date / Time
                  </th>
                  <th scope="col" className="py-3 px-6">
                    TU
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Carrier
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Ship to
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Weight
                  </th>
                  <th scope="col" className="py-3 px-6">
                    No. of items
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Picking status
                  </th>
                  <th scope="col" className="py-3 px-6">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {items
                  ?.filter(
                    (product) =>
                      product.carNumber.toLocaleLowerCase().includes(query) ||
                      product.carrier.toLocaleLowerCase().includes(query) ||
                      product.shipTo.toLocaleLowerCase().includes(query) ||
                      product.pickingStatus.toLocaleLowerCase().includes(query)
                  )
                  .map((items) => {
                    return (
                      <tr
                        className="border-b border-zinc-700 bg-[#161b22] hover:bg-[#262e3a]"
                        key={items.id}
                      >
                        <td className="w-4 p-4">
                          <div className="flex items-center">
                            <input
                              id="checkbox-table-search-2"
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                            />
                            <label className="sr-only">checkbox</label>
                          </div>
                        </td>
                        <th
                          scope="row"
                          className="whitespace-nowrap py-4 px-6 font-medium text-white "
                        >
                          {items.carNumber}
                        </th>
                        <td className="py-4 px-6">
                          {items.dateTime.toString()}
                        </td>
                        <td className="py-4 px-6">{items.tu}</td>
                        <td className="py-4 px-6">{items.carrier}</td>
                        <td className="py-4 px-6">{items.shipTo}</td>
                        <td className="py-4 px-6">{items.weight}</td>
                        <td className="py-4 px-6">{items.numberOfItems}</td>
                        <td className="py-4 px-6">{items.pickingStatus}</td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleDelete(items.id)}
                            className="font-medium text-white hover:underline"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
