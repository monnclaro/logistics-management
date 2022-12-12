import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      required
      className="block w-auto rounded-lg border border-zinc-600 bg-[#252527] p-2.5 pl-4 text-sm  text-white placeholder-gray-400 focus:border-[#E24A8D] focus:outline-none focus:ring-1 focus:ring-[#E24A8D] sm:text-sm"
    />
  );
}
