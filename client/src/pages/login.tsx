import Head from "next/head";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Head>
        <title>Sign in - Logistics Management</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="w-full rounded-lg border border-zinc-800 bg-[#161b22] shadow sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full rounded-lg border border-zinc-700 bg-[#0d1117] p-2.5  text-sm text-white placeholder-gray-400 focus:border-[#1f61fb] focus:outline-none   focus:ring-1 focus:ring-[#1f61fb]"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="block w-full rounded-lg border border-zinc-700 bg-[#0d1117] p-2.5  text-sm text-white placeholder-gray-400 focus:border-[#1f61fb] focus:outline-none   focus:ring-1 focus:ring-[#1f61fb]"
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className=" h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-500 dark:text-gray-300">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-gray-400 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Link href={"/"}>
                  <button className="mt-6 w-full rounded-lg bg-[#1f61fb] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700">
                    Sign in
                  </button>
                </Link>
                <p className="text-sm font-light text-gray-400">
                  Don’t have an account yet?{" "}
                  <a href="#" className="font-medium hover:underline">
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
