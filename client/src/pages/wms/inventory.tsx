import axios from "axios";
import Head from "next/head";
import { useState, useEffect, FormEvent } from "react";

import { Nav } from "../../components/Nav";
import { Input } from "../../components/Input";

import { Toaster } from "react-hot-toast";
import * as Dialog from "@radix-ui/react-dialog";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import {
  creationNotify,
  creationErrorNotify,
  deletionNotify,
  deleteErrorNotify,
} from "../../utils/notifications";

type TableProps = {
  id: string;
  product: string;
  category: string;
  sku: string;
  stock: string;
  rating: string;
  price: string;
  createdAt: Date;
};

type CountProps = {
  count: number;
};

export default function Warehouse() {
  const [items, setItems] = useState<TableProps[]>([]);
  const [count, setCount] = useState<CountProps>();
  const [open, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios("http://localhost:4000/warehouseitems/count").then((response) =>
      setCount(response.data)
    );
  }, []);

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
          category: data.category,
          sku: data.sku,
          stock: data.stock,
          price: data.price,
          rating: data.rating,
        }
      );
      setItems([response.data, ...items]);
      setIsOpen(false);

      creationNotify();
    } catch (error) {
      console.error(error);
      creationErrorNotify();
    }
  }

  function handleDelete(id: string) {
    try {
      axios.delete(`http://localhost:4000/warehouseitems/${id}`);
      setItems(items.filter((p) => p.id !== id));

      deletionNotify();
    } catch (error) {
      console.log(error);
      deleteErrorNotify();
    }
  }

  function createDialog() {
    return open ? (
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[435px] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-zinc-700 bg-[#0d1117] py-8 px-10 text-white shadow-lg shadow-black/25">
          <Dialog.Title className="flex items-center gap-1 text-xl">
            New product
            <PlusSmallIcon className="h-7 w-7" />
          </Dialog.Title>
          <Dialog.Description className="pt-0.5 text-sm text-[#8B949E]">
            Fill in all fields to create a new product in our database.
          </Dialog.Description>
          <form onSubmit={handleCreateItem} className="mt-6">
            <div className="flex flex-col gap-6">
              <div className="flex justify-between">
                <div>
                  <label
                    htmlFor="product"
                    className="text-xs font-semibold text-white"
                  >
                    Product:
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
                    htmlFor="category"
                    className="text-xs font-semibold text-white"
                  >
                    Category:
                  </label>
                  <Input
                    type="text"
                    placeholder="Category"
                    name="category"
                    id="category"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <label
                    htmlFor="sku"
                    className="text-xs font-semibold text-white"
                  >
                    SKU:
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
                    htmlFor="stock"
                    className="text-xs font-semibold text-white"
                  >
                    Stock:
                  </label>
                  <Input
                    type="text"
                    placeholder="Stock"
                    name="stock"
                    id="stock"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <div>
                  <label
                    htmlFor="price"
                    className="text-xs font-semibold text-white"
                  >
                    Price:
                  </label>
                  <Input
                    type="text"
                    placeholder="Price"
                    name="price"
                    id="price"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="rating"
                    className="text-xs font-semibold text-white"
                  >
                    Rating:
                  </label>
                  <Input
                    type="text"
                    placeholder="Rating"
                    name="rating"
                    id="rating"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-end gap-4">
              <div>
                <Dialog.Close className="flex h-[40px] w-[120px] items-center justify-center gap-1 rounded-lg border border-zinc-700 bg-[#0d1117] text-sm font-medium text-white duration-300  hover:bg-[#131922] hover:outline-none hover:transition-colors">
                  Cancel
                </Dialog.Close>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex h-[40px] w-[120px] items-center justify-center gap-1 rounded-lg border border-zinc-700 bg-[#0d1117]  text-sm font-medium text-white duration-300  hover:border-[#1f61fb] hover:bg-[#131922] hover:text-white  hover:outline-none hover:ring-1 hover:ring-[#1f61fb] hover:transition-colors"
                >
                  Add product
                </button>
              </div>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    ) : null;
  }

  return (
    <div>
      <Head>
        <title>WMS | Inventory</title>
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
                <h1 className="font-semibold text-white ">Hangar 01</h1>
              </div>
              <div className="pb-3 text-sm text-white">
                <p>Inventory last updated 2 hours ago.</p>
              </div>
              <div className="flex gap-6">
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-center">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-auto rounded-lg border border-zinc-700 bg-[#0d1117] p-2.5 pl-10 text-sm  text-white placeholder-gray-400 focus:border-[#1f61fb] focus:outline-none focus:ring-1 focus:ring-[#1f61fb] sm:text-sm"
                    placeholder="Search products"
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                <Dialog.Root open={open} onOpenChange={setIsOpen}>
                  {createDialog()}
                  <Dialog.Trigger className="flex h-[40px] w-[120px] items-center justify-center gap-1 rounded-lg border border-zinc-700 bg-[#161b22] pt-0 text-sm font-medium text-gray-400 duration-300 hover:border-[#1f61fb] hover:text-white  hover:outline-none hover:ring-1 hover:ring-[#1f61fb] hover:transition-colors">
                    New product
                  </Dialog.Trigger>
                </Dialog.Root>
              </div>
            </div>

            <div className="grid h-24 grid-cols-2 bg-[#0d1117] text-center text-white">
              <section className="max-w-[200px] border-[1px] border-zinc-700 px-16 py-6 text-xs font-bold shadow-sm">
                <p>Products</p>
                <p className="text-xl font-bold text-[#f78166]">
                  {count?.count}
                </p>
              </section>
              <section className="max-w-[200px] border-[1px] border-zinc-700 p-6  px-16 text-xs font-bold shadow-sm">
                <p>Limit</p>
                <p className="text-xl font-bold text-[#f78166]">250</p>
              </section>
            </div>
          </div>

          <div className="h-[500px] overflow-y-scroll shadow-lg">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-[#12151b] text-xs font-bold uppercase text-white">
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
                    Product
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Category
                  </th>
                  <th scope="col" className="py-3 px-6">
                    SKU
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Stock
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Price
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Rating
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
                      item.category.toLowerCase().includes(query) ||
                      item.sku.toLowerCase().includes(query) ||
                      item.price.toLowerCase().includes(query) ||
                      item.rating.toLowerCase().includes(query) ||
                      item.stock.toLowerCase().includes(query)
                  )
                  .map((products) => {
                    return (
                      <tr
                        className="border-b border-zinc-700 bg-[#161b22] hover:bg-[#262e3a]"
                        key={products.id}
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
                          className="whitespace-nowrap py-4 px-6 font-bold text-white"
                        >
                          {products.product}
                        </th>
                        <td className="py-4 px-6 ">{products.category}</td>
                        <td className="py-4 px-6">{products.sku}</td>
                        <td className="py-4 px-6">{products.stock}</td>
                        <td className="py-4 px-6">{products.price}</td>
                        <td className="py-4 px-6">{products.rating}</td>

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
