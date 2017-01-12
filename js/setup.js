var exercice = "";
var serverDatas = {};
var startAnimTime = null;
// Setup a new scene
var scene = new THREE.Scene();

// Setup the camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 5;
camera.position.y = 3;
camera.up = new THREE.Vector3(0,0,0);
camera.lookAt(0, 0, 0);
console.log(camera.up);

// Add the lights
var ambientLight = new THREE.AmbientLight(0x111111);
scene.add(ambientLight);
var light = new THREE.PointLight( 0xFFFFDD );
light.position.set( -15, 10, 15 );
scene.add( light );

