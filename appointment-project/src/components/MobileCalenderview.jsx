import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { AppointmentContext } from "../context/AppointmentContext";
import AppointmentForm from "./AppointmentForm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MobileCalenderview = () => {
  const { setPopup, appointments ,popup} = useContext(AppointmentContext);
  const [currentDay, setCurrentDay] = useState(dayjs());

  const handleScroll = (direction) => {
    setCurrentDay((prevDay) =>
      direction === "next" ? prevDay.add(1, "day") : prevDay.subtract(1, "day")
    );
  };

  const handleAddAppointment = () => {
    setPopup(true);
  };

  const handleEdit = (index) => {
    setEditingAppointment(appointments[index]);
    setEditingIndex(index);
    setShowForm(true);
  };
  const deleteAppointment = (index) => {
    const updated = appointments.filter((_, i) => i !== index);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  return (
    <div>
      <div className="bg-gray-300 text-white w-full lg:w-1/3 p-6 relative overflow-hidden">
      
      <DatePicker
    selected={currentDay.toDate()}
    onChange={(date) => setCurrentDay(dayjs(date))}
    className="text-black rounded-md px-2 py-1 w-full max-w-[180px] text-center text-sm"
    dateFormat="dd MMM yyyy"
  />
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => handleScroll("prev")}
            className="text-xl font-bold px-3 py-1 hover:text-lime-400"
          >
            <FiChevronLeft />
          </button>

          <button
            onClick={() => handleScroll("next")}
            className="text-xl font-bold px-3 py-1 hover:text-lime-400"
          >
            <FiChevronRight />
          </button>
        </div>

        <div className="text-center font-bold text-[120px] leading-none">
          {currentDay.date()}
        </div>
        <div className="text-center text-2xl font-semibold mt-3">
          {currentDay.format("dddd").toUpperCase()}
        </div>
        <div className="mt-8 text-sm font-medium">Add Appointments</div>
        <hr className="my-2 border-white/60" />
        <button
          className="w-6 h-6 border-2 border-white rounded-full text-lg text-white hover:text-lime-400 hover:border-lime-400 flex items-center justify-center absolute right-6 bottom-6"
          onClick={handleAddAppointment}
        >
          <FaPlus />
        </button>
      </div>
      <div className="mt-6">
        <div className="text-white font-semibold mb-2">Appointments</div>
        {appointments.map((appt, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl p-4 mb-3 flex justify-between items-start gap-4"
          >
            
            <div>
              <p className="text-gray-800 font-semibold text-base mb-1">
                👤 {appt.patient}
              </p>
              <p className="flex items-center text-sm text-gray-600 mb-1">
                🩺 <span className="ml-1">{appt.doctor}</span>
              </p>
              <p className="flex items-center text-sm text-gray-600">
                🕐{" "}
                <span className="ml-1">
                  {dayjs(appt.time).format("hh:mm A")}
                </span>
              </p>
            </div>

            
            <div className="flex flex-col gap-2">
              <button
                onClick={() => handleEdit(idx)}
                className="text-yellow-500 hover:text-yellow-600 transition text-sm font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => deleteAppointment(idx)}
                className="text-red-500 hover:text-red-600 transition text-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {
        popup && (
          <AppointmentForm setPopup={setPopup}/>
        )
        
      }
    </div>
  );
};

export default MobileCalenderview;
