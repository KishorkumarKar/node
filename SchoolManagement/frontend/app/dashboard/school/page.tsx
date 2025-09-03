"use client";

import { FormTable, PageLoader, Pagination, TableHeader } from "@/components";
import { getLoginToken } from "@/lib/manageCookieLib";
import { apiLink } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const pagination = {
  page_size: 10,
  current_page: 1,
  total: 0,
};
export default function Teacher() {
  const router = useRouter();
  const [schoolData, setSchoolData] = useState<any>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const [paginationData, setPaginationData] = useState<{
    current_page: number;
    total: number;
    page_size: number;
  }>(pagination);
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
    getRequest(apiLink.school.list);
  }, []);

  const getRequest = (url: string) => {
    const header = {
      limit: paginationData.page_size.toString(),
      page: paginationData.current_page.toString(),
      Authorization: `Bearer ${getLoginToken()}`,
    };
    fetch(url, {
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

        let pageData = { ...paginationData };
        pageData.current_page = data.page;
        pageData.total = data.total;
        setPaginationData(pageData);
        if (data.schools) {
          setSchoolData(data.schools);
        }
      });
  };

  const filter = (search: string) => {
    const url = apiLink.school.filter + search;
    getRequest(url);
  };
  const reset = () => {
    const url = apiLink.school.list;
    getRequest(url);
  };

  return (
    <>
      {loader && <PageLoader />}
      <div className=" pt-16 sm:ml-64 p-6 bg-gray-50 min-h-screen">
        <TableHeader
          actionType={actionType}
          filterDataEvent={filter}
          resetFilter={reset}
          searchText={"School Id or Name"}
        />
        {schoolData.length <= 0 && (
          <div className="flex items-center justify-center pt-22 w-full bg-blue-300">
            <p className="mb-8">No data found</p>
          </div>
        )}
        {schoolData.length > 0 && (
          <>
            <FormTable header={header} tableData={schoolData} />
            <Pagination pagination={paginationData} />
          </>
        )}
      </div>
    </>
  );
}
