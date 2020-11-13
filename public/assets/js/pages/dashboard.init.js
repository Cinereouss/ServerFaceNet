var options = {
    chart: {
      height: 359,
      type: 'bar',
      stacked: !0,
      toolbar: { show: !1 },
      zoom: { enabled: !0 }
    },
    plotOptions: {
      bar: { horizontal: !1, columnWidth: '15%', endingShape: 'rounded' }
    },
    dataLabels: { enabled: !1 },
    series: [
      {
        name: 'Số học viên hoàn thành',
        data: [32, 28, 35, 34, 30, 34, 33, 29, 30, 36, 32, 12]
      },
      {
        name: 'Số hồ sơ chờ',
        data: [23, 23, 20, 19, 18, 25, 26, 22, 21, 18, 24, 10]
      },
      {
        name: 'Xong trước hạn',
        data: [11, 17, 15, 15, 21, 14, 15, 18, 17, 12, 20, 3]
      }
    ],
    xaxis: {
      categories: [
        'Tháng 12',
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11'
      ]
    },
    colors: ['#556ee6', '#f1b44c', '#34c38f'],
    legend: { position: 'bottom' },
    fill: { opacity: 1 }
  },
  chart = new ApexCharts(
    document.querySelector('#stacked-column-chart'),
    options
  );
chart.render();
options = {
  chart: { height: 180, type: 'radialBar', offsetY: -10 },
  plotOptions: {
    radialBar: {
      startAngle: -135,
      endAngle: 135,
      dataLabels: {
        name: { fontSize: '13px', color: void 0, offsetY: 60 },
        value: {
          offsetY: 22,
          fontSize: '16px',
          color: void 0,
          formatter: function(e) {
            return e + '%';
          }
        }
      }
    }
  },
  colors: ['#556ee6'],
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      shadeIntensity: 0.15,
      inverseColors: !1,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 65, 91]
    }
  },
  stroke: { dashArray: 4 },
  series: [42],
  labels: ['Hồ sơ đã hoàn thành']
};
(chart = new ApexCharts(
  document.querySelector('#radialBar-chart'),
  options
)).render();
