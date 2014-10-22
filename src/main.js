(function(win) {
	var target = document.getElementById("main-coordinate");
	var width = win.innerWidth;
	var height = win.innerHeight;

	//为了让坐标系是正方形，选择最小边.
	if (width > height) {
		width = height;
	} else {
		height = width;
	}
	target.setAttribute("width", width);
	target.setAttribute("height", height);

	var ctx = target.getContext("2d");
	var coordinateWidth = width * 0.8;
	var coordinateHeight = height * 0.8;

	var Point = function(x, y) {
		this.x = x;
		this.y = y;
	}

	var leftPoint = new Point(width / 10, height / 2),
		topPoint = new Point(width / 2, height / 10),
		rightPoint = new Point(width * 0.9, height / 2),
		bottomPoint = new Point(width / 2, height * 0.9);

	var minValue = -10,
		maxValue = 10;

	var xOne = coordinateWidth / (maxValue * 2);
	var yOne = coordinateHeight / (maxValue * 2);

	var originPoint = new Point(width / 2, height / 2);

	function redrawCoorinate(){
		//clear all.
		ctx.clearRect(0, 0 , width, height);
		//set style
		ctx.lineWidth = 1;
		ctx.strokeStyle = "#000";
		//darw coordinate x
		ctx.beginPath();
		ctx.moveTo(leftPoint.x, leftPoint.y);
		ctx.lineTo(rightPoint.x, rightPoint.y);
		for (var i = 0; i <= maxValue * 2; i++) {
			var xnumPointLeft = leftPoint.x + i * xOne;
			ctx.moveTo(xnumPointLeft, leftPoint.y);
			ctx.lineTo(xnumPointLeft, leftPoint.y - 4);

			ctx.fillText(minValue + i, xnumPointLeft - 5, leftPoint.y + 14);

		}
		ctx.closePath();
		ctx.stroke();

		//darw coordnate y
		ctx.beginPath();
		ctx.moveTo(topPoint.x, topPoint.y);
		ctx.lineTo(bottomPoint.x, bottomPoint.y);
		for (var i = 0; i <= maxValue * 2; i++) {
			var ynumPointTop = topPoint.y + i * yOne;
			ctx.moveTo(topPoint.x, ynumPointTop);
			ctx.lineTo(topPoint.x + 4, ynumPointTop);
			if ((maxValue - i) != 0) {
				ctx.fillText(maxValue - i, topPoint.x - 18, ynumPointTop + 5);
			}
		}
		ctx.closePath();
		ctx.stroke();
	}

	function toggle(x, y) {
		return [originPoint.x + x * xOne, originPoint.y - y * yOne];
	}

	win.draw = function ( func ) {
		//
		redrawCoorinate();

		ctx.strokeStyle = "rgb(255, 0 , 255)";
		var hasFirstPoint = false;
		for (var i = minValue; i <= maxValue; i += .01) {
			var x = i,
				y = func(i);
			var xponit = toggle(x, y);
			if (!hasFirstPoint) {
				hasFirstPoint = true;
				ctx.moveTo(xponit[0], xponit[1]);
			} else {
				ctx.lineTo(xponit[0], xponit[1]);
			}
		}
		ctx.stroke();
	};
	draw(function (k) {
		return Math.PI / k;
	});

})(this);