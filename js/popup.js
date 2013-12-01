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
            if(point["nom_cavite"] == "?"){
                title.innerHTML=point["type_cavite"];
            }
            else if(point["nom_cavite"] == ""){
                title.innerHTML=point["type_cavite"];
            }
            else{
                title.innerHTML=point["nom_cavite"];
            }

            //text
            var text=document.getElementById("popupText");
            text.innerHTML="<div class=\"text\"><a>Informations de la Cavité :</a></div><ul>"+popup.readData(point)+"</ul><br>"+popup.readInfos(point)+".</div>";

        },

        readData: function(point){
            var contentHtml = "";
            var labels ={
                "type_cavite" : "Type de cavité : ",
                "statut" : "Statut : ",
                "departement" : "Département : ",
                "commune_origine" : "Commune d'origine : ",
                "commune_actuelle" : "Commune Actuelle : ",
                "reperage" : "Repérage : ",
                "x_wgs84" : "Longitude : ",
                "y_wgs84" : "Latitude : ",
                "precision" : "Précision : ",
                "positionnement" : "Positionnement : ",
                "dangerosite" : "Dangerosité : ",
                "cavites_associees" : "Cavités Associées : ",
                "commentaire" : "Commentaire : "
            };
            for(var e in point) {
                if(labels[e] != undefined){
                    if(point[e] != ""){
                        if(point[e] != "?"){
                            contentHtml += "<li>"+labels[e]+point[e]+"</li>";
                        }
                    }
                }
            }
            return contentHtml;
        },

        readInfos: function(point){
            var contentHtml = "<div class=\"infos\">";
            var labels ={
                "src" : "Source : ",
                "insee" : "INSEE : ",
                "id" : "Identifiant : ",
                "archivage" : "Archivage : ",
                "date" : "Date : ",
                "auteur" : "Auteur : ",
                "organisme" : "Organisme : "
            };
            for(var e in point) {
                if(labels[e] != undefined){
                    if(point[e] != ""){
                        if(point[e] != "?"){
                            contentHtml += labels[e]+point[e]+", ";
                        }
                    }
                }
            }
            return contentHtml.substring(0 , contentHtml.length-2);
        },

        close: function() {
            pop.style.display="none";
        }
    }
})();
