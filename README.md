# Next.js Note

## React Recharts

### Install Dependency
```code
npm install recharts
```
### components/customActiveShapePieChart.js
```js
import dynamic from "next/dynamic";
import {useCallback, useState} from "react";
import {PieChart, Pie, Sector, ResponsiveContainer} from "recharts";

const data = [
    {name: "Group A", value: 400},
    {name: "Group B", value: 300},
    {name: "Group C", value: 300},
    {name: "Group D", value: 200}
];

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >{`PV ${value}`}</text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#999"
            >
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};
const CustomActiveShapePieChart = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    return (
        <div className="pieChart">
            <ResponsiveContainer>
                <PieChart width="100%" height="100%">
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={data}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default dynamic(() => Promise.resolve(CustomActiveShapePieChart), {ssr: false});
```
### components/simpleLineChart.js
```js
import dynamic from 'next/dynamic';
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";

const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400, },
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210, },
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290, },
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000, },
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181, },
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500, },
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100, },
];

const SimpleLineChart = () => {
    return (
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{r: 8}}
            />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
    );
};

export default dynamic(() => Promise.resolve(SimpleLineChart), {ssr: false});
```
### components/stackedBarChart.js
```js
import dynamic from 'next/dynamic';
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";

const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400, },
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210, },
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290, },
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000, },
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181, },
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500, },
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100, },
];

const StackedBarChart = () => {
    return (
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="red" />
            <Bar dataKey="uv" stackId="a" fill="green" />
            <Bar dataKey="amt" stackId="a" fill="blue" />
        </BarChart>
    );
};

export default dynamic(() => Promise.resolve(StackedBarChart), {ssr: false});
```
### pages/index.js
```js
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
```
### styles/globals.css
```css
.pieChart {
  width: 500px;
  height: 400px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #cdc9c9;
  background-color: #faf5ef;
  border-radius: 15px;
}
```