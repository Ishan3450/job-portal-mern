import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setQuery] = useState("");
  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Engineer",
    "Cloud Engineer",
    "Fullstack Developer",
  ];

  function handleSearch() {
    dispatch(setSearchQuery(searchQuery));
    navigate("/browse");
  }

  function handleCategorySearch(e) {
    dispatch(setSearchQuery(e.target.innerText));
    navigate("/browse");
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <a
          href="#"
          className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-150"
          role="alert"
        >
          <span className="text-xs bg-red-600 rounded-full text-white px-4 py-1.5 mr-3">
            No. 1
          </span>{" "}
          <span className="text-sm font-medium">Job Hunting Website</span>
          <svg
            className="ml-2 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </a>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Search, Apply & get Your{" "}
          <span className="text-red-600">Dream Job</span>
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-24 dark:text-gray-400">
          JobHunt is a comprehensive job search platform. The application
          facilitates job searching by connecting candidates with recruiters.
          Candidates can browse and apply for jobs, while recruiters can
          register their companies and post job listings.
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <form className=" w-[50%] mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <Search className="text-gray-500 w-[22px]" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-red-500 focus:border-red-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 outline-none"
                placeholder="Search your dream job here..."
                value={searchQuery}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-red-800 transition duration-150"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
          <span className="font-semibold text-gray-400 uppercase">
            CATEGORIES
          </span>
          <Carousel className="mt-6">
            <CarouselContent>
              {categories.map((category, index) => (
                <CarouselItem key={index} className="basis-1/3">
                  <div
                    className="cursor-pointer border border-gray-300 hover:border-gray-500 transition duration-150 rounded-full p-2"
                    onClick={handleCategorySearch}
                  >
                    {category}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
