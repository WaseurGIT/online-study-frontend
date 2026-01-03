import React, { useContext, useEffect, useState } from "react";
import axiosSecure from "../../api/axios";
import SubmissionCard from "../SubmissionCard/SubmissionCard";
import SectionTitle from "../SectionTitle/SectionTitle";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Submission = () => {
  const {user} = useContext(AuthContext)
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/submissions?email=${user.email}`)
      .then((res) => setSubmissions(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="my-20">
      <SectionTitle title="Submissions"></SectionTitle>
      
      <div className="flex justify-end mx-56 my-5">
        <Link
          to="/submitAssignment"
          className="p-4 bg-indigo-500 text-white rounded-lg cursor-pointer"
        >
          Submit Assignment
        </Link>
      </div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-2 lg:mx-50">
        {submissions.map((submission) => (
          <SubmissionCard key={submission._id} submission={submission} />
        ))}
      </div>
    </div>
  );
};

export default Submission;
