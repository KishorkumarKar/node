import { useState } from "react";

// define type for one action
type Action = {
  title: string;
  link: string;
};

// props type for Header
type HeaderProps = {
  actionType: Action[];
  filterDataEvent: (value: string) => void;
  searchText: string;
};

const TableHeader: React.FC<HeaderProps> = ({
  actionType,
  filterDataEvent,
  searchText,
}) => {
  const [enableActionTab, setEnableActionTab] = useState<Boolean>(false);
  const [searchData, setSearchData] = useState<string>("");
  const openAction = () => {
    setEnableActionTab(enableActionTab ? false : true);
  };

  const submitSearchData = () => {
    filterDataEvent(searchData);
  };
  return (
    <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
      <div>
        <button
          onClick={() => openAction()}
          id="dropdownActionButton"
          data-dropdown-toggle="dropdownAction"
          className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          type="button"
        >
          <span className="sr-only">Action button</span>
          Action
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          id="dropdownAction"
          className={`z-10 ${enableActionTab ? "" : "hidden"} absolute  bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600`}
        >
          {actionType.map((action, index) => (
            <div className="py-1" key={index}>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                {action.title}
              </a>
            </div>
          ))}
        </div>
      </div>
      <label htmlFor="table-search-users" className="sr-only">
        Search
      </label>
      <div className="relative z-10 flex items-center gap-2">
        <div>
          <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            value={searchData}
            onChange={(e) => setSearchData(e.target.value)}
            type="text"
            id="table-search-users"
            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={searchText}
          />
        </div>
        <div>
          <button
            onClick={submitSearchData}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableHeader;
