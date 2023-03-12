import CustomActiveShapePieChart from "@/components/customActiveShapePieChart";
import SimpleLineChart from "@/components/simpleLineChart";
import StackedBarChart from "@/components/stackedBarChart";

const Home = () => {
  return (
    <div>
      <h1>React Charts (Recharts)</h1>
      <SimpleLineChart></SimpleLineChart>
      <StackedBarChart></StackedBarChart>
      <CustomActiveShapePieChart></CustomActiveShapePieChart>
    </div>
  );
};

export default Home;