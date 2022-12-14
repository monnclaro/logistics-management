import Link from "next/link";
import { useRouter } from "next/router";

import * as Popover from "@radix-ui/react-popover";
import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  BellIcon,
  ChartBarSquareIcon,
  Square3Stack3DIcon,
  Squares2X2Icon,
  UserCircleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const NotificationsPopover = () => (
  <Popover.Portal>
    <Popover.Content className="mr-14 h-[230px] w-[260px] border border-zinc-800 bg-[#161b22] text-white shadow-md">
      <div className="bg-[#12151b]">
        <p className="p-4 font-bold">Notifications</p>
      </div>
      <p className="align-center mt-6 p-12 pt-6 text-center text-sm">
        You dont have any notification at the moment.
      </p>
      <Popover.Close
        className="PopoverClose"
        aria-label="Close"
      ></Popover.Close>
      <Popover.Arrow className="PopoverArrow" />
    </Popover.Content>
  </Popover.Portal>
);

export function Nav() {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0">
      <header className="fixed top-0 flex w-full items-center justify-between bg-[#161b22] px-16 py-4 text-center">
        <Bars3Icon className="h-6 w-6 cursor-pointer text-white hover:text-[#c7c7c7]" />

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-center">
            <MagnifyingGlassIcon className="h-4 w-4 text-[#8B949E]" />
          </div>
          <input
            type="text"
            className="block w-auto rounded-md border border-gray-600 bg-[#0d1117] py-1 pl-10 text-sm text-white placeholder-[#8B949E] focus:outline-none"
            placeholder="Search for something..."
          />
        </div>
        <Popover.Root>
          <Popover.Trigger asChild>
            <BellIcon className="h-6 w-6 cursor-pointer text-white hover:text-[#c7c7c7]" />
          </Popover.Trigger>
          <NotificationsPopover />
        </Popover.Root>
      </header>

      <aside className="fixed mt-[62px] h-full w-48 border-r border-r-gray-700 bg-[#0d1117]">
        <div className=" px-3 py-5 text-white">
          <div className="flex items-center gap-1 align-middle">
            <UserCircleIcon className="h-5 w-5 text-white hover:text-[#c7c7c7]" />
            <p className="text-sm font-bold">Vivienne M.</p>
            <ChevronDownIcon className="h-5 w-5 cursor-pointer text-white hover:text-[#c7c7c7]" />
          </div>
          <p className="pt-1 text-xs text-gray-200">Logistics Manager</p>
        </div>
        <div className="h-full">
          <h1 className="ml-3 text-sm font-bold text-white">Solutions</h1>
          <ul>
            <li>
              <div>
                <Link
                  href="/"
                  className={
                    router.pathname == "/"
                      ? "mt-2 flex items-center bg-[#1f61fb] p-2 text-base font-bold text-white"
                      : "mt-2 flex items-center p-2 text-base font-normal text-white hover:bg-[#1f61fb]"
                  }
                >
                  <ChartBarSquareIcon className="ml-2 h-5 w-5 text-white" />
                  <span className="ml-2 mr-2 text-sm">Overview</span>
                </Link>
              </div>
              <div>
                <Link
                  href="/tms/deliveries"
                  className={
                    router.pathname == "/tms/deliveries"
                      ? "mt-2 flex items-center bg-[#1f61fb] p-2 text-base font-bold text-white"
                      : "mt-2 flex items-center p-2 text-base font-normal text-white hover:bg-[#1f61fb]"
                  }
                >
                  <Squares2X2Icon className="ml-2 h-5 w-5 text-white" />
                  <span className="ml-2 text-sm">Transportation</span>
                </Link>
              </div>

              <div>
                <Link
                  href="/wms/inventory"
                  className={
                    router.pathname == "/wms/inventory"
                      ? "mt-2 flex items-center bg-[#1f61fb] p-2 text-base font-bold text-white"
                      : "mt-2 flex items-center p-2 text-base font-normal text-white hover:bg-[#1f61fb]"
                  }
                >
                  <Square3Stack3DIcon className="ml-2 h-5 w-5 text-white" />
                  <span className="ml-2 text-sm">Warehouse</span>
                </Link>
              </div>
              <div>
                <Link
                  href="/404"
                  className={
                    router.pathname == "/404"
                      ? "mt-2 flex items-center bg-[#1f61fb] p-2 text-base font-bold text-white"
                      : "mt-2 flex items-center p-2 text-base font-normal text-white hover:bg-[#1f61fb]"
                  }
                >
                  <ClipboardDocumentListIcon className="ml-2 h-5 w-5 text-white" />
                  <span className="ml-2 text-sm">Yard</span>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
