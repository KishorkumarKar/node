import { useState } from "react";

// define type for one action
type header = {
  title: string;
};

// props type for Header
type HeaderProps = {
  header: header[];
  tableData: any[];
  setSelectedIds: React.Dispatch<React.SetStateAction<any[]>>;
};

const FormTable: React.FC<HeaderProps> = ({
  header,
  tableData,
  setSelectedIds,
}) => {
  const [selectAll, setSelectAll] = useState<string[]>([]);
  const allSelected = selectAll.length === tableData.length ? true : false;
  const checkAllData = () => {
    let selectedData = [];
    // if (allSelected) {
    //   setSelectAll([]);
    // } else {
    //   setSelectAll(tableData.map((data) => data.id));
    // }

    if (!allSelected) {
      selectedData = tableData.map((data) => data.id);
    }
    setSelectAll(selectedData);
    setSelectedIds(selectedData);
  };
  const toggleCheckbox = (id: string) => {
    let selectedData = [];
    if (selectAll.includes(id)) {
      selectedData = selectAll.filter((x) => x !== id);
      // setSelectAll(selectAll.filter((x) => x !== id));
    } else {
      selectedData = [...selectAll, id];
      // setSelectAll([...selectAll, id]);
      /* const getId = [...selectAll];  to avoid mutates
      getId.push(id);
      console.log(id, getId);
      setSelectAll(getId); */
    }
    setSelectAll(selectedData);
    setSelectedIds(selectedData);
  };

  const formatColName = (text: string | unknown) => {
    let colName = String(text);
    colName = colName.replace("_", " ");
    return colName;
  };

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="p-4">
            <div className="flex items-center">
              <input
                id="checkbox-all-search"
                type="checkbox"
                checked={allSelected}
                onChange={checkAllData}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="checkbox-all-search" className="sr-only">
                checkbox
              </label>
            </div>
          </th>
          {header.map((data, key) => (
            <th key={key} scope="col" className="px-6 py-3">
              {formatColName(data.title)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((data, key) => (
          <tr
            key={key}
            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id={data.id}
                  value={data.id}
                  type="checkbox"
                  onChange={(e) => toggleCheckbox(data.id)}
                  checked={selectAll.includes(data.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor={data.id} className="sr-only">
                  checkbox
                </label>
              </div>
            </td>

            {Object.entries(data).map(
              ([colKey, colValue], index) =>
                header.length > index && (
                  <td key={index} className="px-6 py-4">
                    {String(colValue)}
                  </td>
                ),
            )}
          </tr>
        ))}

        {/* <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="w-4 p-4">
            <div className="flex items-center">
              <input
                id="checkbox-table-search-3"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="checkbox-table-search-3" className="sr-only">
                checkbox
              </label>
            </div>
          </td>
          <th
            scope="row"
            className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <img
              className="w-10 h-10 rounded-full"
              src="/docs/images/people/profile-picture-4.jpg"
              alt="Jese image"
            />
            <div className="ps-3">
              <div className="text-base font-semibold">Leslie Livingston</div>
              <div className="font-normal text-gray-500">
                leslie@flowbite.com
              </div>
            </div>
          </th>
          <td className="px-6 py-4">SEO Specialist</td>
          <td className="px-6 py-4">
            <div className="flex items-center">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>{" "}
              Offline
            </div>
          </td>
          <td className="px-6 py-4">
            <a
              href="#"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit user
            </a>
          </td>
        </tr> */}
      </tbody>
    </table>
  );
};

export default FormTable;
