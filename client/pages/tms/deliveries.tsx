import axios from "axios";
import Head from "next/head";
import { useState, useEffect, FormEvent } from "react";

import { Nav } from "../components/Nav";
import { Input } from "../components/Input";

import toast, { Toaster } from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";

type DeliveryProps = {
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

type CountProps = {
  count: number;
};

const deletionNotify = () =>
  toast.success("Delivery deleted!", {
    position: "bottom-right",
    style: {
      borderRadius: "10px",
      background: "#1f61fb",
      color: "#fff",
      fontSize: "15px",
    },
    iconTheme: {
      primary: "#FFF",
      secondary: "#1f61fb",
    },
  });

const deleteErrorNotify = () =>
  toast.error("This didn't work.", {
    position: "bottom-right",
    style: {
      borderRadius: "10px",
      background: "#FF0000",
      color: "#fff",
      fontSize: "15px",
    },
    iconTheme: {
      primary: "#FFF",
      secondary: "#FF0000",
    },
  });

const creationNotify = () =>
  toast.success("Successfully created!", {
    position: "bottom-right",
    style: {
      borderRadius: "10px",
      background: "#1f61fb",
      color: "#fff",
      fontSize: "15px",
    },
    iconTheme: {
      primary: "#FFF",
      secondary: "#1f61fb",
    },
  });

const creationErrorNotify = () =>
  toast.error("This didn't work.", {
    position: "bottom-right",
    style: {
      borderRadius: "10px",
      background: "#FF0000",
      color: "#fff",
      fontSize: "15px",
    },
    iconTheme: {
      primary: "#FFF",
      secondary: "#FF0000",
    },
  });

export default function Transportation() {
  const [items, setItems] = useState<DeliveryProps[]>([]);
  const [count, setCount] = useState<CountProps>();
  const [open, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios("http://localhost:4000/deliveryitems/count").then((response) =>
      setCount(response.data)
    );
  }, []);

  useEffect(() => {
    axios("http://localhost:4000/deliveryitems").then((response) =>
      setItems(response.data)
    );
  }, []);

  function handleDelete(id: string) {
    try {
      axios.delete(`http://localhost:4000/deliveryitems/${id}`);

      setItems(items.filter((p) => p.id !== id));

      deletionNotify();
    } catch (error) {
      console.log(error);
      deleteErrorNotify();
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

      creationNotify();
    } catch (error) {
      console.log(error);
      creationErrorNotify();
    }
  }

  function createDialog() {
    return open ? (
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-zinc-700 bg-[#0d1117] py-8 px-10 text-white shadow-lg shadow-black/25">
          <Dialog.Title className="flex items-center gap-1 text-xl">
            New delivery
            <PlusSmallIcon className="h-7 w-7" />
          </Dialog.Title>
          <Dialog.Description className="pt-0.5 text-sm text-[#8B949E]">
            Fill in all fields to create a new delivery <br />
            in our database.
          </Dialog.Description>
          <form onSubmit={handleCreateItem} className="mt-6">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between">
                <div>
                  <label
                    htmlFor="carNumber"
                    className="text-xs font-semibold text-white"
                  >
                    Del. Number:
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
                    Date - Time:
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

              <div className="flex justify-between">
                <div>
                  <label
                    htmlFor="tu"
                    className="text-xs font-semibold text-white"
                  >
                    TU:
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
                    Carrier:
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
              <div className="flex justify-between">
                <div>
                  <label
                    htmlFor="shipTo"
                    className="text-xs font-semibold text-white"
                  >
                    Ship to:
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
                    Weight:
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
              <div className="flex justify-between">
                <div>
                  <label
                    htmlFor="numberOfItems"
                    className="text-xs font-semibold text-white"
                  >
                    Number of items:
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
                    Status:
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
              <Dialog.Close className="h flex h-[40px] w-[120px] items-center justify-center gap-1 rounded-lg border border-zinc-700 bg-[#0d1117] text-sm font-medium text-white duration-300  hover:bg-[#131922] hover:outline-none hover:transition-colors">
                Cancel
              </Dialog.Close>

              <button
                type="submit"
                className="flex h-[40px] w-[120px] items-center justify-center gap-1 rounded-lg border border-zinc-700 bg-[#0d1117] text-sm font-medium text-white duration-300  hover:border-[#1f61fb] hover:bg-[#131922] hover:text-white  hover:outline-none hover:ring-1 hover:ring-[#1f61fb] hover:transition-colors"
              >
                Add delivery
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
        <title>TMS | Deliveries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <Toaster />
      <div className="h-screen w-screen pt-[82px] pl-48">
        <div className="max-w-screen max-h-screen py-20 px-28">
          <div className="flex justify-between pb-12">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-2 text-center align-middle">
                <TableCellsIcon className="h-5 w-5 cursor-pointer text-white" />
                <h1 className="font-semibold text-white">Deliveries</h1>
              </div>

              <div className="pb-3 text-sm text-white">
                <p>Table last updated 6 hours ago.</p>
              </div>

              <div className="flex gap-6">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-center">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-auto rounded-lg border border-zinc-700 bg-[#0d1117] p-2.5 pl-10 text-sm  text-white placeholder-gray-400 focus:border-[#1f61fb] focus:outline-none focus:ring-1 focus:ring-[#1f61fb] sm:text-sm"
                    placeholder="Search deliveries"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <Dialog.Root open={open} onOpenChange={setIsOpen}>
                  {createDialog()}
                  <Dialog.Trigger className="flex h-[40px] w-[120px] items-center justify-center gap-1 rounded-lg border border-zinc-700 bg-[#161b22] pt-0 text-sm font-medium text-gray-400 hover:border-[#1f61fb] hover:text-white  hover:outline-none hover:ring-1 hover:ring-[#1f61fb] hover:transition-colors">
                    New delivery
                  </Dialog.Trigger>
                </Dialog.Root>
              </div>
            </div>
            <div className="grid h-24 grid-cols-2 bg-[#0d1117] text-center text-white">
              <section className="max-w-[200px] border-[1px] border-zinc-700 px-16 py-6 text-xs font-bold shadow-sm">
                <p>Deliveries</p>
                <p className="text-xl font-bold text-[#f78166]">
                  {count?.count}
                </p>
              </section>
              <section className="max-w-[200px] border-[1px] border-zinc-700 p-6  px-16 text-xs font-bold shadow-sm">
                <p>Handed out</p>
                <p className="text-xl font-bold text-[#f78166]">132</p>
              </section>
            </div>
          </div>

          <div className="h-[475px] overflow-y-scroll shadow-md">
            <table className="w-full text-left text-sm text-gray-400  ">
              <thead className="bg-[#12151b] text-xs font-bold uppercase text-white ">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded bg-[#12151b] accent-[#12151b]"
                        checked
                        readOnly
                      />
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
                      product.weight.toLocaleLowerCase().includes(query) ||
                      product.numberOfItems
                        .toLocaleLowerCase()
                        .includes(query) ||
                      product.dateTime.toLocaleLowerCase().includes(query) ||
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
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 bg-gray-100  text-blue-600 accent-[#1f61fb] ring-offset-gray-800 focus:ring-2 focus:ring-blue-600"
                            />
                          </div>
                        </td>
                        <th
                          scope="row"
                          className="whitespace-nowrap py-4 px-6 font-medium text-white "
                        >
                          {items.carNumber}
                        </th>
                        <td className="py-4 px-6">
                          {items.dateTime.toString().replace("T", " - ")}
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
