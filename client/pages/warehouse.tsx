import Head from "next/head";
import axios from "axios";
import { useState, useEffect, FormEvent, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import Nav from "./components/Nav";
import { Input } from "./components/Input";

import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
//import MyModal from "./components/Modal";

type DataProps = {
  id: string;
  product: string;
  description: string;
  sku: string;
  weight: number;
  pickingStatus: string;
  createdAt: Date;
};

type CountProps = {
  count: string;
};

export default function Warehouse() {
  const [items, setItems] = useState<DataProps[]>([]);
  const [count, setCount] = useState<CountProps>();
  const [query, setQuery] = useState("");

  const [productInput, setProductInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [skuInput, setSkuInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [pickingInput, setPickingInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function DeleteModal() {
    return (
      <>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog className="relative z-10" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0  bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-2xl bg-[#222227] p-6 text-center align-middle shadow-xl transition-all">
                    <Dialog.Title className="text-lg font-medium leading-6 text-white">
                      Item deleted
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-300">
                        The item has been successfully deleted.
                      </p>
                    </div>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-zinc-500 bg-[#222227] px-4 py-2 text-sm font-medium text-white hover:border-[#E24A8D] hover:outline-none hover:ring-1 hover:ring-[#E24A8D]"
                        onClick={closeModal}
                      >
                        Got it, thanks!
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }

  useEffect(() => {
    axios("http://localhost:4000/warehouseitems").then((response) =>
      setItems(response.data)
    );
  }, []);

  useEffect(() => {
    axios("http://localhost:4000/warehouseitems/count").then((response) =>
      setCount(response.data)
    );
  }, []);

  async function handleUpdate(id: string, event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const response = await axios.put(
      `http://localhost:4000/warehouseitems/${id}`,
      {
        product: data.product,
        description: data.description,
        sku: data.sku,
        weight: data.weight,
        pickingStatus: data.pickingStatus,
      }
    );
    setItems([response.data, ...items]);
    alert("Item updated with success!");
  }

  function handleDelete(id: string) {
    try {
      axios.delete(`http://localhost:4000/warehouseitems/${id}`);
      openModal();
      setItems(items.filter((p) => p.id !== id));
    } catch (error) {
      console.log(error);
      alert("Ocurred an error while deleting the item!");
    }
  }

  async function handleCreateItem(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios.post(
        `http://localhost:4000/warehouseitems`,
        {
          product: data.product,
          description: data.description,
          sku: data.sku,
          weight: data.weight,
          pickingStatus: data.pickingStatus,
        }
      );

      setItems([response.data, ...items]);
      alert("Item created with success!");

      setProductInput("");
      setDescriptionInput("");
      setSkuInput("");
      setWeightInput("");
      setPickingInput("");
    } catch (err) {
      console.log(err);
      alert("Ocurred an error while creating the item!");
    }
  }

  return (
    <div>
      <Head>
        <title>Warehouse Management System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <div className="h-screen w-screen pt-[82px] pl-48">
        <div className="max-w-screen max-h-screen py-20 px-16">
          <div className="flex justify-between pb-12">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-3 text-center align-middle">
                <h1 className="font-bold text-white ">Hangar 01</h1>
                <ArrowPathIcon className="h-4 w-4 cursor-pointer text-white" />
              </div>

              <p className="pb-3 text-sm text-white">
                Inventory last updated 2 hours ago
              </p>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-center">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-auto rounded-lg border border-zinc-600 bg-[#252527] p-2.5 pl-10 text-sm  text-white placeholder-gray-400 focus:border-[#E24A8D] focus:outline-none focus:ring-1 focus:ring-[#E24A8D] sm:text-sm"
                  placeholder="Search products"
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>

            <form
              onSubmit={handleCreateItem}
              className="grid grid-cols-3 gap-y-2 gap-x-3"
            >
              <div>
                <label
                  htmlFor="product"
                  className="text-xs font-semibold text-white"
                >
                  Product
                </label>
                <Input
                  type="text"
                  placeholder="Product"
                  name="product"
                  id="product"
                  onChange={(event) => setProductInput(event.target.value)}
                  value={productInput}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="text-xs font-semibold text-white"
                >
                  Description
                </label>
                <Input
                  type="text"
                  placeholder="Description"
                  name="description"
                  id="description"
                  onChange={(event) => setDescriptionInput(event.target.value)}
                  value={descriptionInput}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="sku"
                  className="text-xs font-semibold text-white"
                >
                  SKU
                </label>
                <Input
                  type="text"
                  name="sku"
                  id="sku"
                  placeholder="SKU"
                  onChange={(event) => setSkuInput(event.target.value)}
                  value={skuInput}
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
                  htmlFor="pickingStatus"
                  className="text-xs font-semibold text-white"
                >
                  Picking status
                </label>
                <Input
                  type="text"
                  placeholder="Picking status"
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

            <div className="grid h-24 grid-cols-2 bg-[#252527] text-center text-white">
              <section className="max-w-[194px] border-[1px] border-zinc-600 px-16 py-6 text-xs font-bold uppercase shadow-sm">
                <p>Products</p>
                <p className="text-xl font-bold text-[#E24A8D]">
                  {count?.count}
                </p>
              </section>
              <section className="max-w-[194px] border-[1px] border-zinc-600 p-6  px-16 text-xs font-bold uppercase shadow-sm">
                <p>Limit</p>
                <p className="text-xl font-bold text-[#E24A8D]">250</p>
              </section>
            </div>
          </div>
          <div className="relative h-[470px] overflow-y-scroll shadow-lg transition-all sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="bg-zinc-900 text-xs uppercase text-white ">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Product name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Description
                  </th>
                  <th scope="col" className="py-3 px-6">
                    SKU
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Weight
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
                    (item) =>
                      item.product.toLowerCase().includes(query) ||
                      item.description.toLowerCase().includes(query) ||
                      item.sku.toLowerCase().includes(query) ||
                      item.pickingStatus.toLowerCase().includes(query)
                  )
                  .map((products) => {
                    return (
                      <tr
                        className="border-b border-zinc-700 bg-[#252527] hover:bg-zinc-700"
                        key={products.id}
                      >
                        <th
                          scope="row"
                          className="whitespace-nowrap py-4 px-6 font-medium text-white"
                        >
                          {products.product}
                        </th>
                        <td className="py-4 px-6">{products.description}</td>
                        <td className="py-4 px-6">{products.sku}</td>
                        <td className="py-4 px-6">{products.weight}</td>
                        <td className="py-4 px-6">{products.pickingStatus}</td>

                        <td className="py-4 px-6 text-right">
                          <button className="pr-1 font-medium text-[#E24A8D] hover:underline">
                            Edit
                          </button>
                          <>
                            <DeleteModal />
                            <button
                              onClick={() => handleDelete(products.id)}
                              className="pl-1 font-medium text-[#E24A8D] hover:underline"
                            >
                              Delete
                            </button>
                          </>
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
