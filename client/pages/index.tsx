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
        <div className="max-w-screen max-h-screen px-14 py-8">
          <div className="mt-6 flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="mb-1 text-3xl">Overview</h1>
            </div>
            <p className="text-base text-gray-400">
              This is the dashboard information overview
              <br />
              for the management members.{" "}
            </p>
          </div>

          <div className="my-6 h-[1px] w-[350px] bg-gray-700"></div>

          <div className="flex flex-col gap-8">
            <div>
              <h1 className="pb-[12px] text-2xl">Solutions</h1>
              <div className="flex gap-8">
                <Link
                  href="/tms/deliveries"
                  className="block h-[200px] w-[400px] rounded-lg border border-zinc-700 bg-[#0d1117] p-6 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-md"
                >
                  <div className="flex gap-3">
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-white">
                      Transportation Management System (TMS)
                    </h5>
                    <ArrowUturnRightIcon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-normal text-gray-400">
                    Solution that helps to plan, execute, and optimize the
                    physical movement of goods, both incoming and outgoing, and
                    making sure the shipment is compliant.
                  </p>
                </Link>
                <Link
                  href="wms/inventory"
                  className="block h-[200px] w-[400px] rounded-lg border border-zinc-700 bg-[#0d1117] p-6 shadow-md transition-all duration-200 hover:scale-105 hover:shadow-md"
                >
                  <div className="flex gap-3">
                    <h5 className="mb-2 text-lg font-bold tracking-tight text-white">
                      Warehouse Management System (WMS)
                    </h5>
                    <ArrowUturnRightIcon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-normal text-gray-400">
                    Solution that offers visibility into a business entire
                    inventory and manages supply chain fulfillment operations
                    from the distribution center to the store shelf.
                  </p>
                </Link>
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="pb-[12px] text-2xl">Revenue</h1>
              <div className="flex gap-8 bg-[#0d1117]">
                {Object.keys(stats).map((key) => {
                  const stat = stats[key as keyof typeof stats];
                  return (
                    <div className="block h-[150px] w-[350px] rounded-lg border border-zinc-700 bg-[#0d1117] p-6 shadow-md hover:shadow-md">
                      <div key={stat.title}>
                        <h1 className="flex justify-between pb-3 text-lg tracking-tight text-gray-400">
                          {stat.title}
                          <EllipsisVerticalIcon className="h-6 w-5 cursor-pointer text-gray-400" />
                        </h1>
                      </div>
                      <div>
                        <h1
                          className="text-xl font-bold tracking-tight text-white"
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
          </div>
        </div>
      </main>
    </div>
  );
}
