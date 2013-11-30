/*
 * Open a popup with the point of interest title, description and image
 */
var popup=(function() {
    var pop;
    return  {
        open: function(){//name, content, lon, lat){

            pop=document.getElementById("popup");
            pop.style.display="block";

            //title
            var title=document.getElementById("popupTitle");
            title.innerHTML="Coucou";            

            //text
            var text=document.getElementById("popupText");
            var contentHtml="J'aime les chips";//content.replace(/\n/g, "</p>");
            text.innerHTML="<p>"+contentHtml+"</p>";

            //image
            //GoogleStreetView.set_image(lon, lat, "popupImage");
        },

        close: function() {
            pop.style.display="none";
        }
    }
})();
