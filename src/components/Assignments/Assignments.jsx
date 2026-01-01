import axios from "axios";
import React, { useEffect, useState } from "react";
import AssignmentCard from "../AssignmentCard/AssignmentCard";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/assignments")
      .then((res) => setAssignments(res.data));
  }, []);

  return (
    <div>
      <h1>Assignments</h1>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-2 lg:mx-50">
        {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment.assignment_id}
            assignment={assignment}
          ></AssignmentCard>
        ))}
      </div>
    </div>
  );
};

export default Assignments;
