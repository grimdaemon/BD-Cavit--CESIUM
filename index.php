<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bd Cavite - Cesium</title>
  <script type="text/javascript" src="cesium/Build/Cesium/Cesium.js"></script>
  <script type="text/javascript" src="js/script.php"></script>

  <link rel="stylesheet" type="text/css" href="css/style.css"/>
  <style>
      @import url(cesium/Build/Cesium/Widgets/CesiumWidget/CesiumWidget.css);

      #cesiumContainer {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          margin: 0;
          overflow: hidden;
          padding: 0;
          font-family: sans-serif;
      }

      body {
          padding: 0;
          margin: 0;
          overflow: hidden;
      }
  </style>
</head>
<body onload="main()">
  <!-- CESIUM VIEW //-->
  <div id="cesiumContainer"></div>
  <div class="popup" id="popup">
      <button class="close" onclick="popup.close()">X</button>
      <div class="title" style="display:block" id="popupTitle"></div>
      <div class="text" id="popupText"></div>      
  </div>
</body>
</html>