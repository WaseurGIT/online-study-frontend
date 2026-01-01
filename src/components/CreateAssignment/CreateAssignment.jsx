import React, { useState, useContext } from "react";
import axiosSecure from "../../api/axios";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from "sweetalert2";

const CreateAssignment = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    assignment_id: "",
    title: "",
    description: "",
    marks: "",
    thumbnailUrl: "",
    difficulty: "easy",
    dueDate: "",
    creatorEmail: user?.email || "",
    creatorName: user?.displayName || "",
    createdAt: new Date().toISOString(),
  });

  if (!user) {
    return (
      <p className="text-center text-red-500">
        Please login to create an assignment.
      </p>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access-token");
    if (!token) {
      Swal.fire("Error!", "You must be logged in to create an assignment.", "error");
      return;
    }

    const assignment = {
      ...formData,
      marks: Number(formData.marks),
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/assignments", assignment);
      console.log("Saved:", res.data);
      Swal.fire("Success!", "Assignment created successfully.", "success");
      e.target.reset();
      setFormData({
        assignment_id: "",
        title: "",
        description: "",
        marks: "",
        thumbnailUrl: "",
        difficulty: "easy",
        dueDate: "",
        creatorEmail: user?.email || "",
        creatorName: user?.displayName || "",
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error saving assignment:", error.response?.data);
      Swal.fire(
        "Error!",
        "Failed to create assignment. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md my-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-indigo-500 pacifico-regular">
        Create Assignment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Assignment ID */}
        <input
          type="text"
          name="assignment_id"
          placeholder="Assignment ID"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Title */}
        <input
          type="text"
          name="title"
          placeholder="Assignment Title"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Assignment Description"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Marks */}
        <input
          type="number"
          name="marks"
          placeholder="Marks"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Thumbnail URL */}
        <input
          type="url"
          name="thumbnailUrl"
          placeholder="Thumbnail Image URL"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Difficulty */}
        <select
          name="difficulty"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        {/* Due Date */}
        <input
          type="date"
          name="dueDate"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Create Assignment
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
