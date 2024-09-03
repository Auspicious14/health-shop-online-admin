import { Card, Col, Divider, Menu, MenuProps, Row, Input } from "antd";
import { Chart } from "chart.js";
import { CategoryScale, registerables } from "chart.js";
import Link from "next/link";
import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
const Search = Input;

export const StoreDashboardPage = () => {
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
      <div className="shadow-sm flex flex-col md:flex-row items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">{`Good ${hour}, Store Owner`}</h1>
        <div className="w-full md:w-auto mt-4 md:mt-0">
          {/* <Search className="w-full" /> */}
        </div>
      </div>

      <div className="my-4 px-4">
        <h1 className="font-bold text-lg md:text-xl">Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 my-4 px-4">
        <Card.Grid className="text-center shadow-md py-5">
          <h1 className="text-sm">Total Sales</h1>
          <h1 className="font-bold text-2xl">$200</h1>
        </Card.Grid>
        <Card.Grid className="text-center shadow-md py-5">
          <h1 className="text-sm">Total Sales</h1>
          <h1 className="font-bold text-2xl">$200</h1>
        </Card.Grid>
        <Card.Grid className="text-center shadow-md py-5">
          <h1 className="text-sm">Total Sales</h1>
          <h1 className="font-bold text-2xl">$200</h1>
        </Card.Grid>
        <Card.Grid className="text-center shadow-md py-5">
          <h1 className="text-sm">Total Sales</h1>
          <h1 className="font-bold text-2xl">$200</h1>
        </Card.Grid>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 justify-between my-4 px-4">
        <div className="lg:w-2/3 p-4 border rounded-md">
          <h1 className="font-bold">Sales</h1>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2 flex-wrap items-center">
              <Card.Grid className="px-4 text-center border">
                <h1 className="text-sm">Today</h1>
              </Card.Grid>
              <Card.Grid className="px-4 text-center border">
                <h1 className="text-sm">Weekly</h1>
              </Card.Grid>
              <Card.Grid className="px-4 text-center border">
                <h1 className="text-sm">Monthly</h1>
              </Card.Grid>
              <Card.Grid className="px-4 text-center border">
                <h1 className="text-sm">Yearly</h1>
              </Card.Grid>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Bar
              data={data}
              options={{
                color: "red",
                maintainAspectRatio: false,
                responsive: true,
                // devicePixelRatio
              }}
              className="w-auto lg:w-full"
            />
          </div>
        </div>

        <div className="lg:w-1/3 w-full p-4 border rounded-md">
          <h1 className="font-bold">Customer Value</h1>
          <div className="overflow-x-auto">
            <Doughnut
              data={{
                labels: ["New Customer", "Returning Customer"],
                datasets: [
                  { data: [15, 85], borderWidth: 1, borderRadius: 15 },
                ],
              }}
              options={{
                // color: "red",
                maintainAspectRatio: false,
                responsive: true,
              }}
              className="w-auto lg:w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};
