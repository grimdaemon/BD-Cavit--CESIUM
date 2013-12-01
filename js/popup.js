/*
 * Open a popup with the point of interest title, description and image
 */
var popup=(function() {
    var pop;
    return  {
        open: function(point){

            pop=document.getElementById("popup");
            pop.style.display="block";

            //title
            var title=document.getElementById("popupTitle");
            title.innerHTML=point["nom_cavite"];            

            //text
            var text=document.getElementById("popupText");
            var contentHtml="<li>Type de Cavité : "+point["type_cavite"]+"</li><li>Statut de la Cavité : "+point["statut"]+"</li><li>Département : "+point["departement"]+"</li><li>Commune d'origine : "+point["commune_origine"]+"</li><li>Commune actuelle : "+point["commune_actuelle"]+"</li><li>Repérage : "+point["reperage"]+"</li><li>Longitude : "+point["x_wgs84"]+"</li><li>Latitude : "+point["y_wgs84"]+"</li><li>Précision : "+point["precision"]+"</li><li>Positionnement : "+point["positionnement"]+"</li><li>Dangerosité : "+point["dangerosite"]+"</li><li>Cavités Associées : "+point["cavites_associees"]+"</li><li>Commentaires : "+point["commentaire"]+"</li>";
            text.innerHTML="<div class=\"text\"><a>Informations de la Cavité :</a></div><ul>"+contentHtml+"</ul><br><div class=\"infos\"> Source : "+point["src"]+", INSEE : "+point["insee"]+", Identifiant : "+point["id"]+", Archivage : "+point["archivage"]+", Date : "+point["date"]+", Auteur : "+point["auteur"]+", Organisme : "+point["organisme"]+"</div>";

        },

        close: function() {
            pop.style.display="none";
        }
    }
})();
