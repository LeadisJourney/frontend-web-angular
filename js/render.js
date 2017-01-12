var renderer = new THREE.WebGLRenderer();
var isRendererOk = false;

function lM_winAnimation() {
    var time = Date.now();
    jewelModel.rotation.y += 0.02;
    rockModel.rotation.y -= 0.02;
    if (time - startAnimTime < 1000){ //Rotate of 90 degrees (1.5 rad) in one second
        leadisModel.rotation.y = 1.5708 / 1000 * (time - startAnimTime);
    }
    else if (time - startAnimTime < 3000){ //Move of two units right in 3 seconds
        console.log(leadisModel.position.x, time - startAnimTime);
        leadisModel.position.x += (2 - leadisModel.position.x) * (time - startAnimTime) / 100000;
    }
    else{
        jewelModel.visible = false;
    }
}

function lM_looseAnimation() {
    var time = date.now();
    jewelModel.rotation.y += 0.02;
    rockModel.rotation.y -= 0.02;
    if (time - startAnimTime < 1000){
        leadisModel.rotation.y = -1.5708 / 1000 * (time - startAnimTime);
    }
    else if (time - startAnimTime < 2000){
        leadisModel.position.x = -2 / 2000 * (time - startAnimTime);
    }
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

    requestAnimationFrame(render);
     if (typeof serverDatas != undefined && serverDatas != null){
         switch (exercice){
             case "LaMeilleure":
                 if (serverDatas[3] == serverDatas[4]){
                     lM_winAnimation();
                 }
                 else {
                     lM_looseAnimation();
                 }
                 break;
             case "LesMeilleures":
                 if (serverDatas[3] == serverDatas[5] && serverDatas[4] == serverDatas[6]){
                     lsM_winAnimation();
                 }
                 else {
                     lsM_looseAnimation();
                 }
                 break;
             case "LaSortie":
                 break;
         }
     }
     else{
         alert("Don't have any data from server !");
     }
     renderer.render(scene, camera);
 };