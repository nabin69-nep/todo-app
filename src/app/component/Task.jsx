"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function Task() {
  const { data, error } = useSWR("http://localhost:3000/api", fetcher);

  if (error) return <div>Error occurred while fetching data!</div>;
  if (!data) return <div>Loading...</div>;

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete("/api", {
        
        params: {
          mongoId: id,
        },
      });
      toast.success(response.data.msg);
      mutate("http://localhost:3000/api");
    } catch (err) {
      toast.error("Failed to delete the task.");
    }
  };
  const completeTodo = async (id) => {
    try {
      const response = await axios.put("/api",{}, {
        
        params: {
          mongoId: id,
        },
      });
      toast.success(response.data.msg);
      mutate("http://localhost:3000/api");
    } catch (err) {
      toast.error("Failed to delete the task.");
    }
  };

  return (
    <Table >
      <TableCaption>A list of your recent Tasks.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">S.No</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Title</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(data.todos) && data.todos.length > 0 ? (
          data.todos.map((task, i) => (
            <TableRow key={task.id || i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{task.isCompleted ? "Completed" : "Pending"}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell className="text-right">
                <div>
                  <button
                    onClick={() => deleteTodo(task._id)}
                    className="px-2 ml-1 py-1 bg-red-400  text-white"
                  >
                    Delete
                  </button>
                  <button onClick={()=>completeTodo(task._id)} className="px-2 ml-0 sm:ml-1 py-1 bg-green-400  text-white">
                    Done
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No tasks found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default Task;
