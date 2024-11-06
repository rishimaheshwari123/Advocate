import React from "react";
import Slider from "../components/core/home/Slider";
import HRManagement from "../components/core/home/HRManagement";
import Payroll from "../components/core/home/Payroll";
import Time from "../components/core/home/Time";
import HRMFeatures from "../components/core/home/HRMFeatures";

const Home = () => {
  return (
    <div>
      <Slider />
      <HRManagement />
      <Payroll />
      <Time />
      <HRMFeatures />
    </div>
  );
};

export default Home;
