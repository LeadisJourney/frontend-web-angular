var origin = {
	x: null,
	y: null,
	z: null
};

var destination = {
	x: null,
	y: null,
	z: null
};

var orRot = {
	x: null,
	y: null,
	z: null
};

var destRot = {
	x: null,
	y: null,
	z: null
};

var startTime = null;
var actionTime = null;

function animate(model){
	var percentTimeComp = (Date.now - startTime) / actionTime;
	if (percentTimeComp >= 1){
		model.position.x(destination.x);
		model.position.y(destination.y);
		model.position.z(destination.z);
		model.rotation.x = destRot.x;
		model.rotation.y = destRot.y;
		model.rotation.z = destRot.z;
	}
	else{
		model.position.x += percentTimeComp * (destination.x - origin.x);
		model.position.y += percentTimeComp * (destination.y - origin.y);
		model.position.z += percentTimeComp * (destination.z - origin.z);
		model.rotation.x += percentTimeComp * (destRot.x - orRot.x);
		model.rotation.y += percentTimeComp * (destRot.y - orRot.y);
		model.rotation.z += percentTimeComp * (destRot.z - orRot.z);
	}
}