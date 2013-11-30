<?php
/*
 * PHP custom proxy : avoid CORS policy problems
 *
 */
//list of allowed domains
$ALLOWED=Array("http://server.arcgisonline.com", "http://cesium.agi.com/blackmarble");

//get URL to display
$URL=$_GET["url"];
$URL=ltrim ($URL, "?");

//security
$allowed=false;
foreach ($ALLOWED as $allowedUrl) {
    if (strpos($URL, $allowedUrl) === 0){
        $allowed=true;
        break;
    }
}

if (!$allowed) exit("Security error : this URL is not allowed");

//send content to the browser
$contentType=(substr($URL, -4)=="json")?"application/json":"image/png";
header("Content-type: $contentType");
readfile($URL);
?>