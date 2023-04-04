import { Card, Col, Divider, Menu, MenuProps, Row } from "antd";
import Search from "antd/es/input/Search";
// import Search from "antd/es/input/Search";
import { Chart } from "chart.js";
import { CategoryScale, registerables } from "chart.js";
import Link from "next/link";
import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { SideNav } from "../../components";

export const HomePage = () => {
  Chart.register(CategoryScale, ...registerables);
  const time = new Date().getHours();
  console.log(time);
  let hour;
  if (time <= 11) {
    hour = "Morning";
  } else if (time > 11 && time < 16) {
    hour = "Afternoon";
  } else if (time > 16 && time <= 23) {
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
      <div className="flex w-full gap-4">
        <div className="w-[20%] h-screen border ">
          <div className="pb-8">
            <Link href={"/"}>Logo</Link>
          </div>
          <SideNav />
        </div>
        <div className="w-[80%] mx-4">
          <div className="shadow-sm p-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold">{`Good ${hour}, Admin`}</h1>
            <Search className="w-60" />
          </div>
          <div>
            <h1 className="font-bold">Dashboard</h1>
          </div>
          <div className="flex gap-8 my-4 items-center justify-evenly">
            {/* <Divider orientation="left">Responsive</Divider> */}
            <Card.Grid className="text-center w-[25%] shadow-md py-5 inset-3">
              <h1 className="text-sm">Total Sales</h1>
              <h1 className="font-bold text-2xl">$200</h1>
            </Card.Grid>
            <Card.Grid className="text-center w-[25%] shadow-md py-5 inset-3">
              <h1 className="text-sm">Total Sales</h1>
              <h1 className="font-bold text-2xl">$200</h1>
            </Card.Grid>
            <Card.Grid className="text-center w-[25%] shadow-md py-5 inset-3">
              <h1 className="text-sm">Total Sales</h1>
              <h1 className="font-bold text-2xl">$200</h1>
            </Card.Grid>
            <Card.Grid className="text-center w-[25%] shadow-md py-5 inset-3">
              <h1 className="text-sm">Total Sales</h1>
              <h1 className="font-bold text-2xl">$200</h1>
            </Card.Grid>
          </div>
          <div className="w-full flex  gap-4 justify-between">
            <div className="w-[65%] p-4 border rounded-md">
              <div className="flex justify-between">
                <h1 className="font-bold">Sales</h1>
                <div className="flex items-center">
                  <Card.Grid className="px-4 text-center w-[25%] border">
                    <h1 className="text-sm ">Today</h1>
                  </Card.Grid>
                  <Card.Grid className="px-4 text-center w-[25%] border">
                    <h1 className="text-sm">Weekly</h1>
                  </Card.Grid>
                  <Card.Grid className="px-4 text-center w-[25%] border">
                    <h1 className="text-sm">Monthly</h1>
                  </Card.Grid>
                  <Card.Grid className="px-4 text-center w-[25%] border">
                    <h1 className="text-sm">Yearly</h1>
                  </Card.Grid>
                </div>
              </div>
              <Bar
                data={data}
                options={{
                  // plugins: {
                  //   title: {
                  //     display: true,
                  //     text: "Users Gained between 2016-2020",
                  //   },
                  // },
                  color: "red",
                }}
              />
            </div>
            <div className="w-[30%] p-4 border rounded-md">
              <h1>Customer value</h1>
              <Doughnut
                data={{
                  labels: ["new customer", "old customer"],
                  datasets: [
                    { data: ["15", "85"], borderWidth: 1, borderRadius: 15 },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
