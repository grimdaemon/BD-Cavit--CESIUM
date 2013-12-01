<!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
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
  <div class="footer" id="legend">
      <a class="title">Légende</a><br>
      <a class="subtitle">Département:</a>
      <input class="text" type="text" name="dep" value=" Saisir dpt de 01 à 90"><br>
      <a class="subtitle">Type de données:</a><br>
      <ul class="list">
        <li><input type="radio" name="type" checked="checked" value="carrière">Carrière</li>
        <li><input type="radio" name="type" value="ouv militaire">Ouvrage militaire</li>
        <li><input type="radio" name="type" value="souterrain">Souterrain</li>
        <li><input type="radio" name="type" value="ouvrage civil">Ouvrage civil</li>
        <li><input type="radio" name="type" value="galerie">Galerie</li>
        <li><input type="radio" name="type" value="cave">Cave</li>
        <li><input type="radio" name="type" value="puits">Puits</li>
        <li><input type="radio" name="type" value="naturelle">Naturelle</li>
        <li><input type="radio" name="type" value="indéterminé">Indéterminé</li>
      </ul>      
  </div>
</body>
</html>