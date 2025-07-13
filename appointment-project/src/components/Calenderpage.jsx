import React, { useContext, useState } from "react";
import AppointmentForm from "./AppointmentForm";
import { AppointmentContext } from "../context/AppointmentContext";

const Calendar = () => {
  const [popup, setPopup] = useState(false);
  const { setClickedDate, clikedDate, showBtn, setShowBtn, setHideForm } =
    useContext(AppointmentContext);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const today = new Date();
  const [monthIndex, setMonthIndex] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const goToPrevMonth = () => {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setYear(year - 1);
    } else {
      setMonthIndex(monthIndex - 1);
    }
  };

  const goToNextMonth = () => {
    if (monthIndex === 11) {
      setMonthIndex(0);
      setYear(year + 1);
    } else {
      setMonthIndex(monthIndex + 1);
    }
  };

  const generateCalendar = (month, year) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const weeks = [];
    let currentDay = 1 - firstDay;

    while (currentDay <= daysInMonth) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        if (currentDay < 1 || currentDay > daysInMonth) {
          week.push("");
        } else {
          week.push(currentDay.toString().padStart(2, "0"));
        }
        currentDay++;
      }
      weeks.push(week);
    }

    return weeks;
  };

  const isToday = (day) =>
    day === today.getDate().toString().padStart(2, "0") &&
    monthIndex === today.getMonth() &&
    year === today.getFullYear();

  const weeks = generateCalendar(monthIndex, year);


  const handleAddclickedDate = (day) => {
    if (!day) return;

    const clickedDateStr = `${day}-${(monthIndex + 1)
      .toString()
      .padStart(2, "0")}-${year}`;
    const clickedDateObj = new Date(clickedDateStr);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    setPopup(true);

    if (clickedDateObj >= today) {
      setClickedDate({ fullDate: clickedDateStr });
      setShowBtn(true);
    } else {
      setShowBtn(false);
      
    }
  };

  return (
    <div>
      {popup ? (
        <AppointmentForm setPopup={setPopup} />
      ) : (
        <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-white text-black w-full lg:w-full relative p-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={goToPrevMonth}
                className="text-gray-400 hover:text-green-500 text-xl"
              >
                ◀
              </button>
              <div className="text-2xl font-bold text-gray-800">
                {months[monthIndex]} {year}
              </div>
              <button
                onClick={goToNextMonth}
                className="text-gray-400 hover:text-green-500 text-xl"
              >
                ▶
              </button>
            </div>

            <div className="grid grid-cols-7 text-center font-semibold text-gray-400 text-sm tracking-widest mb-2">
              {daysOfWeek.map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-4 text-center text-gray-600">
              {weeks.map((week, weekIndex) =>
                week.map((day, dayIndex) => (
                  <div
                    key={`${weekIndex},${dayIndex}`}
                    className={`p-5 rounded-full ${
                      day === ""
                        ? "text-transparent"
                        : isToday(day)
                        ? "bg-blue-600 text-white font-bold"
                        : "hover:bg-blue-200"
                    }`}
                    onClick={() => handleAddclickedDate(day)}
                  >
                    {day}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
