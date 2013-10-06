function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

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



var go = function(type) {
	var draw = function () {

		var config = {
			x: document.body.clientWidth / 2,
			y: document.body.clientHeight / 2,
			radius: 30,
			ySpeed: getRandomInt(-5, 5),
			xSpeed: getRandomInt(-5, 5),
			color: getRandomInt(0, 7),
			pi: 2 * Math.PI,
			alpha: 0.3
		};

		if (type === 1) {
			config.radius = 20;
			config.alpha = 1;
		}

		array.push(config);

		c.clearRect(0, 0, document.body.clientWidth, document.body.clientHeight);

		for (var i = 0; i < array.length; i++) {

			config = array[i];

			c.beginPath();
			if (type === 1) {
				c.arc(config.x, config.y, config.radius, 0, config.pi);
			}
			if (type === 2) {
				c.arc(config.x + getRandomInt(-30, 30), config.y + getRandomInt(-30, 30), config.radius, 0, config.pi);
			}
			c.fillStyle = arrayColor[config.color];
			if (config.alpha < 0.8) {
				config.alpha = config.alpha * 1.2;
				c.globalAlpha = config.alpha.toFixed(2)	;
			}
			c.fill();
			config.x = config.x + config.xSpeed;
			config.y = config.y + config.ySpeed;
			if (config.radius > 100) {
				config.radius = config.radius * 1.01;
			} else {
				config.radius = config.radius * 0.99;
			}
		}
	};

	setInterval(draw, 1);
};
