var main=function() { //launched when the document is ready
    "use strict"; //use strict javascript    

    //open viewer using NASA cool tiles
    var viewer = new Cesium.CesiumWidget('cesiumContainer', {
        imageryProvider : new Cesium.ArcGisMapServerImageryProvider({
            url : 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
            proxy : new Cesium.DefaultProxy('proxy/index.php?url=')
        })
    });
};