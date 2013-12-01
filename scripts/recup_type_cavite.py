# -*- coding: utf8 -*-


import sys

import os

type_cavites = []


def check_cavites(csv_folder, name, fichier_liste_cavites):
	print "------------- CHECK DU FICHIER "+name+" ------------- "
	fichier = open(csv_folder+name)
	#print csv_folder+name

	# list_lines contient header + data
	list_lines= fichier.readlines()

	# on vire le header 
	list_lines.pop(0)
	list_lines.pop(0)
	list_lines.pop(0)
	list_lines.pop(0)
	
	for line in list_lines:
		cavite = line.split(';')[15]
		#print cavite
		if cavite not in type_cavites:
			print "'"+cavite+"'"+" pas dans liste de cavites : ajout de ce nouveau type de cavité" 
			type_cavites.append(cavite)

	fichier.close()


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

