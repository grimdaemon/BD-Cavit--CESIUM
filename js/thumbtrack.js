var Thumbtrack_ratio = 100;

var Thumbtrack_cylinder = new Cesium.CylinderGeometry({
	length: Thumbtrack_ratio*10,
	topRadius: Thumbtrack_ratio/4,
	bottomRadius: Thumbtrack_ratio/4,
	slices: 4
});

var Thumbtrack_sphere = new Cesium.SphereGeometry({
	radius: Thumbtrack_ratio*5,
	stackPartitions: 20,
	slicePartitions: 20
});

var Thumbtrack_Cartesian3Sphere = new Cesium.Cartesian3(0.0, 0.0, Thumbtrack_ratio*11);
var Thumbtrack_Cartesian3Cylinder = new Cesium.Cartesian3(0.0, 0.0, Thumbtrack_ratio*5);

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

var Thumbtrack = function(ellipsoid, lat, lon) {
	this.lat = lat;
	this.lon = lon;
	this.ellipsoid = ellipsoid;

};

Thumbtrack.prototype = {
	setRatio: function(ratio) {
		this.ratio = ratio;
	},

	setLatLon: function(lat, lon) {
		this.lat = lat;
		this.lon = lon;
	},

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
