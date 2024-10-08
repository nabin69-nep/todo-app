"use client";
import React, { useState } from "react";
import { RiTodoLine } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { mutate } from "swr";
function Form() {
  const [task, setTask] = useState({
    title: "",
  });

  const onChangeHandler = (e) => {
    // Correctly update the task state as an object
    setTask({
      ...task, 
      [e.target.name]: e.target.value, // Make sure you're targeting the correct input field
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Send the task object to the backend
      const response = await axios.post('/api', task);
      toast.success(response.data.msg);
      setTask({title:""}); // Clear the input after successful submission
      mutate("http://localhost:3000/api");
    } catch (error) {
      toast.error("Error submitting task");
    }
  }

  return (
<div className="max-w-lg mx-auto px-4 py-8">
  <div className="flex items-center gap-3 justify-center">
    <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">Todo-App</h1>
    <RiTodoLine className="text-purple-950 mt-1 sm:mt-3" size={32} />
  </div>

  <ToastContainer theme="dark" />

  <form onSubmit={handleSubmit} className="relative mt-4 flex flex-col sm:flex-row items-center gap-3">
    <input
      type="text"
      name="title"
      value={task.title} // Set the input value to the state
      onChange={onChangeHandler}
      className="w-full sm:w-auto py-3 px-5 flex-grow outline-none placeholder:text-white bg-slate-500 rounded-full text-red-300"
      placeholder="Add a new task"
    />
    <button
      className="bg-orange-500 w-full sm:w-auto px-6 font-semibold text-white rounded-full py-3 sm:py-2"
      type="submit"
    >
      Add
    </button>
  </form>
</div>

  );
}

export default Form;
