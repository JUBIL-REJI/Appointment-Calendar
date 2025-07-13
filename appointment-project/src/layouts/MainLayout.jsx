import { useContext, useState } from "react";
import Calenderpage from "../components/Calenderpage";
import { AppointmentContext } from "../context/AppointmentContext";
import { IoIosTimer } from "react-icons/io";
import { FaStethoscope } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import AppointmentForm from  "./components/AppointmentForm"

function MainLayout() {
  const { appointments, setAppointments, clikedDate } =
    useContext(AppointmentContext);
  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const deleteAppointment = (indexToRemove) => {
    const existing = JSON.parse(localStorage.getItem("appointments")) || [];
    const updated = existing.filter((_, i) => i !== indexToRemove);
    localStorage.setItem("appointments", JSON.stringify(updated));
    setAppointments(updated);
  };

  const convertToIST = (timeStr) => {
    const date = new Date(timeStr);
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  const handleEdit = (index) => {
    setEditingAppointment(appointments[index]);
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleUpdate = (updatedData) => {
    const updated = [...appointments];
    updated[editingIndex] = updatedData;
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
    setEditingAppointment(null);
    setEditingIndex(null);
    setShowForm(false);
  };

  const visibleAppointments = showAll ? appointments : appointments.slice(0, 3);

const filterBydayAppointments = clikedDate?.fullDate
  ? appointments.filter((appt) => appt.date === clikedDate.fullDate)
  : []; 


  console.log(filterBydayAppointments);
  return (
    <div className="flex flex-col lg:flex-row justify-evenly items-start gap-10 p-6">
      <div className="w-full lg:w-1/2">
        <Calenderpage />
      </div>

      <div className="w-full lg:w-1/2 mt-6">
        <h1 className="text-center text-2xl font-bold mb-4 text-blue-800">
          Patients List
        </h1>

        {appointments?.length > 0 ? (
          <>
            <div
              className={`space-y-4 overflow-y-auto transition-all ${
                showAll ? "max-h-[500px]" : "max-h-[400px]"
              }`}
            >
              {appointments.map((data, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-white shadow-md rounded-xl hover:shadow-lg transition-all"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      👤 {data.patient}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <FaStethoscope className="mr-2 text-blue-600" />
                      {data.doctor}
                    </p>
                    <p className="flex items-center text-gray-600">
                      <IoIosTimer className="mr-2 text-blue-600" />
                      {convertToIST(data.time)}
                    </p>
                    <p className="flex items-center text-gray-600">
                      {data.date}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 bg-yellow-400 text-white text-sm rounded hover:bg-yellow-500 transition"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteAppointment(index)}
                      className="p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-full transition"
                      title="Delete"
                    >
                      <IoMdClose className="text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {appointments.length > 3 && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              </div>
            )} 
          </>
        ) : (
          <p className="text-center text-gray-500">
            No appointments scheduled.
          </p>
        )}
      </div>

      {showForm && (
        <AppointmentForm
          handlPopupForm={() => {
            setShowForm(false);
            setEditingAppointment(null);
            setEditingIndex(null);
          }}
          editData={editingAppointment}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
}

export default MainLayout;
