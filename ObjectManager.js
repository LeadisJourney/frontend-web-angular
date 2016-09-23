/*var pyramidVertexPositionBuffer;
var pyramidVertexColorBuffer;*/
var cubeVertexPositionBuffer;
var cubeVertexColorBuffer;
var cubeVertexIndexBuffer;

var g_Objects = [];

function getModel() {
    //3DObjects.push(JSON.parse(JSON3DModel));
    for (var i = 0; i < JSON3DModel.objList.length; i++) {
        g_Objects.push(JSON3DModel.objList[i]);
    }
}

function getObject(objectName) {
    for (var i = 0; i < g_Objects.length; i++) {
        if (g_Objects[i].objName == objectName)
            return (g_Objects[i])
    }
    return (null);
}

function makeInvisible(objId){
    for (var i = 0; i < g_elem.length; i++) {
        if (g_elem[i].id == objId)
        {
            g_elem[i].visible = false;
        }
    }
}

function makeVisible(objId){
    for (var i = 0; i < g_elem.length; i++) {
        if (g_elem[i].id == objId)
        {
            g_elem[i].x = g_leadis.x / 2;
            g_elem[i].y = g_leadis.y / 2;
            g_elem[i].visible = true;
        }
    }
}

function initBuffers() {
    getModel();
    for (var i = 0; i < g_Objects.length; i++) {
        g_Objects[i].vertexPositionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, g_Objects[i].vertexPositionBuffer);

        g_Objects[i].vertices = [];
        for (var j = 0; j < g_Objects[i].objIndex.length; j++) {
            for (var k = 0; k < g_Objects[i].objOffset; k++) {
                g_Objects[i].vertices.push(g_Objects[i].objVertices[g_Objects[i].objIndex[j] * g_Objects[i].objOffset + k]);
            }
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(g_Objects[i].vertices), gl.STATIC_DRAW);
        g_Objects[i].vertexPositionBuffer.itemSize = g_Objects[i].objOffset;
        g_Objects[i].vertexPositionBuffer.numItems = g_Objects[i].objOffset * g_Objects[i].objFaces;


        g_Objects[i].vertexColorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, g_Objects[i].vertexColorBuffer);

        g_Objects[i].colors = [];
        for (var j = 0; j < g_Objects[i].objColorsIndex.length; j++) {
            g_Objects[i].colors.push(g_Objects[i].objColors[g_Objects[i].objColorsIndex[j] * 4 + 0]);
            g_Objects[i].colors.push(g_Objects[i].objColors[g_Objects[i].objColorsIndex[j] * 4 + 1]);
            g_Objects[i].colors.push(g_Objects[i].objColors[g_Objects[i].objColorsIndex[j] * 4 + 2]);
            g_Objects[i].colors.push(g_Objects[i].objColors[g_Objects[i].objColorsIndex[j] * 4 + 3]);
        }
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(g_Objects[i].colors), gl.STATIC_DRAW);
        g_Objects[i].vertexColorBuffer.itemSize = 4;
        g_Objects[i].vertexColorBuffer.numItems = g_Objects[i].objOffset * g_Objects[i].objFaces;
    }
}