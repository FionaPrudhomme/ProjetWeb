<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <link rel="icon" href="icon/images.ico" />

    <title>Jeu</title>
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css" integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA==" crossorigin=""/>
     </head>
  <body>

  <div class="w3-top">
    <div class="w3-bar w3-white w3-wide w3-padding w3-card">
      <a href="index.html" class="w3-bar-item w3-button"><b>Projet</b> WEB</a>
      <div class="w3-right w3-hide-medium">
        <a href="scores.php" class="w3-bar-item w3-button">Score</a>
      </div>
    </div>
  </div>
 

  
  <div id="mapid"> </div>
  <div id=compteur>
  <span id="minutes"></span>:<span id="seconds"></span>
  </div>
  <div id="inventaire"><h3>Inventaire<h3><div id=img></div></div>

  

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script src="https://unpkg.com/leaflet@1.3.4/dist/leaflet.js" integrity="sha512-nMMmRyTVoLYqjP9hrbed9S+FzjZHW5gY1TWCHA5ckwXZBadntCNs8kEqAWdrb9O7rxbCaA4lKTIWjDXZxflOcA==" crossorigin=""></script>
  <script src="geo.js" ></script>
  
  </body>
</html>