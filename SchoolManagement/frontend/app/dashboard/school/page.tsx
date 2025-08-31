"use client";

import {
  FormTable,
  Header,
  PageLoader,
  Sidebar,
  TableHeader,
} from "@/components";
import { getLoginToken } from "@/lib/manageCookieLib";
import { apiLink } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Teacher() {
  const router = useRouter();
  const [schoolData, setSchoolData] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const actionType = [
    {
      title: "Mass Delete",
      link: "massdelete",
    },
    {
      title: "Activate",
      link: "activate",
    },
  ];
  const header = [
    {
      title: "Name",
    },
    {
      title: "School_id",
    },
    {
      title: "Phone",
    },
    {
      title: "Email",
    },
    {
      title: "Start Date",
    },
    {
      title: "Created At",
    },
    {
      title: "Updated At",
    },
  ];
  useEffect(() => {
    console.log("--");
    const header = {
      limit: "10",
      page: "1",
      Authorization: `Bearer ${getLoginToken()}`,
    };
    fetch(apiLink.school.list, {
      method: "GET",
      headers: header,
    })
      .then((res) => {
        if (res.status === 401) {
          console.log("ssss");
          router.push("/teacher/login");
          return;
        }
        setLoader(false);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        console.log(schoolData);
        if (data.schools) {
          setSchoolData(data.schools);
        }
      });
  }, []);

  // Log when state changes
  useEffect(() => {
    console.log("schoolData updated:", schoolData);
  }, [schoolData]);

  return (
    <>
      <Header />
      <Sidebar />
      {loader && <PageLoader />}
      {schoolData.length <= 0 && (
        <div className="flex items-center justify-center sm:ml-64  pt-22 w-full bg-blue-300">
          <p className="mb-8">No data found</p>
        </div>
      )}

      {schoolData.length > 0 && (
        <div className=" pt-16 sm:ml-64 p-6 bg-gray-50 min-h-screen">
          <TableHeader actionType={actionType} />
          <FormTable header={header} tableData={schoolData} />
        </div>
      )}
    </>
  );
}
