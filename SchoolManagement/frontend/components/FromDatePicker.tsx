import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function FromDatePicker() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      placeholderText="Select date"
      dateFormat="dd/MM/yyyy"
      className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
      calendarClassName="z-50" // ensure popup is on top
      popperClassName="z-50" // ensure Popper.js wrapper is above
      popperPlacement="bottom-start"
      selected={startDate}
      onChange={(date) => setStartDate(date as Date)}
      shouldCloseOnSelect={true} // auto-close only on date select
      preventOpenOnFocus={false}
    />
  );
}
