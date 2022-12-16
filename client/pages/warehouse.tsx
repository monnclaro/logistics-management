import Head from "next/head";

import axios from "axios";
import { useState, useEffect, FormEvent } from "react";

import * as Dialog from "@radix-ui/react-dialog";

import { Nav } from "./components/Nav";

import {
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { Input } from "./components/Input";

type ItemProps = {
  id: string;
  product: string;
  description: string;
  sku: string;
  weight: number;
  pickingStatus: string;
  createdAt: Date;
};

type CountProps = {
  itemsCount: number;
};

export const getServerSideProps = async () => {
  const itemsCountResponse = await axios.get(
    "http://localhost:4000/warehouseitems/count"
  );

  return {
    props: {
      itemsCount: itemsCountResponse.data.count,
    },
  };
};

export default function Warehouse(props: CountProps) {
  const [items, setItems] = useState<ItemProps[]>([]);
  const [open, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios("http://localhost:4000/warehouseitems").then((response) =>
      setItems(response.data)
    );
  }, []);

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
      setIsOpen(false);
    } catch (error) {
      console.error();
    }
  }

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
      setItems(items.filter((p) => p.id !== id));
    } catch (error) {
      console.log(error);
      alert("Ocurred an error while deleting the item!");
    }
  }

  function createDialog() {
    return open ? (
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-zinc-700 bg-[#0d1117] py-8 px-10 text-white shadow-lg shadow-black/25">
          <Dialog.Title className="text-center">Add a new item</Dialog.Title>
          <Dialog.Description className="pt-0.5 text-center text-sm text-[#8B949E]">
            Fill in all fields
          </Dialog.Description>
          <form onSubmit={handleCreateItem} className="mt-8">
            <div className="flex flex-col gap-4">
              <div className="flex justify-evenly">
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
                    required
                  />
                </div>
              </div>
              <div className="flex justify-evenly">
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

              <div className="pl-7">
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
                  required
                />
              </div>
            </div>
            <div className="mt-10 flex justify-end gap-4">
              <Dialog.Close>
                <button className="flex h-[40px] w-[120px] items-center justify-center gap-1 rounded-lg border border-zinc-700 bg-[#0d1117] pt-0 text-sm font-bold text-white duration-300  hover:bg-[#131922] hover:outline-none hover:transition-colors">
                  Cancel
                </button>
              </Dialog.Close>

              <button
                type="submit"
                className="flex h-[40px] w-[120px] items-center justify-center gap-1 rounded-lg border border-zinc-700 bg-[#0d1117] pt-0 text-sm font-bold text-white duration-300  hover:border-[#1f61fb] hover:bg-[#131922] hover:text-white  hover:outline-none hover:ring-1 hover:ring-[#1f61fb] hover:transition-colors"
              >
                Add item
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
        <title>Warehouse Management System</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />
      <div className="h-screen w-screen pt-[82px] pl-48">
        <div className="max-w-screen max-h-screen py-20 px-28">
          <div className="flex justify-between pb-12">
            <div className="flex flex-col">
              <div className="flex flex-row items-center gap-3 text-center align-middle">
                <h1 className="font-bold text-white ">Hangar 01</h1>
                <ArrowPathIcon className="h-4 w-4 cursor-pointer text-white" />
              </div>

              <p className="pb-3 text-sm text-white">
                Inventory last updated 2 hours ago.
              </p>
              <div className="flex gap-6">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-center">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-auto rounded-lg border border-zinc-700 bg-[#161b22] p-2.5 pl-10 text-sm  text-white placeholder-gray-400 focus:border-[#1f61fb] focus:outline-none focus:ring-1 focus:ring-[#1f61fb] sm:text-sm"
                    placeholder="Search products"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                <Dialog.Root open={open} onOpenChange={setIsOpen}>
                  {createDialog()}
                  <Dialog.Trigger>
                    <button className="flex h-[40px] w-[120px] items-center justify-center gap-1 rounded-lg border border-zinc-700 bg-[#161b22] pt-0 text-sm font-medium text-gray-400 duration-700 hover:border-[#1f61fb] hover:text-white  hover:outline-none hover:ring-1 hover:ring-[#1f61fb] hover:transition-colors">
                      New product
                    </button>
                  </Dialog.Trigger>
                </Dialog.Root>
              </div>
            </div>

            <div className="grid h-24 grid-cols-2 bg-[#0d1117] text-center text-white">
              <section className="max-w-[194px] border-[1px] border-zinc-700 px-16 py-6 text-xs font-bold uppercase shadow-sm">
                <p>Products</p>
                <p className="text-xl font-bold text-[#f78166]">
                  {props.itemsCount}
                </p>
              </section>
              <section className="max-w-[194px] border-[1px] border-zinc-700 p-6  px-16 text-xs font-bold uppercase shadow-sm">
                <p>Limit</p>
                <p className="text-xl font-bold text-[#f78166]">250</p>
              </section>
            </div>
          </div>

          <div className=" h-[470px] overflow-y-scroll shadow-lg transition-all sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
              <thead className="border border-zinc-700 bg-[#12151b] text-xs font-bold uppercase text-white">
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
                        className="border-b border-zinc-700 bg-[#161b22] hover:bg-[#262e3a]"
                        key={products.id}
                      >
                        <th
                          scope="row"
                          className="whitespace-nowrap py-4 px-6 font-bold text-white"
                        >
                          {products.product}
                        </th>
                        <td className="py-4 px-6">{products.description}</td>
                        <td className="py-4 px-6">{products.sku}</td>
                        <td className="py-4 px-6">{products.weight}</td>
                        <td className="py-4 px-6">{products.pickingStatus}</td>

                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => handleDelete(products.id)}
                            className="pl-1 font-medium text-white hover:underline"
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
