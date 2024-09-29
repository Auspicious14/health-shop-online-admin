import { Card, Col, Divider, Menu, MenuProps, Row, Input } from "antd";
// import Search from "antd/es/input/Search";
// import Search from "antd/es/input/Search";
import { Chart } from "chart.js";
import { CategoryScale, registerables } from "chart.js";
import Link from "next/link";
import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
const Search = Input;
export const HomePage = () => {
  Chart.register(CategoryScale, ...registerables);

  const time: number = new Date().getHours();
  let hour;
  if (time <= 11) {
    hour = "Morning";
  } else if (time > 11 && time < 16) {
    hour = "Afternoon";
  } else if (time >= 16 && time <= 23) {
    hour = "Evening";
  }

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3, 6, 9, 1, 12, 8],
        borderWidth: 1,
        borderRadius: 15,
      },
    ],
  };

  return (
    <>
      <div className="shadow-sm p-4 flex flex-col lg:flex-row items-center justify-between">
        <h1 className="text-2xl lg:text-3xl font-bold">{`Good ${hour}, Admin`}</h1>
        <Search className="w-full lg:w-60 mt-4 lg:mt-0" />
      </div>

      <div className="my-4">
        <h1 className="font-bold text-lg lg:text-xl">Dashboard</h1>
      </div>

      {/* Responsive Grid for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 my-4">
        <Card.Grid className="text-center shadow-md py-5">
          <h1 className="text-sm">Total Sales</h1>
          <h1 className="font-bold text-xl lg:text-2xl">$200</h1>
        </Card.Grid>

        <Card.Grid className="text-center shadow-md py-5">
          <h1 className="text-sm">Total Sales</h1>
          <h1 className="font-bold text-xl lg:text-2xl">$200</h1>
        </Card.Grid>

        <Card.Grid className="text-center shadow-md py-5">
          <h1 className="text-sm">Total Sales</h1>
          <h1 className="font-bold text-xl lg:text-2xl">$200</h1>
        </Card.Grid>

        <Card.Grid className="text-center shadow-md py-5">
          <h1 className="text-sm">Total Sales</h1>
          <h1 className="font-bold text-xl lg:text-2xl">$200</h1>
        </Card.Grid>
      </div>

      {/* Responsive Flex for Sales and Customer Value */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        {/* Sales Section */}
        <div className="w-full lg:w-[65%] p-4 border rounded-md">
          <div className="flex justify-between">
            <h1 className="font-bold text-lg lg:text-xl">Sales</h1>

            <div className="grid grid-cols-2 sm:flex gap-2 items-center">
              <Card.Grid className="px-4 text-center border">
                <h1 className="text-sm">Today</h1>
              </Card.Grid>
              <Card.Grid className="px-3 text-center border">
                <h1 className="text-sm">Weekly</h1>
              </Card.Grid>
              <Card.Grid className="px-2 text-center border">
                <h1 className="text-sm">Monthly</h1>
              </Card.Grid>
              <Card.Grid className="px-4 text-center border">
                <h1 className="text-sm">Yearly</h1>
              </Card.Grid>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="mt-4">
            <Bar
              data={data}
              options={{
                color: "red",
              }}
            />
          </div>
        </div>

        {/* Customer Value Section */}
        <div className="w-full lg:w-[30%] p-4 border rounded-md">
          <h1 className="text-lg lg:text-xl">Customer Value</h1>
          <div className="mt-4">
            <Doughnut
              data={{
                labels: ["New Customer", "Old Customer"],
                datasets: [
                  { data: ["15", "85"], borderWidth: 1, borderRadius: 15 },
                ],
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
