# -*- coding: utf8 -*-
# Script to get the several type of the different cavity

import sys
import os

type_cavites = []

# Function to read and add the type of the cavity
def check_cavites(csv_folder, name, fichier_liste_cavites):
	print "------------- CHECK DU FICHIER "+name+" ------------- "
	fichier = open(csv_folder+name)
	list_lines= fichier.readlines()

	# Delete the header
	list_lines.pop(0)
	list_lines.pop(0)
	list_lines.pop(0)
	list_lines.pop(0)
	
	# Loop to check the type of the cavity and add it in the list
	for line in list_lines:
		cavite = line.split(';')[15]
		if cavite not in type_cavites:
			print "'"+cavite+"'"+" pas dans liste de cavites : ajout de ce nouveau type de cavité" 
			type_cavites.append(cavite)

	fichier.close()

# Main Function to manage the program and the parameter
if __name__ == "__main__":

	if len(sys.argv) != 2:
		print "Usage : python csvbdcavitepy dossier_des_csv_de_bdcavite"
		sys.exit(1)

	csv_folder = sys.argv[1]
	list_csv_directory = os.listdir(csv_folder) 

	csv_list = []
	for filename in list_csv_directory:
		if ".csv" in filename:
			csv_list.append(filename)

	fichier_liste_cavites = open(csv_folder+"liste_cavites", 'w')
	
	for name in csv_list:
		check_cavites(csv_folder, name, fichier_liste_cavites)
		
	for element in type_cavites:
		fichier_liste_cavites.write("%s\n" % element)
	
	fichier_liste_cavites.close()
		
	sys.exit(0)

