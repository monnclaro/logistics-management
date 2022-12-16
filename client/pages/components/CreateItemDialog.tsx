import axios from "axios";
import { FormEvent, useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "./Input";

export function CreateItemDialog() {
  const [open, setOpen] = useState(true);

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
    } catch (err) {
      console.log(err);
    }
  }

  return open ? (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/60" />
      <Dialog.Content className="fixed top-1/2 left-1/2 w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#0d1117] py-8 px-10 text-white shadow-lg shadow-black/25">
        <Dialog.Title className="text-center">Add a new item</Dialog.Title>
        <Dialog.Description className="pt-0.5 text-center text-sm text-[#8B949E]">
          Fill in all fields
        </Dialog.Description>
        <form
          onSubmit={handleCreateItem}
          className="mt-8 flex flex-col justify-center gap-4"
        >
          <div className="flex gap-8">
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
          <div className="flex gap-8">
            <div>
              <label htmlFor="sku" className="text-xs font-semibold text-white">
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
              required
            />
          </div>
          <div className="flex justify-between pt-[28px]">
            <Dialog.Close>
              <button
                type="submit"
                className="flex h-[30px] w-[80px] items-center justify-center gap-1 rounded-lg border border-zinc-700 bg-[#161b22] pt-0 text-sm  font-bold text-gray-400 duration-700 hover:border-[#1f61fb] hover:text-white  hover:outline-none hover:ring-1 hover:ring-[#1f61fb] hover:transition-colors"
              >
                Cancel
              </button>
            </Dialog.Close>

            <button
              type="submit"
              className="flex h-[30px] w-[80px] items-center justify-center gap-1 rounded-lg border border-zinc-700 bg-[#161b22] pt-0 text-sm  font-bold text-gray-400 duration-700 hover:border-[#1f61fb] hover:text-white  hover:outline-none hover:ring-1 hover:ring-[#1f61fb] hover:transition-colors"
            >
              New item
            </button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  ) : null;
}
