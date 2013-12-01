var main=function() { //launched when the document is ready
    "use strict"; //use strict javascript    

    var run = function() {
        //open viewer using NASA cool tiles
        var viewer = new Cesium.CesiumWidget('cesiumContainer', {
            imageryProvider : new Cesium.ArcGisMapServerImageryProvider({
                url : 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
                proxy : new Cesium.DefaultProxy('proxy/index.php?url=')
            })
        });

        // Reference to the layers of cesium
        var layers = viewer.centralBody.getImageryLayers();
        var scene = viewer.scene;
        var ellipsoid = viewer.centralBody.getEllipsoid();

        //handle click
        var handlerClick = new Cesium.ScreenSpaceEventHandler(scene.getCanvas());
        handlerClick.setInputAction(function (movement) {
            var pickedObject = scene.pick(movement.position);
            if (!Cesium.defined(pickedObject)) return;
            if (!pickedObject.primitive) return;
            if (!pickedObject.primitive.pickable) return;
            //var point=points[pickedObject.primitive.pointIndex];
            popup.open();
            if (pickedObject.primitive.onclick) pickedObject.primitive.onclick(true);

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        
        //var points = [];

        // Loading datas
        lib_ajax.get("data/01.json", function(__data) {
            var data = JSON.parse(__data);

            // Computing the data
            var dataPoints = data.data;
            htmlInteraction.getElement('loadingText').innerHTML = 'Chargement : 0 / ' + dataPoints.length;
            var i = 0, limit = dataPoints.length, busy = false;
            var process = window.setInterval(function() {
                if(!busy) {
                    busy = true;
                    htmlInteraction.getElement('loadingText').innerHTML = 'Chargement : '+i+' / ' + dataPoints.length;
                    var point = dataPoints[i]; 
                    //console.log(i);
                    var lat = parseFloat(point["x_wgs84"]);
                    var lon = parseFloat(point["y_wgs84"]);
                    //console.log(point["type_cavite"] + " - " + i + " - " + limit);
                    htmlInteraction.getElement("legend_"+point["type_cavite"]).disabled = false;

                    if(point["type_cavite"] == "naturelle") {
                        var t = new Thumbtrack(ellipsoid, lat, lon);
                        var elements = t.getPrimitives();
                        for(var p in elements) {
                            var plot = scene.getPrimitives().add(elements[p]);
                            plot.pickable = true;
                        }
                    }
                    
                    //console.log(i);
                    if(++i >= limit) {
                        window.clearInterval(process);
                        htmlInteraction.getElement('loadingText').innerHTML = '';
                    }
                        
                        
                    busy = false;
                    //console.log(i + " - " + limit);
                }
            }, 100);

            // Defining the extent 
            var extent = new Cesium.Extent(
                Cesium.Math.toRadians(4.7243),
                Cesium.Math.toRadians(43.7281),
                Cesium.Math.toRadians(6.7243),
                Cesium.Math.toRadians(47.7281));
                /*Cesium.Math.toRadians(boundingBox["-minlon"]),
                Cesium.Math.toRadians(boundingBox["-minlat"]),
                Cesium.Math.toRadians(boundingBox["-maxlon"]),
                Cesium.Math.toRadians(boundingBox["-maxlat"]));*/
            var flight = Cesium.CameraFlightPath.createAnimationExtent(scene, 
            {
                destination: extent
            });

            //scene.getPrimitives().add(points);
            scene.getAnimations().add(flight);
        });
    }

    run();
};