"use client";
type errorType = {
  page_size: number;
  current_page: number;
  total: number;
};
type MethodProps = {
  pagination: errorType;
};

function getStartFrom(num: number) {
  let result = num - 2;
  return result < 1 ? 1 : result;
}
export default function Pagination({ pagination }: MethodProps) {
  const currentPage = pagination.current_page;
  const startCount = (currentPage - 1) * pagination.page_size + 1;
  const endCount = pagination.page_size * currentPage;

  let totalNumberOfPage = Math.floor(pagination.total / pagination.page_size);
  if (
    pagination.total / pagination.page_size >= 1 &&
    pagination.total % pagination.page_size != 0
  ) {
    totalNumberOfPage += 1;
  } else if (pagination.total / pagination.page_size < 1) {
    totalNumberOfPage = 1;
  }
  const startFrom = getStartFrom(currentPage);
  /* console.log(
    "pagge=======",
    pagination.total / pagination.page_size,
    pagination.total % pagination.page_size,
    totalNumberOfPage,
    pagination,
    startFrom
  ); */
  const totalDisplayPage = 5;

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-6 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden p-2">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between space-x-2 ">
        <div>
          <p className="text-sm text-gray-700 flex space-x-2">
            <span>Showing</span>
            <span className="font-medium">{startCount}</span>
            <span>to</span>
            <span className="font-medium">{endCount}</span>
            <span>of</span>
            <span className="font-medium">{pagination.total}</span>
            <span>results</span>
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
          >
            {startFrom > 1 && (
              <a
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  data-slot="icon"
                  aria-hidden="true"
                  className="size-5"
                >
                  <path
                    d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </a>
            )}

            {Array.from({ length: totalDisplayPage }, (_, i) => {
              return (
                i + startFrom <= totalNumberOfPage && (
                  <a
                    key={i}
                    href="#"
                    aria-current="page"
                    className={
                      `relative z-10 inline-flex items-center  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 ` +
                      (i + startFrom === currentPage
                        ? "bg-indigo-600 text-white focus-visible:outline-indigo-600"
                        : "text-gray-900 hover:bg-gray")
                    }
                  >
                    {i + startFrom}
                  </a>
                )
              );
            })}
            {totalNumberOfPage >= startFrom + totalDisplayPage && (
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  data-slot="icon"
                  aria-hidden="true"
                  className="size-5"
                >
                  <path
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </a>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}
