import React, { useEffect, useRef, useState } from "react";
import { FaUsers, FaBook, FaClipboardCheck } from "react-icons/fa";

const Summary = () => {
  const sectionRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const [students, setStudents] = useState(0);
  const [assignments, setAssignments] = useState(0);
  const [submissions, setSubmissions] = useState(0);

  const startCounting = () => {
    animateCount(128, setStudents);
    animateCount(42, setAssignments);
    animateCount(310, setSubmissions);
  };

  const animateCount = (target, setter) => {
    let count = 0;
    const increment = Math.ceil(target / 50);

    const interval = setInterval(() => {
      count += increment;
      if (count >= target) {
        setter(target);
        clearInterval(interval);
      } else {
        setter(count);
      }
    }, 30);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          startCounting();
          setHasAnimated(true);
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [hasAnimated]);

  return (
    <div ref={sectionRef} className="my-20 px-6">

      <div className="flex flex-wrap justify-center gap-6">
        <SummaryCard
          icon={<FaUsers />}
          label="Total Students"
          value={students}
          color="indigo"
        />
        <SummaryCard
          icon={<FaBook />}
          label="Total Assignments"
          value={assignments}
          color="green"
        />
        <SummaryCard
          icon={<FaClipboardCheck />}
          label="Total Submissions"
          value={submissions}
          color="orange"
        />
      </div>
    </div>
  );
};

const SummaryCard = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-4 bg-white shadow-lg p-6 rounded-xl w-72">
    <div className={`bg-${color}-100 p-4 rounded-full`}>
      <div className={`text-${color}-600 text-3xl`}>{icon}</div>
    </div>
    <div>
      <p className="text-gray-500">{label}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  </div>
);

export default Summary;
