var JSON3DModel = {

	objList:[
	{
		objName: "Leadis",

 		objVertices: [
			-1.0, 1.0, 1.0, 
			-1.0, -1.0, 1.0,
			1.0, -1.0, 1.0,
			1.0, 1.0, 1.0,
			-1.0, 1.0, -1.0, 
			-1.0, -1.0, -1.0,
			1.0, -1.0, -1.0,
			1.0, 1.0, -1.0],
		
		objNormals: [
			-1.0, 1.0, 1.0, 
			-1.0, -1.0, 1.0,
			1.0, -1.0, 1.0,
			1.0, 1.0, 1.0,
			-1.0, 1.0, -1.0, 
			-1.0, -1.0, -1.0,
			1.0, -1.0, -1.0,
			1.0, 1.0, -1.0
		],

		nbNormal: 8,

		objIndex: [
			0, 1, 2,
			0, 2, 3,
			0, 3, 4,
			3, 4, 7,
			1, 5, 4,
			0, 4, 1,
			3, 7, 2,
			2, 7, 6,
			4, 5, 6,
			6, 4, 7,
			1, 5, 2,
			2, 5, 6],
	
		objOffset: 3,

		objFaces: 12,

		objColors: [
			0.7, 0.7, 0.7, 1.0,
			0.0, 1.0, 0.0, 1.0],

		objColorsIndex: [
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
			1, 1, 1]
	},
	{
		objName: "Tile",

 		objVertices: [
			-1, 0.25, 1,
			-1, -0.25, 1,
			1, -0.25, 1,
			1, 0.25, 1,
			-1, 0.25, -1,
			-1, -0.25, -1,
			1, -0.25, -1,
			1, 0.25, -1],
		
		objNormals: [
			-1, 0.25, 1,
			-1, -0.25, 1,
			1, -0.25, 1,
			1, 0.25, 1,
			-1, 0.25, -1,
			-1, -0.25, -1,
			1, -0.25, -1,
			1, 0.25, -1
		],

		nbNormal: 8,

		objIndex: [
			//Front
			0, 1, 2,
			0, 2, 3,
			//Top
			0, 3, 4,
			3, 4, 7,
			//Left
			1, 5, 4,
			0, 4, 1,
			//Right
			3, 7, 2,
			2, 7, 6,
			//Back
			4, 5, 6,
			6, 4, 7,
			//Bottom
			1, 5, 2,
			2, 5, 6],
	
		objOffset: 3,

		objFaces: 12,

		objColors: [
			0.7, 0.7, 0.7, 1.0,
			0.3, 0.3, 0.3, 1.0],

		objColorsIndex: [
			1, 1, 1,
			1, 1, 1,
			0, 0, 0,
			0, 0, 0,
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
			0, 0, 0,
			0, 0, 0]
	},
	{
		objName: "Wall",

 		objVertices: [
			-1, 1, 1,
			-1, -1, 1,
			1, -1, 1,
			1, 1, 1,
			-1, 1, -1,
			-1, -1, -1,
			1, -1, -1,
			1, 1, -1],

		objNormals: [
			-1, 1, 1,
			-1, -1, 1,
			1, -1, 1,
			1, 1, 1,
			-1, 1, -1,
			-1, -1, -1,
			1, -1, -1,
			1, 1, -1
		],
		
		nbNormal: 8,
		
		objIndex: [
			//Front
			0, 1, 2,
			0, 2, 3,
			//Top
			0, 3, 4,
			3, 4, 7,
			//Left
			1, 5, 4,
			0, 4, 1,
			//Right
			3, 7, 2,
			2, 7, 6,
			//Back
			4, 5, 6,
			6, 4, 7,
			//Bottom
			1, 5, 2,
			2, 5, 6],

		objOffset: 3,

		objFaces: 12,

		objColors: [
			0.7, 0.2, 0.2, 1.0,
			0.3, 0.0, 0.0, 1.0],

		objColorsIndex: [
			1, 1, 1,
			1, 1, 1,
			0, 0, 0,
			0, 0, 0,
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
			1, 1, 1,
			0, 0, 0,
			0, 0, 0]
	},
	{
		objName: "Gem",

		objVertices: [
			0, 1, 0,
			-1, 0, 1,
			1, 0, 1,
			-1, 0, -1,
			1, 0, -1
		],

		objNormals: [
			0, 1, 0,
			-1, 0, 1,
			1, 0, 1,
			-1, 0, -1,
			1, 0, -1
		],

		nbNormal: 5,

		objIndex: [
			0, 1, 2,
			0, 2, 4,
			0, 4, 3,
			0, 3, 1,
			1, 2, 4,
			1, 3, 4
		],

		objOffset: 3,

		objFaces: 6,

		objColors: [
			0.9, 0.9, 0.0, 1.0,
			0.5, 0.5, 0.0, 1.0
		],

		objColorsIndex: [
			1, 1, 1,
			0, 0, 0,
			1, 1, 1,
			0, 0, 0,
			0, 0, 0,
			0, 0, 0
		]
	}]
}

var JSONGameRun = {
	mapX: 10,
	mapZ: 10,

	leadisX: 0,
	leadisY: 0,
	leadisZ: 2,
	leadisMovement: [
		"up", "take", 10, "up", "rt", "rt", "up", "drop", 10, "up", "success"
	],

	elemList: [
		{name: "Wall", id: 1, x: 0, y: 4, visible: true},
		{name: "Wall", id: 2, x: 0, y: 5, visible: true},
		{name: "Wall", id: 3, x: 0, y: 6, visible: true},
		{name: "Wall", id: 4, x: 0, y: 7, visible: true},
		{name: "Wall", id: 5, x: 0, y: 8, visible: true},
		{name: "Wall", id: 6, x: 0, y: 9, visible: true},
		{name: "Wall", id: 7, x: 1, y: 0, visible: true},
		{name: "Wall", id: 8, x: 1, y: 1, visible: true},
		{name: "Wall", id: 9, x: 1, y: 3, visible: true},
		{name: "Gem", id: 10, x: 0, y: 1, visible: true},
		{name: "Gem", id: 11, x: 1, y: 2, visible: true},

	]
}