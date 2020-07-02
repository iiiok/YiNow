const data = {
	labels: [ 'Red', 'Green', 'Yellow' ],
	datasets: [
		{
			data: [ 300, 50, 100 ],
			backgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ],
			hoverBackgroundColor: [ '#FF6384', '#36A2EB', '#FFCE56' ]
		}
	]
};
const data2 = {
	labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ],
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: [ 65, 59, 80, 81, 56, 55, 40 ]
		}
	]
};

const labels = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ];
const data3 = {
	datasets: [
		{
			label: 'Sales',
			type: 'line',
			data: [ 51, 65, 40, 49, 60, 37, 40 ],
			fill: false,
			borderColor: '#EC932F',
			backgroundColor: '#EC932F',
			pointBorderColor: '#EC932F',
			pointBackgroundColor: '#EC932F',
			pointHoverBackgroundColor: '#EC932F',
			pointHoverBorderColor: '#EC932F',
			yAxisID: 'y-axis-2'
		},
		{
			type: 'bar',
			label: 'Visitor',
			data: [ 200, 185, 590, 621, 250, 400, 95 ],
			fill: false,
			backgroundColor: '#71B37C',
			borderColor: '#71B37C',
			hoverBackgroundColor: '#71B37C',
			hoverBorderColor: '#71B37C',
			yAxisID: 'y-axis-1'
		}
	]
};

const options = {
	responsive: true,
	tooltips: {
		mode: 'label'
	},
	elements: {
		line: {
			fill: false
		}
	},
	scales: {
		xAxes: [
			{
				display: true,
				gridLines: {
					display: false
				},
				labels: labels
			}
		],
		yAxes: [
			{
				type: 'linear',
				display: true,
				position: 'left',
				id: 'y-axis-1',
				gridLines: {
					display: false
				},
				labels: {
					show: true
				}
			},
			{
				type: 'linear',
				display: true,
				position: 'right',
				id: 'y-axis-2',
				gridLines: {
					display: false
				},
				labels: {
					show: true
				}
			}
		]
	}
};

const plugins = [
	{
		// afterDraw: (chartInstance, easing) => {
		// 	const ctx = chartInstance.chart.ctx;
		// 	ctx.fillText('This text drawn by a plugin', 100, 100);
		// }
	}
];

const paragraph1 =
	'Ladies and gentlemen, \
  A very warm welcome to all of you. \
  Thank you all for accepting our invitation and joining us for this \
  event.\
  It is my pleasure to open this Annual Research Conference, on\
  “Distributional implications of the crisis and policy responses”.\
  We got flooded with requests to participate in this conference.\
  Clearly, this massive interest not only reflects the exceptionally high\
  level of the speakers, but also shows the importance – even more,\
  the urgency – of the theme of this conference.';

export { data, data2, data3, paragraph1, plugins, options };
