import { useContext, useEffect, useState } from "react";
import hospitalData from "../hospitalData.json";
import { TiDeleteOutline } from "react-icons/ti";
import { AppointmentContext } from "../context/AppointmentContext";

function AppointmentForm({ setPopup, editData, onUpdate }) {
  const { appointments, setAppointments, showBtn } =
    useContext(AppointmentContext);
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    time: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.doctor || !formData.patient || !formData.time) {
      alert("Please select all the fields.");
      return;
    }

    if (editData && onUpdate) {
      onUpdate(formData);
    } else {
      const updated = [...appointments, formData];
      setAppointments(updated);
      localStorage.setItem("appointments", JSON.stringify(updated));
    }

    setFormData({ patient: "", doctor: "", time: "" });
    handlPopupForm();
  };

  useEffect(() => {
    const storedAppointments = localStorage.getItem("appointments");
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center  bg-opacity-40 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6">
        <button
          onClick={() => setPopup(false)}
          className="absolute top-4 right-4 text-3xl text-gray-500 hover:text-red-500 transition"
        >
          <TiDeleteOutline />
        </button>

        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          {editData ? "Edit Appointment" : "Book Appointment"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Patient
            </label>
            <select
              name="patient"
              value={formData.patient}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Patient</option>
              {hospitalData.map((data, index) => (
                <option key={index} value={data.patient.name}>
                  {data.patient.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Doctor
            </label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Doctor</option>
              {hospitalData.map((data, index) => (
                <option key={index} value={data.doctor.name}>
                  {data.doctor.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Appointment Time
            </label>
            <input
              type="datetime-local"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              {editData ? "Update Appointment" : "Book Appointment"}
            </button>
            {showBtn ? (
              <div>
                <h3 className="text-center font-bold">or</h3>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ">
                  Show Appoitments of the Day
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentForm;
