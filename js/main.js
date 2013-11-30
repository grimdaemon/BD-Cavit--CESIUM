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

        var t = new Thumbtrack(ellipsoid, 6, 46);
        var elements = t.getPrimitives();
        for(var p in elements) {
            var plot = scene.getPrimitives().add(elements[p]);
            plot.pickable = true;
        }

        //handle click
        var handlerClick = new Cesium.ScreenSpaceEventHandler(scene.getCanvas());
        handlerClick.setInputAction(function (movement) {
            var pickedObject = scene.pick(movement.position);
            if (!Cesium.defined(pickedObject)) return;
            if (!pickedObject.primitive) return;
            if (!pickedObject.primitive.pickable) return;
            var point=points[pickedObject.primitive.pointIndex];
            Popup.open(point.name, point.desc, point["-lon"], point["-lat"]);
            if (pickedObject.primitive.onclick) pickedObject.primitive.onclick(true);

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        
        var points = [];

        // Loading datas
        lib_ajax.get("data/route662.json", function(__data) {
            var data = JSON.parse(__data);
            //console.log(data);

            // Adding the points into the scene
            var dataPoints = data.gpx.wpt;
            dataPoints.map(function(point, i) {
                var lat = parseFloat(point["-lat"]),
                    lon = parseFloat(point["-lon"]);

                points.push(Cesium.Cartographic.fromDegrees(lon, lat));
            });
            
            // Defining the extent
            var boundingBox = data.gpx.metadata.bounds;
            var extent = new Cesium.Extent(
                Cesium.Math.toRadians(4.7666),
                Cesium.Math.toRadians(42.3294),
                Cesium.Math.toRadians(8.245),
                Cesium.Math.toRadians(51.0964));
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