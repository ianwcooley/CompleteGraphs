//*
//* Algorithm
//*

var svg = d3.select("svg");
var radius = 200;
var numberOfNodes = Math.floor(Math.random()*12 + 3);
drawGraph(svg, radius, numberOfNodes);

$("input").on("keypress", function(e) {
	if (!e) e = window.event;
	var keyCode = e.which || e.keyCode;
  if (keyCode == '13'){
  	// Enter pressed
  	var val = Number($(this).val());
		if (val > 25 || val === 0 || val === numberOfNodes) {
			return;
		} else if (val > numberOfNodes) {
			numberOfNodes = val;
			addNodes(svg, radius, numberOfNodes, 200, 1000);
		} else if (val < numberOfNodes) {
			numberOfNodes = val;
			removeNodes(svg, radius, numberOfNodes, 200, 1000);
		}
	}
});

//*
//* Functions
//*

function generateNodes(radius, numberOfNodes) {
	var r = radius, n = numberOfNodes;
	var centerX = r + 30, centerY = r + 30;
	var nodes = [];
	for (var i = 0; i < n; i++) {
		var angle = i * (360 / n) * (Math.PI / 180.0);
		var x = centerX + r * Math.cos(angle);
		var y = centerY + r * Math.sin(angle);
		nodes.push([x, y]);
	}
	return nodes;
}

function generateLines(radius, numberOfNodes) {
	var r = radius, n = numberOfNodes;
	var nodes = generateNodes(r, n);
	var lines = [];
	for (var i = 0; i < n-1; i++) {
		for (var j = i + 1; j < n; j++) {
			var x1 = nodes[i][0];
			var y1 = nodes[i][1];
			var x2 = nodes[j][0];
			var y2 = nodes[j][1];
			lines.push([x1, y1, x2, y2]);
		}
	}
	return lines;
}

function drawGraph(element, radius, numberOfNodes) {
	var nodes = generateNodes(radius, numberOfNodes);
	var lines = generateLines(radius, numberOfNodes);
	
	/* draw svg */
	element
		.attr("width", 2*radius + 60)
		.attr("height", 2*radius + 60)
		.style({
			"background-color": "rgb(25,124,290)",
			"position": "relative",
			"left": "50%",
			"margin-left": -(radius + 30),
			"margin-top": "30px",
			"margin-bottom": "50px"
		});
	/* draw lines */
	element	
		.selectAll("line")
		.data(lines)
		.enter()
		.append("line")
		.attr("x1", function(d) { return d[0]; })
		.attr("y1", function(d) { return d[1]; })
		.attr("x2", function(d) { return d[2]; })
		.attr("y2", function(d) { return d[3]; })
		.attr("stroke", "rgb(190, 190, 190)")
		.attr("stroke-width", "2");	
	
	/* draw nodes */
	element
		.selectAll("circle")
		.data(nodes)
		.enter()
		.append("circle")
		.attr("cx", function(d) { return d[0]; })
		.attr("cy", function(d) { return d[1]; })
		.attr("r", 9)
		.attr("fill", "rgb(190, 190, 190)");
}

function addNodes(element, radius, numberOfNodes, delayTime, durationTime) {
	var nodes = generateNodes(radius, numberOfNodes);
	var lines = generateLines(radius, numberOfNodes);
	
	/* redraw lines */
	element
		.selectAll("line")
		.data(lines)
		.transition()
		.delay(delayTime)
		.duration(durationTime)
		.attr("x1", function(d) { return d[0]; })
		.attr("y1", function(d) { return d[1]; })
		.attr("x2", function(d) { return d[2]; })
		.attr("y2", function(d) { return d[3]; });
	element
		.selectAll("line")
		.data(lines)
		.enter()
		.append("line")
		.attr("stroke-opacity", "0.0")
		.attr("stroke-width", "1")
		.attr("stroke", "rgb(190, 190, 190)")
		.transition()
		.delay(delayTime)
		.duration(durationTime)
		.attr("x1", function(d) { return d[0]; })
		.attr("y1", function(d) { return d[1]; })
		.attr("x2", function(d) { return d[2]; })
		.attr("y2", function(d) { return d[3]; })
		.attr("stroke-opacity", "1.0")
		.attr("stroke-width", "2");
	
	/* redraw nodes */
	element
		.selectAll("circle")
		.data(nodes)
		.transition()
		.delay(delayTime)
		.duration(durationTime)
		.attr("cx", function(d) { return d[0]; })
		.attr("cy", function(d) { return d[1]; })
		.attr("r", 9)
		.attr("fill", "rgb(190, 190, 190)");	
	element
		.selectAll("circle")
		.data(nodes)
		.enter()
		.append("circle")
		.attr("r", 8)
		.attr("fill-opacity", "0.0")
		.attr("fill", "rgb(190, 190, 190)")
		.transition()
		.delay(delayTime)
		.duration(durationTime)
		.attr("cx", function(d) { return d[0]; })
		.attr("cy", function(d) { return d[1]; })
		.attr("r", 9)
		.attr("fill-opacity", "1.0");
}

function removeNodes(element, radius, numberOfNodes, delayTime, durationTime) {
	var nodes = generateNodes(radius, numberOfNodes);
	var lines = generateLines(radius, numberOfNodes);
	
	/* redraw lines */
	element
		.selectAll("line")
		.data(lines)
		.transition()
		.delay(delayTime)
		.duration(durationTime)
		.attr("x1", function(d) { return d[0]; })
		.attr("y1", function(d) { return d[1]; })
		.attr("x2", function(d) { return d[2]; })
		.attr("y2", function(d) { return d[3]; });
	element
		.selectAll("line")
		.data(lines)
		.exit()
		.transition()
		.delay(delayTime)
		.duration(durationTime)	
		.attr("stroke-opacity", "0.0")
		.attr("stroke-width", "1")
		.remove();

	/* redraw nodes */
	element
		.selectAll("circle")
		.data(nodes)
		.transition()
		.delay(delayTime)
		.duration(durationTime)
		.attr("cx", function(d) { return d[0]; })
		.attr("cy", function(d) { return d[1]; });
	element
		.selectAll("circle")
		.data(nodes)
		.exit()
		.transition()
		.delay(delayTime)
		.duration(durationTime)	
		.attr("fill-opacity", "0.0")
		.attr("r", "1")
		.remove();
}
