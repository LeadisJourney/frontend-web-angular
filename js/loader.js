var loader = new THREE.JSONLoader();
var model = null;
var leadisModel = null;
var tileModel = null;
var wallModel = null;
var jewelModel = null;
var rockModel = null;

// Special callback to get a reference to leadis
function addLeadisToScene(geometry, materials){
    console.log("Load Leadis model");
    var material = new THREE.MeshFaceMaterial(materials);
    leadisModel = new THREE.Mesh(geometry, material);
    leadisModel.scale.set(0.2,0.2,0.2);
    leadisModel.position.y += 0.5;
    scene.add(leadisModel);
}

function addJewelToScene(geometry, materials){
    console.log("Load jewel model");
    var material = new THREE.MeshFaceMaterial(materials);
    jewelModel = new THREE.Mesh(geometry, material);
    jewelModel.scale.set(0.5,0.5,0.5);
    jewelModel.position.set(2, 0, 0);
    scene.add(jewelModel);
}

function addRockToScene(geometry, materials){
    console.log("Load rock model");
    var material = new THREE.MeshFaceMaterial(materials);
    rockModel = new THREE.Mesh(geometry, material);
    rockModel.scale.set(0.5,0.5,0.5);
    rockModel.position.set(-2, 0, 0);
    scene.add(rockModel);
}

function addWallToScene(geometry, materials){
    var material = new THREE.MeshFaceMaterial(materials);
    wallModel = new THREE.Mesh(geometry, material);
    wallModel.scale.set(0.5,0.5,0.5);
    scene.add(wallModel);
}

function addTileToScene(geometry, materials){
    var material = new THREE.MeshFaceMaterial(materials);
    tileModel = new THREE.Mesh(geometry, material);
    tileModel.scale.set(0.5,0.5,0.5);
    scene.add(tileModel);
}

// After loading JSON from our file, we add it to the scene
function addModelToScene(geometry, materials) {
    var material = new THREE.MeshFaceMaterial(materials);
    model = new THREE.Mesh(geometry, material);
    model.scale.set(0.5,0.5,0.5);
    scene.add(model);
}

function loadModels(exName){
    console.log("load models");
    exercice = exName;
	switch (exName){
		case 'LaMeilleure':
            console.log("LaMeilleure elements");
			loader.load("models/leadis.json", addLeadisToScene);
			loader.load("models/rock.json", addRockToScene);
			loader.load("models/jewel.json", addJewelToScene);
			break;
		case 'LesMeilleures':
			loader.load("models/leadis.json", addLeadisToScene);
			loader.load("models/rock.json", addRockToScene);
			loader.load("models/jewel.json", addJewelToScene);
			break;
		case 'LaSortie':
			loader.load("models/leadis.json", addLeadisToScene);
			loader.load("models/tile.json", addTileToScene);
			loader.load("models/wall.json", addWallToScene);
			break;
	}
	startAnimTime = Date.now();
	render();
}