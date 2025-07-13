import { createContext, useState } from "react";

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [clikedDate, setClickedDate] = useState(null);
  const [showBtn, setShowBtn] = useState(false);
  const [hideForm, setHideForm] = useState(false);
  const [popup, setPopup] = useState(false);
  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        setAppointments,
        clikedDate,
        setClickedDate,
        showBtn,
        setShowBtn,
        hideForm, setHideForm,
        popup, setPopup,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
