var Bicycle_main = (function(username, password) {
	var employeeID, empDatabase, customerInfo;

	this.username = username;
	this.password = password;
	this.employeeID = Math.random(0) * 99999;


	empDatabase = { 
			jmcintyre: {ID: employeeID, password: 'cisco123'}
	};

	return 5;
})();


var uiController = (function() {
	var domStrings,fetchCredentials;

	domStrings = {
		user: '.l_user',
		pass: '.l_pass',
		loginBtn: '.signinBtn'
	};

	fetchCredentials = {
		username: document.querySelector(domStrings.user).value,
		password: document.querySelector(domStrings.pass).value
	};

	return {
		getUserCredentials: function() {
			console.log(fetchCredentials.username);
			;
		},
		sendDomStrings: function() {
			return domStrings;
		}
	}
})();


var appController = (function(uiCtrl, bikeMain) {
	var getDoms, getEventListeners,doms,sendCredentials;

	doms = uiCtrl.sendDomStrings();

	getEventListeners = function(){
		document.querySelector(doms.loginBtn).addEventListener('click',sendCredentials);
		document.addEventListener('keypress', function(kpEvent) {

			if (kpEvent.keyCode === 13 || kpEvent.which === 13) {
				sendCredentials();
			}
		});
	};

	sendCredentials = function() {
		var usrCredentials;
		
		//1. Get the Employee login information
		usrCredentials = uiCtrl.getUserCredentials();
		console.log(usrCredentials);
	}	

	return {
		run: function() {
			getEventListeners()
		}
	}	

})(uiController, Bicycle_main);

appController.run();