"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { FormTimePicker } from "..";
import FormDropDown from "../FormDropDown";
import FormTextField from "../FormTextField";
type MethodProps = {
  id: number;
  subjectList: { id: string; text: string }[];
  classDays: { id: string; text: string }[];
  teachers: any[];
  remove: (id: number) => void;
};

export default function ClassSchedule({
  remove,
  id,
  subjectList,
  classDays,
  teachers,
}: MethodProps) {
  const [scheduleList, setScheduleList] = useState<number[]>([]);
  const [teacherSubject, setTeacherSubject] = useState<{ [key: string]: any }>(
    {},
  );
  const [defaultTeacherSubject, setDefaultTeacherSubject] = useState<{}>({});
  useEffect(() => {
    let addMoreId = Date.now();
    setScheduleList([addMoreId]); // safe: only runs on client
    getTeacherNameWIthSubject(addMoreId);
  }, [teachers]);
  const addMore = (id: number) => {
    // console.log("----", id);
    let addMoreId = Date.now();
    setScheduleList([...scheduleList, addMoreId]);
    getTeacherNameWIthSubject(addMoreId);
  };
  const removeSchedule = (id: number) => {
    // console.log(teacherSubject[id.toString()].subject);
    delete teacherSubject[id.toString()];
    // console.log(id, teacherSubject, scheduleList);
    setTeacherSubject({ ...teacherSubject });
    // console.log(id,teacherSubject[id.toString()]);
    // setTeacherSubject(delete teacherSubject?.id)

    setScheduleList(scheduleList.filter((value) => value != id));
  };

  function getStartTime() {
    let startTime = 9 * 60;
    const duration = 45;
    const output: any = [];
    let time = "";
    for (let index = 0; index < 8; index++) {
      time = `${Math.floor(startTime / 60)}:${startTime % 60 > 0 ? startTime % 60 : "00"} ${Math.floor(startTime / 60) >= 12 ? "PM" : "AM"}`;
      output[index] = { id: time, text: time };
      startTime = startTime + duration;
    }
    return output;
  }

  const teacherList = [
    {
      name: "viv",
      teacher_id: "teacher_6",
      gender: "M",
      email: "viv@yopmail.com",
      school_id: "school_101",
      phone: "9749325688",
      joining_date: "2011-07-25T18:30:00.000Z",
      class: ["class_2", "class_1", "class_3"],
      subjects: ["PT", "Math"],
      createdAt: "2025-09-13T07:40:21.652Z",
      updatedAt: "2025-09-13T07:40:21.652Z",
      id: "68c51fe5f614117089012b55",
    },
    {
      name: "Kishor",
      teacher_id: "teacher_5",
      school_id: "school_101",
      gender: "M",
      email: "kishor@yopmail.com",
      phone: "9749325688",
      joining_date: "2011-07-25T18:30:00.000Z",
      class: ["class_2", "class_3"],
      subjects: ["PT"],
      createdAt: "2025-09-13T07:27:51.765Z",
      updatedAt: "2025-09-13T07:27:51.765Z",
      id: "68c51cf7271570b801e9c67a",
    },
    {
      name: "Dev",
      teacher_id: "teacher_4",
      school_id: "school_101",
      gender: "M",
      email: "Dev@yopmail.com",
      phone: "9749325688",
      joining_date: "2011-07-12T18:30:00.000Z",
      class: ["class_2", "class_3"],
      subjects: ["PT"],
      createdAt: "2025-09-13T07:25:10.382Z",
      updatedAt: "2025-09-13T07:25:10.382Z",
      id: "68c51c56271570b801e9c674",
    },
    {
      name: "Sumi",
      teacher_id: "teacher_3",
      school_id: "school_101",
      gender: "M",
      email: "Sumi@yopmail.com",
      phone: "9749325688",
      joining_date: "2011-07-12T18:30:00.000Z",
      class: ["class_2", "class_3"],
      subjects: ["History", "Drawing"],
      createdAt: "2025-09-13T07:24:37.086Z",
      updatedAt: "2025-09-13T07:24:37.086Z",
      id: "68c51c35271570b801e9c671",
    },
    {
      name: "Ram",
      teacher_id: "teacher_2",
      school_id: "school_101",
      gender: "M",
      email: "Ram@yopmail.com",
      phone: "9749325688",
      joining_date: "2025-07-12T18:30:00.000Z",
      class: ["class_5", "class_2"],
      subjects: ["Math", "Science", "History"],
      createdAt: "2025-09-13T07:23:54.055Z",
      updatedAt: "2025-09-13T07:23:54.055Z",
      id: "68c51c0a271570b801e9c66d",
    },
    {
      name: "Jon",
      teacher_id: "teacher_1",
      school_id: "school_101",
      gender: "M",
      email: "kishor2@yopmail.com",
      phone: "9749325648",
      joining_date: "2025-09-12T18:30:00.000Z",
      class: ["class_1", "class_2"],
      subjects: ["Math", "Science"],
      createdAt: "2025-09-13T07:22:32.512Z",
      updatedAt: "2025-09-13T07:22:32.512Z",
      id: "68c51bb8271570b801e9c66a",
    },
  ];

  const validateTeacherStudent = (e: ChangeEvent<HTMLSelectElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    let splitData = name.split(/\[|\]/).filter(Boolean);
    if (value) {
      let splitData = name.split(/\[|\]/).filter(Boolean);

      if (name.indexOf("schedule") != -1) {
        // getTeacherNameWIthSubject(value);
      }
      // console.log(e.target.value, e.target.name,splitData,splitData[3]);
      // console.log(defaultTeacherSubject.teacher.filter(teacher=>teacher.subject.includes(value)));

      // console.log("old---",teacherSubject);
      teacherSubject[splitData[3]]["teacher"] =
        defaultTeacherSubject.teacher.filter((teacher) =>
          teacher.subject.includes(value),
        );
      // console.log(teacherSubject);
      setTeacherSubject({ ...teacherSubject });
    } else {
      // console.log("empty")
      teacherSubject[splitData[3]]["teacher"] = [];
      setTeacherSubject({ ...teacherSubject });
    }
  };

  const getTeacherNameWIthSubject = (teacherId: number) => {
    console.log("--========--");
    console.log("--teacher--", teachers, teacherList);
    const teacherSubjectList: any = [];
    // Initialize if not exists
    if (!teacherSubjectList[id]) {
      // teacherSubjectList[id] = { subject: [], teacher: [] };
      teacherSubjectList["subject"] = [];
      teacherSubjectList["teacher"] = [];
    }
    teachers.map((teacher) => {
      teacher.subjects?.map((subjectName: any) => {
        if (
          !teacherSubjectList["subject"].some((s: any) => s.id === subjectName)
        ) {
          teacherSubjectList["subject"].push({
            id: subjectName,
            text: subjectName,
          });
        }
      });

      console.log("--0--", teachers);
      teacherSubjectList["teacher"].push({
        id: teacher.teacher_id,
        text: `${teacher.name} [${teacher.teacher_id}]`,
        subject: teacher.subjects,
      });
    });
    setTeacherSubject({
      ...teacherSubject,
      [teacherId]: { ...teacherSubjectList },
    });
    setDefaultTeacherSubject({ ...teacherSubjectList });
  };

  return (
    <div className="border border-gray-500  rounded-lg p-4 my-2">
      <div>
        <FormDropDown
          name={`schedule[${id}][day]`}
          label="Classroom Name"
          values={classDays}
        />
      </div>
      {scheduleList.map((schedule) => (
        <div key={schedule} className="grid gap-6 mb-6 md:grid-cols-4">
          {/* <FormTextField name="name" label="Classroom Name" inputType="number" /> */}

          <FormTimePicker
            label="Start Time"
            name={`schedule[${id}][periods][${schedule}][start]`}
          />

          {/* <FormDropDown
              name={`schedule[${id}][periods][${schedule}][start]`}
              label="Start Time"
              values={getStartTime()}
            /> */}
          <FormTimePicker
            label="End Time"
            name={`schedule[${id}][periods][${schedule}][end]`}
          />

          <div>
            <FormDropDown
              name={`schedule[${id}][periods][${schedule}][subject]`}
              label="Subject Name"
              values={teacherSubject[schedule.toString()].subject}
              callBackFunction={validateTeacherStudent}
            />
          </div>
          <div className="inline-flex  items-center">
            <FormDropDown
              name={`schedule[${id}][periods][${schedule}][teacher_id]`}
              label="Teacher"
              values={teacherSubject[schedule.toString()].teacher}
            />
            <span
              className="bg-green-200 peer-focus:ring-4 rounded-full  w-11 cursor-pointer flex items-center justify-center"
              onClick={() => removeSchedule(schedule)}
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
            <span
              className="bg-green-200 peer-focus:ring-4 rounded-full  w-11 cursor-pointer flex items-center justify-center"
              onClick={() => addMore(schedule)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </span>
          </div>
        </div>
      ))}
      <div>
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
