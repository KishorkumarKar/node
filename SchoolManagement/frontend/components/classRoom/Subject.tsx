"use client";

import FormDropDown from "../FormDropDown";
type MethodProps = {
  id: number;
  subjectList: { id: string; text: string }[];
  teachers: { id: string; text: string }[];
  remove: (id: number) => void;
};

export default function ClassRoomSubject({
  remove,
  id,
  subjectList,
  teachers,
}: MethodProps) {
  return (
    <div className="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <FormDropDown
          name={`subject[${id}][name]`}
          label="Subject Name"
          values={subjectList}
        />
      </div>
      <div className="inline-flex  items-center">
        <FormDropDown
          name={`subject[${id}][teacher_id]`}
          label="Teacher"
          values={teachers}
        />
        <span
          className="bg-green-200 peer-focus:ring-4 rounded-full  w-11 cursor-pointer flex items-center justify-center"
          onClick={() => remove(id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 7h12M9 7V4h6v3m-7 4v7m4-7v7m4-7v7M5 7h14l-1 13H6L5 7z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
