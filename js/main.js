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
            var boundingBox = [90, 0, 180, -180];

            //console.log(data);

            // Adding the points into the scene
            var dataPoints = data.data;
            dataPoints.map(function(point, i) {
                var lat = parseFloat(point["x_wgs84"]);
                var lon = parseFloat(point["y_wgs84"]);
                if(lat < boundingBox[0])
                    boundingBox[0] = lat;
                if(lat > boundingBox[1])
                    boundingBox[1] = lat;
                if(lon < boundingBox[2])
                    boundingBox[2] = lon;
                if(lon > boundingBox[3])
                    boundingBox[3] = lon;
                if(point["type_cavite"] == "naturelle") {

                    var t = new Thumbtrack(ellipsoid, lat, lon);
                    var elements = t.getPrimitives();
                    for(var p in elements) {
                        var plot = scene.getPrimitives().add(elements[p]);
                        plot.pickable = true;
                    }
                }
                //points.push(Cesium.Cartographic.fromDegrees(lon, lat));
            });
            
            // Defining the extent
            console.log(boundingBox);
            var extent = new Cesium.Extent(
                Cesium.Math.toRadians(boundingBox[0]),
                Cesium.Math.toRadians(boundingBox[2]),
                Cesium.Math.toRadians(boundingBox[1]),
                Cesium.Math.toRadians(boundingBox[3]));
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