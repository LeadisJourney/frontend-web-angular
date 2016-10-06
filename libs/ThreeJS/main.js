window.onload = function (){


var container, father, stats;

var camera, scene, renderer;

var controls;

var cube, plane;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function webglAvailable() {
		try {
			var canvas = document.createElement( 'canvas' );
			return !!( window.WebGLRenderingContext && (
				canvas.getContext( 'webgl' ) ||
				canvas.getContext( 'experimental-webgl' ) )
			);
		} catch ( e ) {
			return false;
		}
	}

function drawMap(){
	for (var count = 1; count <= 100; count++) {
		var geometry = new THREE.BoxGeometry(100, 10, 100);

		for (var i = 0; i < geometry.faces.length; i += 2) {

			var hex = Math.random() * 0xffffff;
			geometry.faces[ i ].color.setHex(hex);
			geometry.faces[ i + 1 ].color.setHex(hex);

		}

		var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, overdraw: 0.5 });

		cube = new THREE.Mesh(geometry, material);
		cube.position.y = 100;
		cube.position.x = count % 10 * 100;
		cube.position.z = -(Math.floor(count / 11) * 100);
		console.log(cube.position.x, cube.position.y, cube.position.z);
		scene.add(cube);
	}
}

function drawLeadis() {
	var geometry = new THREE.BoxGeometry(100, 200, 100);

	for (var i = 0; i < geometry.faces.length; i += 2) {

		var hex = Math.random() * 0xffffff;
		geometry.faces[ i ].color.setHex(hex);
		geometry.faces[ i + 1 ].color.setHex(hex);

	}

	var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, overdraw: 0.5 });

	cube = new THREE.Mesh(geometry, material);
	cube.position.y = 250;
	scene.add(cube);

}

function drawLeadisShadow(){
	var geometry = new THREE.PlaneBufferGeometry(100, 100);
	geometry.rotateX(- Math.PI / 2);

	var material = new THREE.MeshBasicMaterial({ color: 0xe0e0e0, overdraw: 0.5 });

	plane = new THREE.Mesh(geometry, material);
	plane.position.y = 107;
	scene.add(plane);

}

function init() {
	//container = document.createElement('div');
	container = document.getElementById("canvas");
	//father.appendChild(container);

	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 100000);
	camera.position.y = 500;
	camera.position.z = 700;
	controls = new THREE.OrbitControls( camera );
	controls.addEventListener( 'change', render );

	scene = new THREE.Scene();

	// Map
	drawMap();

	// Cube
	drawLeadis();

	// Plane
	drawLeadisShadow();

	if ( webglAvailable() ) {
		renderer = new THREE.WebGLRenderer();
		console.log("renderer webGL");
	} else {
		renderer = new THREE.CanvasRenderer();
		console.log("renderer canvas");
	}
	renderer.setClearColor(0xf0f0f0);
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	//stats = new Stats();
	//container.appendChild(stats.dom);

	document.addEventListener('mousedown', onDocumentMouseDown, false);
	document.addEventListener('touchstart', onDocumentTouchStart, false);
	document.addEventListener('touchmove', onDocumentTouchMove, false);
	
	window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

//
function onDocumentMouseDown(event) {
	event.preventDefault();
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('mouseup', onDocumentMouseUp, false);
	document.addEventListener('mouseout', onDocumentMouseOut, false);
	mouseXOnMouseDown = event.clientX - windowHalfX;
	targetRotationOnMouseDown = targetRotation;
}

function onDocumentMouseMove(event) {
	mouseX = event.clientX - windowHalfX;
	targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.02;
}

function onDocumentMouseUp(event) {
	document.removeEventListener('mousemove', onDocumentMouseMove, false);
	document.removeEventListener('mouseup', onDocumentMouseUp, false);
	document.removeEventListener('mouseout', onDocumentMouseOut, false );
}

function onDocumentMouseOut( event ) {
	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentTouchStart(event) {
	if (event.touches.length === 1) {
		event.preventDefault();
		mouseXOnMouseDown = event.touches[0].pageX - windowHalfX;
		targetRotationOnMouseDown = targetRotation;
	}
}

function onDocumentTouchMove(event) {
	if (event.touches.length === 1) {
		event.preventDefault();
		mouseX = event.touches[0].pageX - windowHalfX;
		targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.05;
	}
}
//

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	//stats.begin();
	render();
	//stats.end();
}

function render() {
	plane.rotation.y = cube.rotation.y += (targetRotation - cube.rotation.y) * 0.05;
	renderer.render(scene, camera);
}
}