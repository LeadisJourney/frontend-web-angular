var renderer = new THREE.WebGLRenderer();
var isRendererOk = false;

function lM_winAnimation() {
    var time = Date.now();
    if (jewelModel && rockModel && leadisModel){
        jewelModel.rotation.y += 0.02;
        rockModel.rotation.y -= 0.02;
        if (time - startAnimTime < 1000){ //Rotate of 90 degrees (1.5 rad) in one second
            leadisModel.rotation.y = 1.5708 / 1000 * (time - startAnimTime);
        }
        else if (time - startAnimTime < 3000){ //Move of two units right in 3 seconds
            leadisModel.position.x += (2 - leadisModel.position.x) * (time - startAnimTime) / 100000;
        }
        else{
            jewelModel.visible = false;
        }
    }
}

function lM_looseAnimation() {
    var time = Date.now();
    if (jewelModel && rockModel && leadisModel){
        jewelModel.rotation.y += 0.02;
        rockModel.rotation.y -= 0.02;
        if (time - startAnimTime < 1000){
            leadisModel.rotation.y = -1.5708 / 1000 * (time - startAnimTime);
        }
        else if (time - startAnimTime < 2000){
            leadisModel.position.x = -2 / 2000 * (time - startAnimTime);
        }
        else{
            rockModel.visible = false;
        }
    }
}

function getDifference(a, b)
{
    var i = 0;
    var j = 0;
    var result = "";
    while (j < b.length)
    {
        if (a[i] != b[j] || i == a.length)
            result += b[j];
        else
            i++;
        j++;
    }
    return result;
}

function  reload () {

    console.info('Removing all children...');
    for (var i = scene.children.length - 1; i >= 0 ; i--) {
        var child = scene.children[ i ];

        if (child !== camera ) { // plane & camera are stored earlier
            scene.remove(child);
        }
    }
    console.info('Reload complete.')
}

 // Render loop to rotate our sphere by a little bit each frame
 var render = function () {
    if (isRendererOk == false)
    {
        // Setup the renderer
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("canvas").appendChild(renderer.domElement);
        isRendererOk = true;
    }
     if (typeof serverDatas != "undefined" && serverDatas != null){
         switch (exercice){
             case "la_meilleure":
                 if (getDifference(serverDatas, "Bravo !") == ""){
                     lM_winAnimation();
                 }
                 else {
                     lM_looseAnimation();
                 }
                 break;
             case "les_meilleures":
                 if (serverDatas[3] == serverDatas[5] && serverDatas[4] == serverDatas[6]){
                     lM_winAnimation();
                 }
                 else {
                     lM_looseAnimation();
                 }
                 break;
             case "LaSortie":
                 break;
             default:
                 break;
         }
     }
     else{
         alert("Don't have any data from server !");
     }
     renderer.render(scene, camera);
     requestAnimationFrame(render);
 };