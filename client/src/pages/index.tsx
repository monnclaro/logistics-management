import Head from "next/head";
import Link from "next/link";

import { Nav } from "../components/Nav";

import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import {
  ClipboardDocumentListIcon,
  Square3Stack3DIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

const stats = {
  Income: {
    title: "Income",
    value: "$4.000,300,00",
    amount: "+41% (+$40.000)",
  },

  Spending: {
    title: "Spending",
    value: "$1.000,000,00",
    amount: "+12% (+$20.000)",
  },

  StockOnHand: {
    title: "Stock on hand",
    value: "$2.453,405,00",
    amount: "+20% (+$400.000)",
  },

  MRR: {
    title: "MRR",
    value: "$8.453,405,00",
    amount: "+25% (+$54.000)",
  },
  Delivered: {
    title: "Delivered on time",
    value: "500 items",
    amount: "+10%",
  },

  Traveled: {
    title: "Traveled miles",
    value: "250 kilometers",
    amount: "+5%",
  },

  AvgTime: {
    title: "Avg loading time",
    value: "25 minutes",
    amount: "-4%",
  },

  AvgWeight: {
    title: "Avg loading weight",
    value: "12 tons",
    amount: "-10%",
  },
};

export default function Home() {
  return (
    <div>
      <Head>
        <title>Overview - Logistics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className="h-screen w-screen pt-[65px] pl-48 text-white ">
        <div className="max-w-screen max-h-screen py-10 px-28">
          <div className="my-6 flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="mb-1 text-2xl">Overview</h1>
            </div>
            <p className="text-sm text-gray-400">
              This is the dashboard information <br />
              overview for the management members.
            </p>
          </div>

          <div className="flex flex-col gap-8 ">
            <div>
              <h1 className="pb-1 text-xl">Solutions</h1>
              <div className="mb-4 h-[1px] w-[100px] bg-gray-400"></div>
              <div className="flex gap-8">
                <Link
                  href="/tms/deliveries"
                  className="group block h-[160px] w-[475px] rounded-lg border border-zinc-800 bg-[#161b22] py-8 px-8 shadow-md transition duration-300 hover:scale-[1.03] hover:shadow-md"
                >
                  <div className="flex justify-between sm:text-center">
                    <h1 className="text-md mb-2 flex gap-2 font-bold tracking-tight text-white">
                      <Squares2X2Icon className="h-6 w-6 group-hover:animate-pulse" />
                      Transportation Management System (TMS)
                    </h1>
                  </div>
                  <p className="text-sm font-normal text-gray-400 ">
                    Solution that helps to plan, execute, and optimize the
                    physical movement of goods, both incoming and outgoing, and
                    making sure the shipment is compliant.
                  </p>
                </Link>
                <Link
                  href="wms/inventory"
                  className="group block h-[160px] w-[475px] rounded-lg border border-zinc-800 bg-[#161b22] py-8 px-8 shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-md"
                >
                  <div className="flex justify-between sm:text-center">
                    <h5 className="text-md mb-2 flex gap-2 font-bold tracking-tight text-white">
                      <Square3Stack3DIcon className="h-6 w-6 group-hover:animate-pulse" />
                      Warehouse Management System (WMS)
                    </h5>
                  </div>
                  <p className="text-sm font-normal text-gray-400 ">
                    Solution that offers visibility into a business entire
                    inventory and manages supply chain operations from the
                    distribution center to the store shelf.
                  </p>
                </Link>
                <Link
                  href="#"
                  className="group block h-[160px] w-[475px] rounded-lg border border-zinc-800 bg-[#161b22] py-8 px-8 shadow-md transition-all duration-300 hover:scale-[1.03] hover:shadow-md"
                >
                  <div className="flex justify-between sm:text-center">
                    <h5 className="text-md mb-2 flex gap-2 font-bold tracking-tight text-white">
                      <ClipboardDocumentListIcon className="h-6 w-6 group-hover:animate-pulse" />
                      Yard Management System (YMS)
                    </h5>
                  </div>
                  <p className="text-sm font-normal text-gray-400 ">
                    Solution designed to oversee the movement of trucks and
                    trailers in the yard of a manufacturing facility, warehouse,
                    or distribution center.
                  </p>
                </Link>
              </div>
            </div>

            <div className="flex flex-col ">
              <h1 className="pb-1 text-xl">Revenue and stats</h1>
              <div className="mb-4 h-[1px] w-[190px] bg-gray-400"></div>
              <div className="grid grid-cols-4 gap-y-6">
                {Object.keys(stats).map((key) => {
                  const stat = stats[key as keyof typeof stats];
                  return (
                    <div
                      className="block h-[130px] w-[350px] rounded-lg border border-zinc-800 bg-[#161b22] px-8 py-8 shadow-md hover:shadow-md"
                      key={stat.value}
                    >
                      <div key={stat.title}>
                        <h1
                          className="text-md flex justify-between tracking-tight text-gray-400"
                          key={stat.title}
                        >
                          {stat.title}
                          <p className="rounded-full bg-[#1f61fb] px-2 py-1 text-xs font-medium  text-white">
                            {" "}
                            {stat.amount}
                          </p>
                        </h1>
                      </div>
                      <div>
                        <h1
                          className="pt-1 text-xl font-bold  tracking-tight text-white"
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
