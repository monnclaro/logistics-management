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
      <header className="fixed top-0 flex w-full items-center justify-between border-b-[1px] border-b-black/30 bg-[#212124] px-8 py-5 pl-52 text-center shadow-lg">
        <Bars3Icon className="h-7 w-7 cursor-pointer text-white hover:text-[#c6ace3]" />

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-center">
            <MagnifyingGlassIcon className="h-5 w-5 text-white/80" />
          </div>
          <input
            type="text"
            className="block w-auto rounded-lg border border-gray-600 bg-[#212124] p-2.5 pl-10 text-sm text-white placeholder-white/80 focus:border-[#c6ace3] focus:outline-none focus:ring-1 focus:ring-[#c6ace3] sm:text-sm"
            placeholder="Search for something"
          />
        </div>

        <BellIcon className="h-7 w-7 cursor-pointer text-white hover:text-[#c6ace3]" />
      </header>

      <aside className="fixed h-full w-48">
        <div className="h-full bg-[#101112] px-3 pt-20">
          <ul>
            <li>
              <div>
                <Link
                  href="/"
                  className={
                    router.pathname == "/"
                      ? "mt-2 flex items-center rounded-lg border-[2px] border-[#c6ace3] p-2 text-base font-normal text-white"
                      : "mt-2 flex items-center rounded-lg border-[2px] border-transparent p-2 text-base font-normal text-white hover:border-[#c6ace3]"
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
                      ? "mt-2 flex items-center rounded-lg border-[2px] border-[#c6ace3] p-2 text-base font-normal text-white"
                      : "mt-2 flex items-center rounded-lg border-[2px] border-transparent p-2 text-base font-normal text-white hover:border-[#c6ace3]"
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
                      ? "mt-2 flex items-center rounded-lg border-[2px] border-[#c6ace3] p-2 text-base font-normal text-white"
                      : "mt-2 flex items-center rounded-lg border-[2px] border-transparent p-2 text-base font-normal text-white hover:border-[#c6ace3]"
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
