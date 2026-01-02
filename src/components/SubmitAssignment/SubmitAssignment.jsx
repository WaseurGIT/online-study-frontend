import React, { useState, useContext } from "react";
import axiosSecure from "../../api/axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";

const SubmitAssignment = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    assignmentId: "",
    assignmentTitle: "",
    assignmentMarks: "",
    googleDocsLink: "",
    note: "",
  });

  if (!user) {
    return (
      <p className="text-center text-red-500 mt-10">
        Please login to submit an assignment.
      </p>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submission = {
      ...formData,
      examineeEmail: user.email,
      examineeName: user.displayName,
    };

    try {
      const res = await axiosSecure.post("/submissions", submission);
      Swal.fire("Success!", "Assignment submitted successfully.", "success");
      setFormData({
        assignmentId: "",
        assignmentTitle: "",
        assignmentMarks: "",
        googleDocsLink: "",
        note: "",
      });
    } catch (error) {
      console.error("Submission failed:", error.response?.data);
      Swal.fire(
        "Error!",
        error.response?.data?.message || "Failed to submit assignment.",
        "error"
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md my-10">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Submit Assignment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Assignment ID */}
        <input
          type="text"
          name="assignmentId"
          placeholder="Assignment ID"
          value={formData.assignmentId}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Title */}
        <input
          type="text"
          name="assignmentTitle"
          placeholder="Assignment Title"
          value={formData.assignmentTitle}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Marks */}
        <input
          type="number"
          name="assignmentMarks"
          placeholder="Total Marks"
          value={formData.assignmentMarks}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Google Docs Link */}
        <input
          type="url"
          name="googleDocsLink"
          placeholder="Google Docs Link"
          value={formData.googleDocsLink}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        {/* Note */}
        <textarea
          name="note"
          placeholder="Optional note"
          value={formData.note}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Submit Assignment
        </button>
      </form>
    </div>
  );
};

export default SubmitAssignment;
