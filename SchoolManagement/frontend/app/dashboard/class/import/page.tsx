"use client";
import { Sidebar, Header, FromDatePicker } from "../../../../components";
export default function StudentAdd() {
  return (
    <>
      <Header />
      <Sidebar />
      <div className=" pt-16 sm:ml-64 p-6 bg-gray-50 min-h-screen">
        <form className="max-w-3xl mx-auto p-2">
          <h1 className="text-5xl font-extrabold dark:text-white p-6">
            Import
            <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
              Class
            </small>
          </h1>

          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
            >
              Gender
            </label>

            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="Student">Student</option>
              <option value="Class">Class</option>
            </select>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              className=" block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 top-3  dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="file_input"
              type="file"
            />
            <label
              htmlFor="floating_email"
              className="mb-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Upload file
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
