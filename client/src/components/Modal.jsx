import React from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setShowModal, getData, task }) => {
  const [cookies, setCookies, removeCookies] = useCookies(["user"]);
  const editMode = mode === "edit" ? true : false;

  const signOut = () => {
    console.log("signing out");
    removeCookies("Email");
    removeCookies("AuthToken");
    window.location.reload();
  };

  const [data, setData] = useState({
    user_email: editMode ? task.user_email : cookies.Email,
    title: editMode ? task.title : null,
    progress: editMode ? task.progress : 50,
    date: editMode ? task.date : null,
  });

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVERURL}/todos`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log("I can now add todos from UI");
        setShowModal(false);
        getData();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_SERVERURL}/todos/${task.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log("I can now edit todos from UI");
        setShowModal(null);
        setTimeout(() => getData(), 1000);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((data) => ({
      ...data,
      [name]: value,
      date: new Date(),
    }));
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>x</button>
        </div>
        <form>
          <input
            id="todo-input"
            required
            maxLength={30}
            placeholder="Your Task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            required
            type="range"
            id="range"
            className="styled-slider"
            min="0"
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
