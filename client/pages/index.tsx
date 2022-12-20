import Head from "next/head";
import Link from "next/link";

import { Nav } from "./components/Nav";
import { ArrowUturnRightIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

const stats = {
  Income: {
    title: "Income",
    value: "$4.000,300,00",
  },

  Spending: {
    title: "Spending",
    value: "$1.000,000,00",
  },

  StockOnHand: {
    title: "Stock on hand",
    value: "$2.453,405,00",
  },

  MRR: {
    title: "MRR",
    value: "$8.453,405,00",
  },
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>Overview</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className="h-screen w-screen pt-[65px] pl-48 text-white">
        <div className="max-w-screen max-h-screen py-20 px-28">
          <div className="my-6 flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="mb-1 text-2xl">Overview</h1>
            </div>
            <p className="text-sm text-gray-400">
              This is the dashboard information <br />
              overview for the management members.{" "}
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <h1 className="pb-1 text-xl">Revenue</h1>
              <div className="mb-4 h-[1px] w-[100px] bg-gray-400"></div>
              <div className="flex gap-8">
                {Object.keys(stats).map((key) => {
                  const stat = stats[key as keyof typeof stats];
                  return (
                    <div
                      className="block h-[130px] w-[350px] rounded-lg border border-zinc-800 bg-[#161b22] px-8 py-8 shadow-md hover:shadow-md"
                      key={stat.value}
                    >
                      <div key={stat.title}>
                        <h1
                          className="text-md flex justify-between tracking-tight text-white"
                          key={stat.title}
                        >
                          {stat.title}
                          <EllipsisVerticalIcon className="h-5 w-5 cursor-pointer text-white" />
                        </h1>
                      </div>
                      <div>
                        <h1
                          className="pt-1 text-xl font-bold tracking-tight text-white"
                          key={stat.value}
                        >
                          {stat.value}
                        </h1>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <h1 className="pb-1 text-xl">Solutions</h1>
              <div className="mb-4 h-[1px] w-[100px] bg-gray-400"></div>
              <div className="flex gap-8">
                <Link
                  href="/tms/deliveries"
                  className="block h-[160px] w-[420px] rounded-lg border border-zinc-800 bg-[#161b22] py-8 px-8 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-md"
                >
                  <div className="flex justify-between">
                    <h5 className="text-md mb-2 font-bold tracking-tight text-white">
                      Transportation Management System (TMS)
                    </h5>
                  </div>
                  <p className="text-justify text-sm font-normal text-gray-400">
                    Solution that helps to plan, execute, and optimize the
                    physical movement of goods, both incoming and outgoing, and
                    making sure the shipment is compliant.
                  </p>
                </Link>
                <Link
                  href="wms/inventory"
                  className="block h-[160px] w-[420px] rounded-lg border border-zinc-800 bg-[#161b22] py-8 px-8 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-md"
                >
                  <div className="flex justify-between">
                    <h5 className="text-md mb-2 font-bold tracking-tight text-white">
                      Warehouse Management System (WMS)
                    </h5>
                  </div>
                  <p className="text-justify text-sm font-normal text-gray-400">
                    Solution that offers visibility into a business entire
                    inventory and manages supply chain operations from the
                    distribution center to the store shelf.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
