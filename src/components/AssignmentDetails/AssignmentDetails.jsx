import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosSecure from "../../api/axios";

const AssignmentDetails = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get(`/assignments/${id}`)
      .then((res) => {
        setAssignment(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!assignment) {
    return <p className="text-center mt-10">Assignment not found</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4 my-20">
      {/* Card */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 p-6">
          <p className="text-indigo-100 mt-1">
            Assignment ID: {assignment.assignment_id}
          </p>
          <h1 className="text-3xl font-bold text-white">{assignment.title}</h1>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div className="flex flex-wrap gap-4">
            <div className="bg-indigo-50 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-500">Total Marks</p>
              <p className="text-lg font-semibold text-indigo-600">
                {assignment.marks}
              </p>
            </div>

            {/* <div className="bg-green-50 px-4 py-2 rounded-lg">
              <p className="text-sm text-gray-500">Status</p>
              <p className="text-lg font-semibold text-green-600">Open</p>
            </div> */}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-1">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {assignment.description || "No description provided."}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <p className="text-sm text-gray-500">
            Please submit before the deadline.
          </p>

          <Link
            to={`/submitAssignment/${assignment._id}`}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold
                       hover:bg-indigo-700 transition duration-300 shadow-md"
          >
            Submit Assignment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;
