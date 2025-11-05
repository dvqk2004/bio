const ctx = document.getElementById('tiktokChart').getContext('2d');

const data = {
  labels: ['27/10', '28/10', '29/10', '30/10', '31/10', '1/11', '2/11'],
  datasets: [
    {
      label: 'Lượt xem video',
      data: [122000, 87000, 124000, 98000, 102000, 96000, 100000],
      borderColor: '#00f5ff',
      tension: 0.3,
      fill: {
        target: 'origin',
        above: 'rgba(0,255,255,0.1)',
      },
      pointRadius: 3,
      borderWidth: 2,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#333',
      },
      ticks: {
        color: '#fff',
      },
    },
    x: {
      ticks: {
        color: '#fff',
      },
    },
  },
  plugins: {
    legend: {
      labels: {
        color: '#fff',
      },
    },
  },
};

new Chart(ctx, {
  type: 'line',
  data: data,
  options: options,
});
