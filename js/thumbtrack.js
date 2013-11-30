var Thumbtrack = function(ellipsoid, lat, lon) {
	this.ratio = 10000;
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
		var sphere = new Cesium.SphereGeometry({
			radius: this.ratio
		});

		var modelMatrix = 
			Cesium.Matrix4.multiplyByTranslation(
				Cesium.Transforms.eastNorthUpToFixedFrame(
					this.ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(this.lat, this.lon))
				),
				new Cesium.Cartesian3(0.0, 0.0, this.ratio*2)
			);

		return new Cesium.GeometryInstance({
			geometry: sphere,
			modelMatrix: modelMatrix
		});
	},

	getCylinder: function() {
		var cylinder = new Cesium.CylinderGeometry({
			length: this.ratio*2,
			topRadius: this.ratio/4,
			bottomRadius: this.ratio/4
		});

		var modelMatrix = 
			Cesium.Matrix4.multiplyByTranslation(
				Cesium.Transforms.eastNorthUpToFixedFrame(
					this.ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(this.lat, this.lon))
				),
				new Cesium.Cartesian3(0.0, 0.0, 0.0)
			);

		return new Cesium.GeometryInstance({
			geometry: cylinder,
			modelMatrix: modelMatrix
		})
	},

	getPrimitives: function() {
		return [
			new Cesium.Primitive({
	        	geometryInstances: this.getCylinder(),
	        	appearance: new Cesium.EllipsoidSurfaceAppearance({
	        		material: new Cesium.Material({
	        			fabric: {
	        				type: 'Color',
	        				uniforms: {
	        					color: new Cesium.Color(0, 0, 0, 1)
	        				}
	        			}
	        		})
	        	})
	        }),
			new Cesium.Primitive({
	            geometryInstances: this.getSphere(),
	            appearance: new Cesium.EllipsoidSurfaceAppearance({
	                material : new Cesium.Material({
	                	fabric: {
	                		type: 'Color',
	                		uniforms: {
	                			color: new Cesium.Color(255, 0, 0, 1)
	                		}
	                	}
	                })
       			})
	        })
        ];
	}
}
