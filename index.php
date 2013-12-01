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
    <button class="button" onclick="popup.close()">X</button>
    <div class="title" style="display:block" id="popupTitle"></div>
    <div id="popupText"></div>      
  </div>
  <div id="loading">
    <div class="text" id="loadingText">Chargement : 0 / ?</div>      
  </div>
  <div class="footer" id="legend">
      <h3>Légende</h3>
      <form id="pickCountryForm">
        <label for="dep">Département : </label><input id="countryNumber" class="text" type="text" name="dep" placeholder="01 à 90"/>
        <input type="submit" class="button" value="Ok"/>
      </form>
      <p>Type de données :</p>
      <ul class="list">
        <li><input id="legend_carriere" disabled="true" type="radio" name="type" value="carrière">Carrière</li>
        <li><input id="legend_ouv_militaire" disabled="true" type="radio" name="type" value="ouv militaire">Ouvrage militaire</li>
        <li><input id="legend_souterrain" disabled="true" type="radio" name="type" value="souterrain">Souterrain</li>
        <li><input id="legend_ouvrage_civil" id="legend_carriere" disabled="true" type="radio" name="type" value="ouvrage civil">Ouvrage civil</li>
        <li><input id="legend_galerie" disabled="true" type="radio" name="type" value="galerie">Galerie</li>
        <li><input id="legend_cave" disabled="true" type="radio" name="type" value="cave">Cave</li>
        <li><input id="legend_puits" disabled="true" type="radio" name="type" value="puits">Puits</li>
        <li><input id="legend_naturelle" disabled="true" type="radio" name="type" value="naturelle">Naturelle</li>
        <li><input id="legend_indetermine" disabled="true" type="radio" name="type" checked="checked" value="indéterminé">Indéterminé</li>
      </ul>        
  </div>
</body>
</html>