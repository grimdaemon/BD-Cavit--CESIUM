# -*- coding: utf8 -*-
# reprojete.py
# Python MapScript
# ******************************************************* #
# @category   Spatial
# @package    osgeo
# @author     Yves Jacolin <yjacolin@free.fr>
# @copyright  2009 yjacolin
# @Licence    GPL, http://www.gnu.org/licenses/gpl-3.0.txt
# ******************************************************* #

#------------------
# MODULES
#------------------
try:
	from osgeo import ogr
	from osgeo import osr
except ImportError:
	import ogr
	import osr
import sys
import getopt
#------------------
# VALEUR PAR DEFAUT
#------------------
to_epsg=900913
from_epsg=27572 #lambert 2 étendu


def reprojecte(x,y,from_epsg,to_epsg):
	to_srs = osr.SpatialReference()
	to_srs.ImportFromEPSG(to_epsg)
	from_srs = osr.SpatialReference()
	from_srs.ImportFromEPSG(from_epsg)
	
	wkt = 'POINT(%f %f)' % (x, y)
	
	pt = ogr.CreateGeometryFromWkt(wkt)
	pt.AssignSpatialReference(from_srs)
	print pt
	pt.TransformTo(to_srs)
	print pt

def usage():
	print """reprojete.py --x=<int>|-x <int> --y=<int>|-y <int> [[--to_epsg=<int>][--from_epsg=<int>]]
	x : valeur des x
	y : valeur des y
	from_epsg : code EPSG de la projection de départ (defaut : 27572)
	to_epsg : code EPSG de la projection finale (defaut : 900913)
	"""

def main(argv):
	global x,y,to_epsg,from_epsg
	try:
		opts, args = getopt.getopt(argv, "hxy:", ["help", "x=",'y=','to_epsg=','from_epsg='])
	except getopt.GetoptError:
		usage()
		sys.exit(2)
	for opt, arg in opts:
		if opt in ("-h", "--help"):
			usage()
			sys.exit()
		elif opt in ("-x", "--x"):
			x = int(arg)
		elif opt in ("-y", "--y"):
			y = int(arg)
		elif opt in ("--to_epsg"):
			to_epsg = int(arg)
		elif opt in ("--from_epsg"):
			from_epsg = int(arg)

	reprojecte(x,y,from_epsg,to_epsg)
	

if __name__ == "__main__":
    main(sys.argv[1:])

