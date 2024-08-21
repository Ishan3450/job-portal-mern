import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white rounded-lg dark:bg-gray-900">
      <div className="w-full mx-auto p-4 md:py-8">
        <div className="text-2xl tracking-wide">
          Job
          <span className=" font-bold text-red-700">Hunt</span>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          ©{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            JobHunt™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
