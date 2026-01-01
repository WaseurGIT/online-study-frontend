import axios from "axios";
import { useEffect, useState } from "react";
import AssignmentCard from "../AssignmentCard/AssignmentCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import { Link } from "react-router-dom";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/assignments")
      .then((res) => setAssignments(res.data))
      .catch((error) => console.error("Error fetching assignments:", error));
  }, []);

  const handleDeleteFromUI = (id) => {
    setAssignments((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="my-20">
      <SectionTitle title="Assignments"></SectionTitle>
      <div className="flex justify-end mx-56 my-5">
        <Link
          to="/createAssignment"
          className="p-4 bg-indigo-500 text-white rounded-lg cursor-pointer"
        >
          Create Assignment
        </Link>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-2 lg:mx-50">
        {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment._id}
            assignment={assignment}
            onDelete={handleDeleteFromUI}
          ></AssignmentCard>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
