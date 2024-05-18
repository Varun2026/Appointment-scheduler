import React, { useState, useEffect } from "react";
import AppointmentForm from "./AppointmentForm";
import AppointmentList from "./AppointmentList";
import "./App.css";

const App = () => {
    const [appointments, setAppointments] = useState([]);

    // Load appointments from local storage when the component mounts
    useEffect(() => {
        const storedAppointments = localStorage.getItem("appointments");
        if (storedAppointments) {
            console.log("Loading from local storage:", JSON.parse(storedAppointments));
            setAppointments(JSON.parse(storedAppointments));
        }
    }, []);

    // Save appointments to local storage whenever they change
    useEffect(() => {
        console.log("Saving to local storage:", appointments);
        localStorage.setItem("appointments", JSON.stringify(appointments));
    }, [appointments]);

    const addAppointment = (appointment) => {
        setAppointments([...appointments, appointment]);
    };

    const deleteAppointment = (index) => {
        const newAppointments = appointments.filter((_, i) => i !== index);
        setAppointments(newAppointments);
    };

    const editAppointment = (index, name, date) => {
        const newAppointments = [...appointments];
        newAppointments[index] = { name, date };
        setAppointments(newAppointments);
    };

    const clearAppointments = () => {
        setAppointments([]);
    };

    return (
        <div className="app-container">
            <AppointmentForm addAppointment={addAppointment} />
            <AppointmentList
                appointments={appointments}
                deleteAppointment={deleteAppointment}
                editAppointment={editAppointment}
                clearAppointments={clearAppointments}
            />
        </div>
    );
};

export default App;
