import Head from "next/head";
import Link from "next/link";

import Nav from "./components/Nav";
import { ArrowUturnRightIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className="h-screen w-screen pt-[82px] pl-48 text-white">
        <div className="max-w-screen max-h-screen px-14 py-8">
          <div className="my-6 flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="pb-2 text-4xl">Home</h1>
            </div>
            <p className="text-gray-400">
              This is the dashboard information overview
              <br />
              for the management members.{" "}
            </p>
          </div>

          <div className="flex gap-x-12 gap-y-4">
            <Link
              href="/transportation"
              className="block max-h-[400px] max-w-sm rounded-lg border border-zinc-600 bg-[#212124] p-6 shadow-md transition-all duration-200 hover:scale-105 hover:border-[#c6ace3] hover:shadow-sm hover:shadow-[#c6ace3]"
            >
              <div className="flex gap-3">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
                  Transportation Management System (TMS)
                </h5>
                <ArrowUturnRightIcon className="h-8 w-8 hover:animate-pulse" />
              </div>
              <p className="text-sm font-normal text-gray-400">
                Solution that helps to plan, execute, and optimize the physical
                movement of goods, both incoming and outgoing, and making sure
                the shipment is compliant.
              </p>
            </Link>
            <Link
              href="/warehouse"
              className="block max-h-[400px] max-w-sm rounded-lg border border-zinc-600 bg-[#212124] p-6 shadow-md transition-all duration-200 hover:scale-105 hover:border-[#c6ace3] hover:shadow-sm hover:shadow-[#c6ace3]"
            >
              <div className="flex gap-3">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-white">
                  Warehouse Management System (WMS)
                </h5>
                <ArrowUturnRightIcon className="h-8 w-8 hover:animate-pulse" />
              </div>
              <p className="text-sm font-normal text-gray-400">
                Solution that offers visibility into a business entire inventory
                and manages supply chain fulfillment operations from the
                distribution center to the store shelf.
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
