import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      required
      className="block w-[160px] rounded-lg border border-zinc-700 bg-[#0d1117] p-2 pl-4  text-sm text-white placeholder-gray-400 focus:border-[#1f61fb] focus:outline-none focus:ring-1 focus:ring-[#1f61fb] sm:text-sm"
    />
  );
}
