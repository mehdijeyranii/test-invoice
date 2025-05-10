import React from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import type DateObject from "react-date-object";

interface Props {
  values: Date | null | undefined;
  onChange: (date: Date) => void;
}

const DueDatePicker: React.FC<Props> = ({ values, onChange }) => {
  const handleChange = (date: DateObject | null) => {
    if (date) {
      onChange(date.toDate());
    }
  };
  return (
    <div className="flex items-center gap-4">
      <label className="font-bold">تاریخ سررسید:</label>
      <DatePicker
        inputClass="h-10 text-sm p-5 border text-center inline"
        value={values}
        onChange={handleChange}
        calendar={persian}
        locale={persian_fa}
      />
    </div>
  );
};

export default DueDatePicker;
