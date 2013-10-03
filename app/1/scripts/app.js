function getRandomRange(min, max) {
	return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
$(function () {
	var canvas = document.getElementById('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var c = canvas.getContext('2d');

	var array = [];

	var arrayColor = [
		'green',
		'#00FFF4',
		'#0099FF',
		'#CCFF33',
		'#CC0066',
		'#6600FF',
		'#FFFF00',
		'#fff'
	];


	setInterval(draw, 1);

	function draw() {

		var config = {
			x: document.body.clientWidth / 2,
			y: document.body.clientHeight / 2,
			radius: 5,
			ySpeed: getRandomRange(-5, 5),
			xSpeed: getRandomRange(-5, 5),
			color: getRandomInt(0, 7),
			pi: 2 * Math.PI,
			alpha: 1
		};

		array.push(config);

		c.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);

		for (var i = 0; i < array.length; i++) {

			config = array[i];

			c.beginPath();
			c.arc(config.x, config.y, config.radius, 0, config.pi);
			c.fillStyle = arrayColor[config.color];
//			c.globalAlpha = config.alpha * 0.8;
//			console.log(c.globalAlpha);
			c.fill();
			config.x = config.x + config.xSpeed;
			config.y = config.y + config.ySpeed;
			config.radius = config.radius * 0.99;
		}
	}
});