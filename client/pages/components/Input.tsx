import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      {...props}
      required
      className="block w-auto rounded-lg border border-zinc-600 bg-[#212124] p-2.5 pl-4 text-sm  text-white placeholder-gray-400 focus:border-[#c6ace3] focus:outline-none focus:ring-1 focus:ring-[#c6ace3] sm:text-sm"
    />
  );
}
