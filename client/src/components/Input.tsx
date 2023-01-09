import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      required
      className="mt-1 block w-[160px] rounded-md border border-zinc-700 bg-[#0d1117] py-1 pl-3 text-sm text-white placeholder-gray-400 focus:border-[#1f61fb] focus:outline-none focus:ring-1 focus:ring-[#1f61fb]"
    />
  );
}
