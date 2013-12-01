# -*- coding: utf8 -*-
# script fait à partir de reprojete.py trouvé sur georezo qui marche bien 

try:
	from osgeo import ogr
	from osgeo import osr
except ImportError:
	import ogr
	import osr
import sys
import getopt
import re
import os



to_epsg=4326 #wgs84
from_epsg=27572 #lambert 2 étendu
INDICE_X = 7
INDICE_Y = 8
INDICE_ID = 0
nom_dossier_csv = "csv_reproj"



def reproject_line(line):
	"""
	Renvoit la même ligne, mais dans les cases INDICE_X et INDICE_Y les coordonnées sonr en wgs84 (EPSG:4326) et non plus Lambert2 étendu
	"""

	elements = line.split(";")
	x_l2e = elements[INDICE_X]
	y_l2e = elements[INDICE_Y]

	to_srs = osr.SpatialReference()
	to_srs.ImportFromEPSG(to_epsg)
	from_srs = osr.SpatialReference()
	from_srs.ImportFromEPSG(from_epsg)

	wkt = 'POINT(%s %s)' % (x_l2e, y_l2e)

	pt = ogr.CreateGeometryFromWkt(wkt)
	pt.AssignSpatialReference(from_srs)
	pt.TransformTo(to_srs)
	
	x_wgs84 = str(pt.GetX())
	y_wgs84 = str(pt.GetY())

	elements[INDICE_X] = x_wgs84
	elements[INDICE_Y] = y_wgs84
	
	new_line= ";".join(elements)
	return new_line 


def traitement_csv(csv_file, csv_folder):
	print "------------- TRAITEMENT DU FICHIER "+csv_file+" ------------- "
	fichier = open(csv_folder+"/"+csv_file)

	# list_lines contient header + data
	list_lines= fichier.readlines()

	# on extrait le header pour que list_lines ne soit plus que la liste des données
	list_header = []
	list_header.append(list_lines.pop(0).decode('windows-1254').encode('utf-8'))
	list_header.append(list_lines.pop(0).decode('windows-1254').encode('utf-8'))
	list_header.append(list_lines.pop(0).decode('windows-1254').encode('utf-8'))
	list_header.append(list_lines.pop(0).decode('windows-1254').encode('utf-8'))

	list_header[2] = list_header[2].replace("L2e","WGS84")
	list_header[3] = list_header[3].replace("L2e","WGS84")

	#TODO : remplacer le l2e par wgs84 dans le header

	# datalist : liste des lignes de données, encodées en utf8, sans le header
	datalist = []
	for line in list_lines:
		s = line.split(';')
		x = s[INDICE_X]
		y = s[INDICE_Y]
		id_souterrain = s[INDICE_ID] 
		if ( x == '?' or y == '?' or x=='' or y ==''):
			pass
			#print "On ignore "+line.split(";")[INDICE_ID]+" car les coordonnées ne sont pas indiquées"
			#TODO: mettre dans fichier de log
		else:
			#print id_souterrain
			#print x+" "+y+"\n"
			
			datalist.append(line.decode('windows-1254').encode('utf-8'))


	new_data_list = []

	#on ajoute le header
	for line in list_header:
		new_data_list.append(line)

	# puis on ajoute les données
	for data_entry in datalist:
		new_line = reproject_line(data_entry)
		new_data_list.append(new_line)

	#print new_data_list
		
	fichier.close()

	# on écrit le nouveau fichier csv 

	path_nouveau_csv = csv_folder+"/"+nom_dossier_csv+"/"+csv_file
	nouveau_csv = open(path_nouveau_csv, "w")

	for element in new_data_list:
		nouveau_csv.write("%s" % element)

	nouveau_csv.close()


if __name__ == "__main__":

	
	if len(sys.argv) != 2:
		print "Usage : python csvbdcavitepy dossier_des_csv_a_reprojeter"
		sys.exit(1)

	csv_folder = sys.argv[1]
	list_csv_directory = os.listdir(csv_folder) 

	csv_list = []
	for filename in list_csv_directory:
		if ".csv" in filename:
			csv_list.append(filename)

	

	if not os.path.exists(csv_folder+"/"+nom_dossier_csv):    
		os.mkdir(csv_folder+"/"+nom_dossier_csv)
   
	#TODO : récupérer liste des fichiers à traoter (avec un argument qui contient un dossier). tester tous les fichiers qui finissent par .csv
	

	for name in csv_list:
		traitement_csv(name, csv_folder)






	


	
	sys.exit(0)

	
	

	
	



#--------------------------------------------------------------------------------------------------------------------------------------

# notes utiles 

	#Identifiant;Origine source;Lieu archivage;Code INSEE d'origine (actuel);Commune (origine);Commune (actuelle);Département;X(L2e);Y(L2e);X(ouv);Y(ouv);Z(ouv);Précision (m);Positionnement;Repérage;Type cavité;Nom cavité;Date;Auteur;Organisme;Statut;Dangerosité;Cavités associées;Commentaire

	#0;1;2;3;4;5;6;7;Xl2e;Yl2e;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24

	# aiguilhe l2e :  721897 2006500
	# aiguilhe wgs84 : 



