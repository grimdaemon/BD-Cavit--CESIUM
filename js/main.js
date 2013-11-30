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

        var t = new Thumbtrack(ellipsoid);
        scene.getPrimitives().add(new Cesium.Primitive({
            geometryInstances: t.getElements(),
            appearance: new Cesium.EllipsoidSurfaceAppearance({
                material : Cesium.Material.fromType('Stripe')
            })
        }));
        var points = [];

        // 1. Draw a translucent ellipse on the surface with a checkerboard pattern
        var instance = new Cesium.GeometryInstance({
          geometry : new Cesium.EllipseGeometry({
              ellipsoid : ellipsoid,
              center : ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-100, 20)),
              semiMinorAxis : 500000.0,
              semiMajorAxis : 1000000.0,
              rotation : Cesium.Math.PI_OVER_FOUR
          }),
          id : 'object returned when this instance is picked and to get/set per-instance attributes'
        });
        var primitive = new Cesium.Primitive({
          geometryInstances : instance,
          appearance : new Cesium.EllipsoidSurfaceAppearance({
            material : Cesium.Material.fromType('Checkerboard')
          })
        });
        scene.getPrimitives().add(primitive);

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
                Cesium.Math.toRadians(boundingBox["-minlon"]),
                Cesium.Math.toRadians(boundingBox["-minlat"]),
                Cesium.Math.toRadians(boundingBox["-maxlon"]),
                Cesium.Math.toRadians(boundingBox["-maxlat"]));
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