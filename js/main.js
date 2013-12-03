var main=function() { //launched when the document is ready
    "use strict"; //use strict javascript    
    var viewer;
    var layers;
    var scene;
    var ellipsoid;
    var cursor="default";
    var currentCountry;
    var currentType = "indetermine";
    var points = [];

    var clear = function() {
        scene.getPrimitives().removeAll();
    }

    var pickCountry = function(id) {
        // Loading the bouding box of the country
        lib_ajax.get("data/bbox_dpt_wgs84.json", function(__data) {
            var data = JSON.parse(__data).bbox_dpt_france[id];
            if(data == undefined) {
                alert("Ce département n'existe pas\nPas de données BRGM disponibles pour les départements suivants :\n\n\n75, 92, 93, 94\nVeuillez vous renseigner auprès de l'IGC de Paris\n\n78, 91, 95\nVeuillez vous renseigner auprès de l'IGC de Versailles");
                return;
            } 
            currentCountry = id;
            var radios = htmlInteraction.getElementsByName('type');
            for(var i = 0; i < radios.length; ++i) 
                radios[i].disabled = true;            
            
            var extent = new Cesium.Extent(
                Cesium.Math.toRadians(data["long_min"]),
                Cesium.Math.toRadians(data["lat_min"]),
                Cesium.Math.toRadians(data["long_max"]),
                Cesium.Math.toRadians(data["lat_max"]));
            scene.getAnimations().add(
                Cesium.CameraFlightPath.createAnimationExtent(scene, 
                {
                    destination: extent
                })
            );
        });
        loadData(id, true);
    }

    var loadData = function(country, displayErrors) {
        lib_ajax.get("data/"+country+".json", function(__data) {
            var data = JSON.parse(__data);

            points = data.data;

            // Computing the data
            for(var i = 0; i < points.length; ++i) {
                var point = points[i];
                htmlInteraction.getElement("legend_"+point["type_cavite"]).disabled = false;
            }
        });
    }

    var switchType = function(type) {
        var primitives = [];
        for(var i = 0; i < points.length; ++i) {
            var point = points[i];
            var lat = parseFloat(point["x_wgs84"]);
            var lon = parseFloat(point["y_wgs84"]);
            if(point["type_cavite"] == type) 
                primitives.push(new Thumbtrack(ellipsoid, lat, lon));
        }
        
        // Loading the primitives
        clear();
        for(var i = 0; i < primitives.length; ++i) {
            var t = primitives[i];
            var elements = t.getPrimitives();
            for(var p in elements) {
                var plot = scene.getPrimitives().add(elements[p]);
                plot.pickable = true;
                plot.pointIndex = i;
            }
        }

        //handle click
        // TODO: correction?
        var handlerClick = new Cesium.ScreenSpaceEventHandler(scene.getCanvas());
        handlerClick.setInputAction(function (movement) {
            var pickedObject = scene.pick(movement.position);
            if (!Cesium.defined(pickedObject)) return;
            if (!pickedObject.primitive) return;
            if (!pickedObject.primitive.pickable) return;
            var point=points[pickedObject.primitive.pointIndex];
            popup.open(point);
            if (pickedObject.primitive.onclick) pickedObject.primitive.onclick(true);
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }

    var run = function() {
        // Events
        var formCountry = htmlInteraction.getElement("pickCountryForm");
        formCountry.addEventListener('submit', function(event) {
            event.preventDefault();
            pickCountry(htmlInteraction.getElement("countryNumber").value);
            switchType(currentType);
        });

        var radios = htmlInteraction.getElementsByName('type');
        for(var i = 0; i < radios.length; ++i) {
            var radio = radios[i];            
            radio.addEventListener('click', function(event) {
                if(this.checked) {
                    currentType = this.value;
                    switchType(currentType);
                }  
            });
        }

        //open viewer using NASA cool tiles
        viewer = new Cesium.CesiumWidget('cesiumContainer', {
            imageryProvider : new Cesium.ArcGisMapServerImageryProvider({
                url : 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
                proxy : new Cesium.DefaultProxy('proxy/index.php?url=')
            })
        });

        // Reference to the layers of cesium
        layers = viewer.centralBody.getImageryLayers();
        scene = viewer.scene;
        ellipsoid = viewer.centralBody.getEllipsoid();

        // Loading the bouding box of the france
        lib_ajax.get("data/bbox_france_wgs84.json", function(__data) {
            var data = JSON.parse(__data).bbox_france;
            var extent = new Cesium.Extent(
                Cesium.Math.toRadians(data["long_min"]),
                Cesium.Math.toRadians(data["lat_min"]),
                Cesium.Math.toRadians(data["long_max"]),
                Cesium.Math.toRadians(data["lat_max"]));
            scene.getAnimations().add(
                Cesium.CameraFlightPath.createAnimationExtent(scene, 
                {
                    destination: extent
                })
            );
        });       
    }
    run();
};