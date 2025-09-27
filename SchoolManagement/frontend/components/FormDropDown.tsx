import { ChangeEvent } from "react";

export default function FormDropDown({
  name,
  label,
  values,
  callBackFunction,
}: {
  name: string;
  label: string;
  values: { id: string; text: string }[];
  callBackFunction?: (selected: ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <label
        htmlFor="countries"
        className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
      >
        {label}
      </label>
      <select
        required
        onChange={(e) => callBackFunction?.(e)}
        id={name}
        name={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">{`Please Select ${label}`}</option>
        {values.map((value) => (
          <option key={value.id} value={value.id}>
            {value.text}
          </option>
        ))}
      </select>
    </div>
  );
}
