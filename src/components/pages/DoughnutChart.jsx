import React, { useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ teachers, employees, holidays }) => {
  const chartRef = useRef(null);

  const data = {
    labels: ['Teachers', 'Employees', '/'],
    datasets: [
      {
        label: 'Count',
        data: [teachers, employees, holidays],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFC56'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  useEffect(() => {
    return () => {
      // Cleanup chart instance to prevent memory leaks
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div style={{ height: '300px', width: '300px' }}>
      <Doughnut ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
