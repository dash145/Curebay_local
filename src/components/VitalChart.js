import { XIcon } from "@heroicons/react/outline";
import moment from "moment";
import React from "react";
import { Bar } from "react-chartjs-2";
function VitalChart(props) {
  const colors = [
    "rgb(54, 162, 235)",
    "rgb(75, 192, 192)",
    "rgb(255, 99, 132)",
  ];
  let dataset = [];
  if (props.type) {
    dataset.push({
      label: props.type.toString(),
      data: props.data?.map((d) => d[props.type] ?? 0),
      backgroundColor: colors[0],
    });
  } else if (props.types) {
    dataset = props.types?.map((type, i) => {
      return {
        label: type.toString(),
        data: props.data?.map((d) => d[type] ?? 0),
        backgroundColor: colors[i % colors.length],
      };
    });
  }
  const barData = {
    labels: props.data?.map((d) =>
      moment(d.givenDate, "yyyy-MM-DD HH:mm:ss").format("MMM Do YY")
    ),
    datasets: dataset,
  };
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/3 my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div class="rounded-lg shadow-lg bg-white-600 w-full h-112 p-5 antialiased justify-between border border-gray-200">
              <div className="flex w-auto justify-between mb-4">
                <p className="text-medium font-medium text-2xl    ">
                  {props.title}
                </p>
                <div className="w-8 h-8 cursor-pointer">
                  <XIcon onClick={props.closePopup} />
                </div>
              </div>
              <div>
                <Bar
                  data={barData}
                  options={{
                    scales: {
                      yAxes: [
                        {
                          ticks: {
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                    legend: {
                      position: "right",
                    },
                    width: "100%",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black" />
    </>
  );
}
export default VitalChart;