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
  EnvelopeIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

const NotificationsPopover = () => (
  <Popover.Portal>
    <Popover.Content className="mr-14 h-[270px] w-[260px] rounded-md border border-gray-800 bg-white text-black shadow-md">
      <div className="flex justify-between ">
        <p className="p-4 text-sm">Notifications</p>
        <p className="p-4 text-sm font-bold text-[#1f61fb]">3</p>
      </div>

      <div className="mx-4 flex h-[1px] w-[220px] bg-gray-200 pl-4"></div>

      <div className="flex flex-col">
        <div className="flex flex-row px-4 py-3">
          <div className="pr-4">
            <CheckCircleIcon className="h-5 w-5 text-[#1f61fb]" />
          </div>
          <p className="text-xs">Your password has been succesfully changed.</p>
        </div>
        <div className="mx-6 flex h-[1px] w-[200px] bg-gray-200 pl-4"></div>
        <div className="flex flex-row px-4 py-3">
          <div className="pr-4">
            <EnvelopeIcon className="h-5 w-5 text-[#1f61fb]" />
          </div>
          <p className="text-xs">A report has been sent to your email.</p>
        </div>
        <div className="mx-6 flex h-[1px] w-[200px] bg-gray-200 pl-4"></div>
        <div className="flex flex-row px-4 py-3">
          <div className="pr-4">
            <ExclamationTriangleIcon className="h-5 w-5 text-[#1f61fb]" />
          </div>
          <p className="text-xs">Low inventory level at the Hangar 34.</p>
        </div>
      </div>
      <div className="mx-6 flex h-[1px] w-[200px] bg-gray-200 pl-4"></div>
      <div>
        <p className="cursor-pointer p-3 text-center text-sm text-[#1f61fb]">
          See more
        </p>
      </div>

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
            <p className="text-sm font-bold">Augusto M.</p>
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
