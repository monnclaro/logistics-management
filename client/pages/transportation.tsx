import Head from "next/head";

import { useState, useEffect, FormEvent } from "react";

import Nav from "./components/Nav";
import { Input } from "./components/Input";

import {
  ArrowPathIcon,
  EllipsisHorizontalCircleIcon,
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
  const [query, setQuery] = useState("");

  const [carNumberInput, setCarNumberINput] = useState("");
  const [dateTimeInput, setDateTimeInput] = useState("");
  const [tuInput, setTuInput] = useState("");
  const [carrierInput, setCarrierInput] = useState("");
  const [shipToInput, setShipToInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [numberOfItemsInput, setNumberOfItemsInput] = useState("");
  const [pickingInput, setPickingInput] = useState("");

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
      setCarrierInput("");
      setDateTimeInput("");
      setTuInput("");
      setNumberOfItemsInput("");
      setPickingInput("");
      setCarNumberINput("");
      setShipToInput("");
      setWeightInput("");
      alert("Item created with success!");
    } catch (err) {
      console.log(err);
      alert("Error while creating item!");
    }
  }

  return (
    <div>
      <Head>
        <title>Transport Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <div className="h-screen w-screen pt-[82px] pl-48">
        <div className="max-w-screen max-h-screen py-20 px-16">
          <div className="flex justify-between pb-12">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-3 text-center align-middle">
                <h1 className="font-bold text-white ">Deliveries</h1>
                <ArrowPathIcon className="h-4 w-4 cursor-pointer text-white" />
              </div>

              <p className="pb-3 text-sm text-white">
                Table last updated 2 hours ago
              </p>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-center">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-auto rounded-lg border border-zinc-600 bg-[#252527] p-2.5 pl-10 text-sm  text-white placeholder-gray-400 focus:border-[#E24A8D] focus:outline-none focus:ring-1 focus:ring-[#E24A8D] sm:text-sm"
                  placeholder="Search deliveries"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <form
                className="grid grid-cols-5 gap-x-4 gap-y-2"
                onSubmit={handleCreateItem}
              >
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
                    onChange={(event) => setCarNumberINput(event.target.value)}
                    value={carNumberInput}
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
                    onChange={(event) => setDateTimeInput(event.target.value)}
                    value={dateTimeInput}
                    required
                  />
                </div>
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
                    onChange={(event) => setTuInput(event.target.value)}
                    value={tuInput}
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
                    onChange={(event) => setCarrierInput(event.target.value)}
                    value={carrierInput}
                    required
                  />
                </div>
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
                    onChange={(event) => setShipToInput(event.target.value)}
                    value={shipToInput}
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
                    onChange={(event) => setWeightInput(event.target.value)}
                    value={weightInput}
                    required
                  />
                </div>
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
                    onChange={(event) =>
                      setNumberOfItemsInput(event.target.value)
                    }
                    value={numberOfItemsInput}
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
                    onChange={(event) => setPickingInput(event.target.value)}
                    value={pickingInput}
                    required
                  />
                </div>
                <div className="pt-[30px]">
                  <button
                    type="submit"
                    className="flex h-[30px] w-[80px] items-center justify-center gap-1 rounded-lg border border-zinc-500 bg-[#252527] pt-0 text-sm  font-bold text-gray-400 duration-700 hover:border-[#E24A8D] hover:text-white  hover:outline-none hover:ring-1 hover:ring-[#E24A8D] hover:transition-colors"
                  >
                    <PlusIcon className="relative h-5 w-5 cursor-pointer text-white" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="relative h-[470px] overflow-y-scroll shadow-lg sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-400  ">
              <thead className="bg-zinc-900 text-xs uppercase text-white ">
                <tr>
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
                        className="border-b border-zinc-700 bg-[#252527] hover:bg-zinc-700"
                        key={items.id}
                      >
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
                            className="font-medium text-[#E24A8D] hover:underline"
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
