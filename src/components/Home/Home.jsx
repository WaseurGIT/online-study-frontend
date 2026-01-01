import React from "react";
import Banner from "../Banner/Banner";
import Summary from "../Summary/Summary";
import AccordionUsage from "../Accordion/AccordionUsage";
import Assignments from "../Assignments/Assignments";

const Home = () => {
  return (
    <div>
      <Banner />
      <Summary></Summary>
      <Assignments></Assignments>
      <AccordionUsage></AccordionUsage>
    </div>
  );
};

export default Home;