/*
 * popup.js
 * Open a popup with the point of interest
 * Read the informations of this point and add it in the popup
 */
var popup=(function() {
    var pop;
    return  {
        /*
         * open : this  method create a popup and 
         * insert title, data and informations
         */
        open: function(point){

            /* Get id of the popup and display */
            pop=document.getElementById("popup");
            pop.style.display="block";

            /* Get id of the title and insert the text
             * This test check if the Cavity name exist
             * and if this Cavity hasn't named, display the type
             */
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

            /* Get id of the title and insert Data and Informations of this Cavity*/
            var text=document.getElementById("popupText");
            text.innerHTML="<div class=\"text\"><a>Informations de la Cavité :</a></div><ul>"+popup.readData(point)+"</ul><br>"+popup.readInfos(point)+".</div>";

        },
        /*
         * readData : this method read the data about the point and
         * create a string.
         */
        readData: function(point){
            var contentHtml = "";
            /* Map of the several data contained by a point*/
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
            /* Loop to check all data of a point*/
            for(var e in point) {
                if(labels[e] != undefined){
                    if(point[e] != ""){
                        if(point[e] != "?"){
                            /*Add the Data in the final string*/
                            contentHtml += "<li>"+labels[e]+point[e]+"</li>";
                        }
                    }
                }
            }
            return contentHtml;
        },
        /*
         * readInfos : this method read the information about the point and
         * create a string.
         */
        readInfos: function(point){
            var contentHtml = "<div class=\"infos\">";
            /* Map of the several informations contained by a point*/
            var labels ={
                "src" : "Source : ",
                "insee" : "INSEE : ",
                "id" : "Identifiant : ",
                "archivage" : "Archivage : ",
                "date" : "Date : ",
                "auteur" : "Auteur : ",
                "organisme" : "Organisme : "
            };
            /* Loop to check all informations of a point*/
            for(var e in point) {
                if(labels[e] != undefined){
                    if(point[e] != ""){
                        if(point[e] != "?"){
                            /*Add the informations in the final string*/
                            contentHtml += labels[e]+point[e]+", ";
                        }
                    }
                }
            }
            return contentHtml.substring(0 , contentHtml.length-2);
        },
        /*
         * close : this method permit to close the popup.
         */
        close: function() {
            pop.style.display="none";
        }
    }
})();
