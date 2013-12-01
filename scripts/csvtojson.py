#!/usr/bin/python
# -*- coding: utf8 -*-

import os
import sys

jsonDir = "/../json/";

def compute(name, folder):
	file = open(folder + "/" + name, 'r');
	lines = file.readlines();
	str = '{\n\t"data":[\n';
	for line in lines[4:]:
		array = line.split(';');
		id = array[0]
		src = array[1]
		archivage = array[2]
		insee = array[3]
		commune_origine = array[4]
		commune_actuelle = array[5]
		departement = array[6]
		x_wgs84 = array[7]
		y_wgs84 = array[8]
		x = array[9]
		y = array[10]
		z = array[11]
		precision = array[12]
		positionnement = array[13]
		reperage = array[14]
		type_cavite = array[15]
		nom_cavite = array[16]
		date = array[17]
		auteur = array[18]
		organisme = array[19]
		statut = array[20]
		dangerosite = array[21]
		cavites_associees = array[22]
		commentaire = array[23]
		str += "\t\t{\n";
		str += '\t\t\t"id":"'+array[0]+'",\n';
		str += '\t\t\t"src":"'+array[1]+'",\n';
		str += '\t\t\t"archivage":"'+array[2]+'",\n';
		str += '\t\t\t"insee":"'+array[3]+'",\n';
		str += '\t\t\t"commune_origine":"'+array[4]+'",\n';
		str += '\t\t\t"commune_actuelle":"'+array[5]+'",\n';
		str += '\t\t\t"departement":"'+array[6]+'",\n';
		str += '\t\t\t"x_wgs84":"'+array[7]+'",\n';
		str += '\t\t\t"y_wgs84":"'+array[8]+'",\n';
		#str += '\t\t\t"x":"'+array[9]+'",\n';
		#str += '\t\t\t"y":"'+array[10]+'",\n';
		#str += '\t\t\t"z":"'+array[11]+'",\n';
		str += '\t\t\t"precision":"'+array[12]+'",\n';
		str += '\t\t\t"positionnement":"'+array[13]+'",\n';
		str += '\t\t\t"reperage":"'+array[14]+'",\n';
		str += '\t\t\t"type_cavite":"'+array[15]+'",\n';
		str += '\t\t\t"nom_cavite":"'+array[16]+'",\n';
		str += '\t\t\t"date":"'+array[17]+'",\n';
		str += '\t\t\t"auteur":"'+array[18]+'",\n';
		str += '\t\t\t"organisme":"'+array[19]+'",\n';
		str += '\t\t\t"statut":"'+array[20]+'",\n';
		str += '\t\t\t"dangerosite":"'+array[21]+'",\n';
		str += '\t\t\t"cavites_associees":"'+array[22]+'",\n';
		str += '\t\t\t"commentaire":"'+array[23]+'"\n';

		str += "\t\t},\n";
	str = str[0:-2]+'\n';
	str += "\t]\n}";
	newFile = open(folder+jsonDir+name[0:-4]+'.json', 'w');
	newFile.write("%s" % str);
	newFile.close();
		

if __name__ == "__main__":
	if len(sys.argv) != 2:
		print "Usage : python csvtojson directory"
		sys.exit(1)

	folder = sys.argv[1]
	filenames = os.listdir(folder) 
	csvlist = []

	for filename in filenames:
		if ".csv" in filename:
			csvlist.append(filename)

	if not os.path.exists(folder+jsonDir):    
		os.mkdir(folder+jsonDir)

	for name in csvlist:
		compute(name, folder)
 	
