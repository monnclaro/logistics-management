import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  BellIcon,
  TruckIcon,
  HomeIcon,
  Square3Stack3DIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { useRouter } from "next/router";

export default function Nav() {
  const router = useRouter();
  return (
    <div className="fixed top-0 left-0">
      <header className="fixed top-0 flex w-full items-center justify-between bg-[#18181B] px-8 py-5 pl-52 text-center shadow-sm">
        <Bars3Icon className="h-7 w-7 cursor-pointer text-white hover:text-[#E24A8D]" />

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-center">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-auto rounded-lg border border-zinc-600 bg-[#252527] p-2.5 pl-10 text-sm  text-white placeholder-gray-400 focus:border-[#E24A8D] focus:outline-none focus:ring-1 focus:ring-[#E24A8D] sm:text-sm"
            placeholder="Search for something"
          />
        </div>

        <BellIcon className="h-7 w-7 cursor-pointer text-white hover:text-[#E24A8D]" />
      </header>

      <aside className="fixed h-full w-48">
        <div className="h-full bg-[#18181B] px-3 pt-20">
          <ul>
            <li>
              <div>
                <Link
                  href="/"
                  className={
                    router.pathname == "/"
                      ? "mt-2 flex items-center rounded-lg border-[2px] border-[#E24A8D] bg-[#252527] p-2 text-base font-normal text-white"
                      : " mt-2 flex items-center rounded-lg border-[2px] border-transparent bg-[#252527] p-2 text-base font-normal text-white hover:border-[#E24A8D]"
                  }
                >
                  <HomeIcon className="h-6 w-6 text-white" />
                  <span className="ml-3 ">Home</span>
                </Link>
              </div>

              <div>
                <Link
                  href="/transportation"
                  className={
                    router.pathname == "/transportation"
                      ? "mt-2  flex  items-center rounded-lg border-[2px] border-[#E24A8D]  bg-[#252527]  p-2 text-base font-normal text-white"
                      : "mt-2  flex  items-center rounded-lg border-[2px] border-transparent  bg-[#252527] p-2 text-base font-normal text-white hover:border-[#E24A8D]"
                  }
                >
                  <TruckIcon className="h-6 w-6 text-white" />
                  <span className="ml-3">Transport</span>
                </Link>
              </div>
              <div>
                <Link
                  href="/warehouse"
                  className={
                    router.pathname == "/warehouse"
                      ? "mt-2  flex  items-center rounded-lg border-[2px] border-[#E24A8D]  bg-[#252527]  p-2 text-base font-normal text-white"
                      : "mt-2  flex  items-center rounded-lg border-[2px] border-transparent  bg-[#252527] p-2 text-base font-normal text-white hover:border-[#E24A8D]"
                  }
                >
                  <Square3Stack3DIcon className="h-6 w-6 text-white" />
                  <span className="ml-3">Warehouse</span>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
