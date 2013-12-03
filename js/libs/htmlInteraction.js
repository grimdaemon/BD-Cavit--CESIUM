/*
 * htmlInteraction.js
 * Getter between JavaScript and Html element
 */
var htmlInteraction = {
	/* getElement: this method get the element with his id */
	getElement: function(id) {
		return document.getElementById(id);
	},

	/* getElementsByName: this method get the elements with his name */
	getElementsByName: function(name) {
		return document.getElementsByName(name);
	}
}