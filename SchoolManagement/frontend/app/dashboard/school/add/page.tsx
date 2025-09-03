"use client";

import {
  Header,
  Sidebar,
  FormTimePicker,
  FormTextField,
  FormError,
} from "@/components";
import { getLoginToken } from "@/lib/manageCookieLib";
import { apiLink, formDataToObject } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Teacher() {
  const [message, setMessage] = useState<any>({});
  const router = useRouter();
  const handleSchoolCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage({});
    const formData = new FormData(e.currentTarget);
    const data = formDataToObject(formData);
    const form = e.currentTarget;

    const header = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getLoginToken()}`,
    };
    await fetch(apiLink.school.add, {
      method: "POST", // or 'PUT'
      headers: header,
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 401) {
          router.push("/teacher/login");
          return;
        }
        if (res.status === 200) {
          return res.json();
        } else {
          res
            .json()
            .then((data) =>
              setMessage({ type: "danger", message: data.message }),
            )
            .catch((error) =>
              setMessage({ type: "danger", message: data.message }),
            );
        }
      })
      .then((data) => {
        if (data?.success) {
          form.reset();
          setMessage({ type: "success", message: "school Added Successfully" });
        }
      });
  };

  return (
    <>
      <div className=" pt-16 sm:ml-64 p-6 bg-gray-50 min-h-screen">
        <form onSubmit={handleSchoolCreate} className="max-w-3xl mx-auto p-2">
          <div>
            <h1 className="text-5xl font-extrabold dark:text-white p-6">
              Add
              <span className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
                School
              </span>
            </h1>
          </div>
          {message && (
            <FormError
              error={{ type: message?.type, text: message?.message }}
            />
          )}

          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <FormTextField name="name" label="Name" />
            <FormTextField
              name="school_id"
              label="Code"
              note="School code should be unique"
            />
            <FormTextField
              name="class_duration"
              label="Class Duration"
              inputType="number"
              note="This is to set per call timing in minute"
            />
            <FormTextField
              name="break_time"
              label="Break/Tiffin Time"
              inputType="number"
              note="Break/Tiffin in minute"
            />
            <FormTextField
              name="break_time_started"
              label="Break/Tiffin Time Started"
              inputType="number"
              note="Specify After number of class Ex 2 specify after second class"
            />
            <FormTimePicker name="start_time" label="Start Time" />
          </div>

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">Address</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="street"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Street
              </label>
              <input
                type="text"
                id="street"
                name="address[street]"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="address[city]"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="state"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                name="address[state]"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="pincode"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Pin
              </label>
              <input
                type="text"
                id="pincode"
                name="address[pincode]"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="123-45-678"
                // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
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
