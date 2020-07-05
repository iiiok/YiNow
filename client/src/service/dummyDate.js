const color = [
	'#FF6384',
	'#36A2EB',
	'#FFCE56',
	'#e6194b',
	'#3cb44b',
	'#ffe119',
	'#4363d8',
	'#f58231',
	'#911eb4',
	'#46f0f0',
	'#f032e6',
	'#bcf60c',
	'#fabebe',
	'#008080',
	'#e6beff',
	'#9a6324',
	'#fffac8',
	'#800000',
	'#aaffc3',
	'#808000',
	'#ffd8b1',
	'#000075',
	'#808080'
];
const MoviceData = {
	labels: [
		'Forrest Gump',
		'无间道',
		'Transformers',
		'Matrix',
		'大话西游之仙履奇緣',
		'The Godfather',
		'花樣年華',
		'The Lord of the Ring',
		'Pulp Fiction',
		'WALL·E'
	],
	datasets: [
		{
			label: '',
			data: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],
			backgroundColor: color,
			hoverBackgroundColor: color
		}
	]
};
const data2 = {
	labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ],
	datasets: [
		{
			label: 'Our Businesss Predition in 2021',
			// backgroundColor: 'rgba(255,99,132,0.2)',
			// borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			data: [  36, 43,65, 59, 80, 81, 56 ],
			fill:false,
			backgroundColor:["rgba(255, 99, 132, 0.2)","rgba(255, 159, 64, 0.2)","rgba(255, 205, 86, 0.2)","rgba(75, 192, 192, 0.2)","rgba(54, 162, 235, 0.2)","rgba(153, 102, 255, 0.2)","rgba(131, 67, 107, 0.2)"],
			borderColor:["rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(54, 162, 235)","rgb(153, 102, 255)","rgb(131, 67, 107)"]
		}
	]
};
const options2 = {scales:{xAxes:[{ticks:{beginAtZero:true}}]}};

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
const movice = [
	{
		id: 1,
		title: 'Forrest Gump (1994)',
		img:
			'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
		des: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other...'
	},
	{
		id: 2,
		title: '无间道',
		img: 'images/p2564556863.jpg',
		des: '1991年，香港黑帮三合会会员刘健明（刘德华）听从老大韩琛（曾志伟）...'
	},
	{
		id: 3,
		title: 'Transformers: Dark of the Moon(2011)',
		img:
			'https://m.media-amazon.com/images/M/MV5BMTkwOTY0MTc1NV5BMl5BanBnXkFtZTcwMDQwNjA2NQ@@._V1_SY1000_CR0,0,668,1000_AL_.jpg',
		des: 'The Autobots learn of a Cybertronian spacecraft hidden on the moon...'
	},
	{
		id: 4,
		title: 'The Matrix (1999)',
		img:
			'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_CR0,0,665,1000_AL_.jpg',
		des: 'A computer hacker learns from mysterious...'
	},
	{
		id: 5,
		title: '大话西游之仙履奇緣 (1995)',
		img: '/images/p2455050536.jpg',
		des: '至尊宝（周星驰 饰）被月光宝盒带回到五百年前，遇见紫霞仙子...'
	},
	{
		id: 6,
		title: 'The Godfather (1972)',
		img:
			'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,704,1000_AL_.jpg',
		des: 'All crime dynasties that came after The Godfather...'
	},
	{
		id: 7,
		title: '花樣年華 (2000)',
		img: '/images/p546867151.jpg',
		des: '报馆编辑周慕云（梁朝伟 饰）与太太搬进一间住户多是上海人的公寓...'
	},
	{
		id: 8,
		title: 'The Lord of the Rings (2003)',
		img:
			'https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,675,1000_AL_.jpg',
		des: 'Gandalf and Aragorn lead the World of Men against Saurons army to draw gaze from Frodo...'
	},
	{
		id: 9,
		title: 'Pulp Fiction (1994)',
		img:
			'https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_CR0,0,686,1000_AL_.jpg',
		des: 'The lives of two mob hitmen, a boxer, ....'
	},
	{
		id: 10,
		title: 'WALL·E (2008)',
		img:
			'https://m.media-amazon.com/images/M/MV5BMjExMTg5OTU0NF5BMl5BanBnXkFtZTcwMjMxMzMzMw@@._V1_SY1000_CR0,0,674,1000_AL_.jpg',
		des: 'In the distant future, a small waste-collecting robot ...'
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

export { MoviceData, data2, options2,data3, paragraph1, plugins, options, movice };
