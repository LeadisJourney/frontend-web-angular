var gl;
var lastTime = 0;
var backR = 0.0;
var backG = 0.0;
var backB = 0.0;

var trObj = {
	x: 0,
	y: 0,
	z: 0
};

var map = {};
var g_leadis = {};
var g_elem = [];

var turn = 0;

function getMapSpec()
{
	map.x = JSONGameRun.mapX;
	map.z = JSONGameRun.mapZ;
}

function getElemSpec() {
	g_elem = JSONGameRun.elemList;
}

function getLeadisSpec()
{
	g_leadis.specGot = true;
	g_leadis.x = JSONGameRun.leadisX;
	g_leadis.y = JSONGameRun.leadisY;
	g_leadis.z = JSONGameRun.leadisZ;
	g_leadis.movement = JSONGameRun.leadisMovement;
	g_leadis.moveIterator = 0;
}

function drawMap() {
	getMapSpec();

    var tile = getObject("Tile");
    if (tile != null){
    	for (var i = 0; i < map.x; i++) {
    		for (var j = 0; j < map.z; j++) {
    			mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
    			mat4.identity(mvMatrix);

    			mat4.translate(mvMatrix, [/*(-map.x / 2) +*/ -9 + i * 2, /*(-map.z / 2) +*/ -8 + j * 2, -50]);
    			//mat4.translate(mvMatrix, [0.0, 0.0, -50]);

    			mvPushMatrix();
    			mat4.rotate(mvMatrix, degToRad(90), [1, 0, 0]);

				gl.bindBuffer(gl.ARRAY_BUFFER, tile.vertexPositionBuffer);
    			gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, tile.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    			gl.bindBuffer(gl.ARRAY_BUFFER, tile.vertexColorBuffer);
    			gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, tile.vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    			setMatrixUniforms();
    			gl.drawArrays(gl.TRIANGLES, 0, tile.vertexPositionBuffer.numItems);

    			mvPopMatrix();
    		}
    	}
    }
    else {
    	alert("Can't find Tile 3D model !");
    }	
}

function drawElem() {
	if (!g_elem[0])
	{
		getElemSpec();
	}

	for (var i = 0; i < g_elem.length; i++) {
    	var elem = getObject(g_elem[i].name);
    	if (elem != null && g_elem[i].visible == true) {
    		mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
    		mat4.identity(mvMatrix);

    		mat4.translate(mvMatrix, [-9 + g_elem[i].x * 2, -8 + g_elem[i].y * 2, -50]);

    		mvPushMatrix();
    		mat4.rotate(mvMatrix, degToRad(90), [1, 0, 0]);

			gl.bindBuffer(gl.ARRAY_BUFFER, elem.vertexPositionBuffer);
    		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, elem.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    		gl.bindBuffer(gl.ARRAY_BUFFER, elem.vertexColorBuffer);
    		gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, elem.vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    		setMatrixUniforms();
    		gl.drawArrays(gl.TRIANGLES, 0, elem.vertexPositionBuffer.numItems);

    		mvPopMatrix();
    	}
	}
}

function updateLeadisPosition() {
	if (g_leadis.moveIterator < g_leadis.movement.length){
		switch (g_leadis.movement[g_leadis.moveIterator]) {
			case "up":
				trObj.y = 1;
				break;
			case "dn":
				trObj.y = -1;
				break;
			case "fw":
				trObj.z = 1;
				break;
			case "bw":
				trObj.z = -1;
				break;
			case "rt":
				trObj.x = 1;
				break;
			case "lf":
				trObj.x = -1;
				break;
			case "fup":
				trObj.z = 1;
				trObj.y = 1;
				break;
			case "fdn":
				trObj.z = 1;
				trObj.y = -1;
			case "rup":
				trObj.x = 1;
				trObj.y = 1;
				break;
			case "rdn":
				trObj.x = 1;
				trObj.y = -1;
			case "lup":
				trObj.x = -1;
				trObj.y = 1;
				break;
			case "ldn":
				trObj.x = -1;
				trObj.y = -1;
				break;
			case "bup":
				trObj.z = -1;
				trObj.y = 1;
				break;
			case "bdn":
				trObj.z = -1;
				trObj.y = -1;
				break;
			case "success":
				backR = 0.3;
				backG = 0.8;
				backB = 0.3;
				break;
			case "fail":
				backR = 0.6;
				backG = 0.1;
				backB = 0.1;
				break;
			case "take":
				g_leadis.moveIterator++;
				makeInvisible(g_leadis.movement[g_leadis.moveIterator]);
				break;
			case "drop":
				g_leadis.moveIterator++;
				makeVisible(g_leadis.movement[g_leadis.moveIterator]);
			default:
				break;
		}
	}
}

function drawLeadis() {
	if (!g_leadis.specGot){
		getLeadisSpec();
	}

	var leadis = getObject("Leadis");
	if (leadis != null){
		mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
		mat4.identity(mvMatrix);

		mat4.translate(mvMatrix, [/*(-map.x / 2) +*/ -9 + g_leadis.x, -8 + g_leadis.y, -50]);

		mvPushMatrix();
		mat4.rotate(mvMatrix, degToRad(90), [1, 0, 0]);

		gl.bindBuffer(gl.ARRAY_BUFFER, leadis.vertexPositionBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, leadis.vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

		gl.bindBuffer(gl.ARRAY_BUFFER, leadis.vertexColorBuffer);
		gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, leadis.vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

		setMatrixUniforms();
		gl.drawArrays(gl.TRIANGLES, 0, leadis.vertexPositionBuffer.numItems);

		mvPopMatrix();
	}
	else {
		console.log("Leadis = null !");
	}
}

function drawScene() {

	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.clearColor(backR, backG, backB, 1.0);

	drawMap();
	drawElem();
	drawLeadis();

    /*for (var i = 0; i < g_Objects.length; i++) {
    	mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);

    	mat4.identity(mvMatrix);

    	mat4.translate(mvMatrix, [-1.5, 0.0, -8.0]);

    	mvPushMatrix();
    	mat4.rotate(mvMatrix, degToRad(rPyramid), [0, 1, 0]);

    	gl.bindBuffer(gl.ARRAY_BUFFER, g_Objects[i].vertexPositionBuffer);
    	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, g_Objects[i].vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);

    	gl.bindBuffer(gl.ARRAY_BUFFER, g_Objects[i].vertexColorBuffer);
    	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, g_Objects[i].vertexColorBuffer.itemSize, gl.FLOAT, false, 0, 0);

    	setMatrixUniforms();
    	gl.drawArrays(gl.TRIANGLES, 0, g_Objects[i].vertexPositionBuffer.numItems);

    	mvPopMatrix();
    }*/
}

function initGL(canvas) {
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) {
    	alert("Error initGL");
    }
    if (!gl) {
    	alert("Could not initialise WebGL, sorry :-(");
    }
}

function animate() {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
        var elapsed = timeNow - lastTime;

		updateLeadisPosition();
		g_leadis.x += (trObj.x * elapsed) / 1000.0;
		g_leadis.y += (trObj.y * elapsed) / 1000.0;
		g_leadis.z += (trObj.z * elapsed) / 1000.0;
    }
    lastTime = timeNow;
}

function tick() {
	if (turn % 120 == 0){
		g_leadis.moveIterator += 1;
		trObj.x = 0;
		trObj.y = 0;
		trObj.z = 0;
	}

    requestAnimFrame(tick);
    drawScene();
    animate();

	turn += 1;
}

function webGLStart() {
    var canvas = document.getElementById("lesson04-canvas");

    initGL(canvas);
    initShaders();
    initBuffers();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    tick();
}