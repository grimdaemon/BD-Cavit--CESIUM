# -*- coding: utf8 -*-
# Script based on reprojete.py (georezo.net)

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


# Definition of the variable
to_epsg=4326 #wgs84
from_epsg=27572 #lambert 2 étendu
INDICE_X = 7
INDICE_Y = 8
INDICE_ID = 0
nom_dossier_csv = "csv_reproj"

# Function to return the same line with an update of the INDICE_X and INDICE_Y. Their fields change with a reprojection
# of the coordinates to WGS84 from Lambert 2 étendu
def reproject_line(line):

	elements = line.split(";")
	x_l2e = elements[INDICE_X]
	y_l2e = elements[INDICE_Y]

	#Definiton of the Geodetic system
	to_srs = osr.SpatialReference()
	to_srs.ImportFromEPSG(to_epsg)
	from_srs = osr.SpatialReference()
	from_srs.ImportFromEPSG(from_epsg)

	wkt = 'POINT(%s %s)' % (x_l2e, y_l2e)

	#Reprojection of the fields informations
	pt = ogr.CreateGeometryFromWkt(wkt)
	pt.AssignSpatialReference(from_srs)
	pt.TransformTo(to_srs)
	
	x_wgs84 = str(pt.GetX())
	y_wgs84 = str(pt.GetY())

	elements[INDICE_X] = x_wgs84
	elements[INDICE_Y] = y_wgs84
	
	new_line= ";".join(elements)
	return new_line 

# Function to apply the process on the file 
def traitement_csv(csv_file, csv_folder):
	print "------------- TRAITEMENT DU FICHIER "+csv_file+" ------------- "
	fichier = open(csv_folder+"/"+csv_file)

	list_lines= fichier.readlines()

	# Extract the header to transform the list of data
	list_header = []
	list_header.append(list_lines.pop(0).decode('windows-1254').encode('utf-8'))
	list_header.append(list_lines.pop(0).decode('windows-1254').encode('utf-8'))
	list_header.append(list_lines.pop(0).decode('windows-1254').encode('utf-8'))
	list_header.append(list_lines.pop(0).decode('windows-1254').encode('utf-8'))

	list_header[2] = list_header[2].replace("L2e","WGS84")
	list_header[3] = list_header[3].replace("L2e","WGS84")

	# Separate the data and the header
	datalist = []
	for line in list_lines:
		s = line.split(';')
		x = s[INDICE_X]
		y = s[INDICE_Y]
		id_souterrain = s[INDICE_ID] 
		if ( x == '?' or y == '?' or x=='' or y ==''):
			pass
		else:
			datalist.append(line.decode('windows-1254').encode('utf-8'))


	new_data_list = []

	# Add the header
	for line in list_header:
		new_data_list.append(line)

	# Add the data
	for data_entry in datalist:
		new_line = reproject_line(data_entry)
		new_data_list.append(new_line)
		
	fichier.close()

	# Write the new csv file

	path_nouveau_csv = csv_folder+"/"+nom_dossier_csv+"/"+csv_file
	nouveau_csv = open(path_nouveau_csv, "w")

	for element in new_data_list:
		nouveau_csv.write("%s" % element)

	nouveau_csv.close()

# Main Function to manage the program and the parameter
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
   
	for name in csv_list:
		traitement_csv(name, csv_folder)
	
	sys.exit(0)
