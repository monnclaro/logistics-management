import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button(props: ButtonProps) {
  return (
    <button
      {...props}
      className="flex items-center justify-center gap-1 rounded-lg border border-zinc-500 bg-[#252527] pt-0 text-sm font-bold text-gray-400 duration-700 hover:border-[#E24A8D] hover:text-white  hover:outline-none hover:ring-1 hover:ring-[#E24A8D] hover:transition-colors"
    />
  );
}
