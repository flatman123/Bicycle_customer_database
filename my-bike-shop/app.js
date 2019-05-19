var Bicycle_main = (function(username, password) {
	var userID;
	this.username = username;
	this.password = password;
	
	return {
		publicAccess: function(u,p) {
			console.log(u + p);
			
		}
	}
})();



var uiController = (function() {
	var domStrings;

	domStrings = {
		user: '.l_user';
		pass: '.l_pass'
	};
	

})();



var appController = (function(uiCtrl, bikeMain) {

	bikeMain.publicAccess('jmcintyre', 'Jsndf89h24@');


})(uiController, Bicycle_main);