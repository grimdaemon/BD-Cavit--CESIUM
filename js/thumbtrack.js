var Thumbtrack = function(ellipsoid) {
	this.lat = 0;
	this.lon = 0;
	this.ellipsoid = ellipsoid;

	this.sphere = new Cesium.SphereGeometry({
		radius: 10000
	});

	this.cylinder = new Cesium.CylinderGeometry( {
		length: 100000,
		topRadius: 100000,
		bottomRadius: 1000000
	});
};

Thumbtrack.prototype = {
	setLatLon: function(lat, lon) {
		this.lat = lat;
		this.lon = lon;
	},

	getElements: function() {
		/*return [
			new Cesium.GeometryInstance({
				geometry: this.sphere,
				id: '5'
			}),
			new Cesium.GeometryInstance({
				geometry: this.cylinder
			})
		];*/
		return new Cesium.GeometryInstance({
				geometry: this.sphere,
				modelMatrix: Cesium.Matrix4.multiplyByTranslation(
					Cesium.Transforms.eastNorthUpToFixedFrame(
						this.ellipsoid.cartographicToCartesian(Cesium.Cartographic.fromDegrees(-100.0, 40.0))
					),
					new Cesium.Cartesian3(0.0, 0.0, 0)
				),
				id: '5'
			});
	}
}
