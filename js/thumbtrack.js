/*
 * thumbtrack.js
 * Creates the 3D object with a cylinder and a sphere
 */

var Thumbtrack_ratio = 100;

/*
 * Definition of the Cylinder geometry and his parameter
 */
var Thumbtrack_cylinder = new Cesium.CylinderGeometry({
	length: Thumbtrack_ratio*10,
	topRadius: Thumbtrack_ratio/4,
	bottomRadius: Thumbtrack_ratio/4,
	slices: 4
});

/*
 * Definition of the Sphere geometry and his parameter
 */
var Thumbtrack_sphere = new Cesium.SphereGeometry({
	radius: Thumbtrack_ratio*5,
	stackPartitions: 20,
	slicePartitions: 20
});

/*
 * Define the ratio on CESIUM
 */
var Thumbtrack_Cartesian3Sphere = new Cesium.Cartesian3(0.0, 0.0, Thumbtrack_ratio*11);
var Thumbtrack_Cartesian3Cylinder = new Cesium.Cartesian3(0.0, 0.0, Thumbtrack_ratio*5);

/*
 * Define the Appearance of the Cylinder
 */
var Thumbtrack_CylinderAppearance = 
	new Cesium.EllipsoidSurfaceAppearance({
		material: new Cesium.Material({
			fabric: {
				type: 'Color',
				uniforms: {
					color: new Cesium.Color(0, 0, 0, 1)
				}
			}
		})
	});

/*
 * Define the Appearance of the Sphere
 */
var Thumbtrack_SphereAppearance = 
	new Cesium.EllipsoidSurfaceAppearance({
	    material : new Cesium.Material({
	    	fabric: {
	    		type: 'Color',
	    		uniforms: {
	    			color: new Cesium.Color(255, 0, 0, 1)
	    		}
	    	}
	    })
	});

/*
 * Function to initialize the geodetic parameter of the thumbtrack
 */
var Thumbtrack = function(ellipsoid, lat, lon) {
	this.lat = lat;
	this.lon = lon;
	this.ellipsoid = ellipsoid;

};

/*
 * The several function to manage a Thumbtrack
 */
Thumbtrack.prototype = {

	/*
	 * Function to set the ratio
	 */
	setRatio: function(ratio) {
		this.ratio = ratio;
	},

	/*
	 * Function to set the coordinates
	 */
	setLatLon: function(lat, lon) {
		this.lat = lat;
		this.lon = lon;
	},

	/*
	 * Function to get the Sphere
	 */
	getSphere: function() {
		var modelMatrix = 
			Cesium.Matrix4.multiplyByTranslation(
				Cesium.Transforms.eastNorthUpToFixedFrame(
					this.ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(this.lat, this.lon))
				), Thumbtrack_Cartesian3Sphere
			);

		return new Cesium.GeometryInstance({
			geometry: Thumbtrack_sphere,
			modelMatrix: modelMatrix
		});
	},

	/*
	 * Function to get the Cylinder
	 */
	getCylinder: function() {
		var modelMatrix = 
			Cesium.Matrix4.multiplyByTranslation(
				Cesium.Transforms.eastNorthUpToFixedFrame(
					this.ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(this.lat, this.lon))
				), Thumbtrack_Cartesian3Cylinder
			);

		return new Cesium.GeometryInstance({
			geometry: Thumbtrack_cylinder,
			modelMatrix: modelMatrix
		})
	},

	/*
	 * Function to get the primitive of the thumbtrack
	 */
	getPrimitives: function() {
		return [
			new Cesium.Primitive({
	        	geometryInstances: this.getCylinder(),
	        	appearance: Thumbtrack_CylinderAppearance
	        }),
			new Cesium.Primitive({
	            geometryInstances: this.getSphere(),
	            appearance: Thumbtrack_SphereAppearance
	        })
        ];
	}
}
