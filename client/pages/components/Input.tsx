import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      required
      className="block w-auto rounded-lg border border-zinc-700 bg-[#0d1117] p-2.5 pl-4 text-sm  text-white placeholder-gray-400 focus:border-[#f78166] focus:outline-none focus:ring-1 focus:ring-[#f78166] sm:text-sm"
    />
  );
}
