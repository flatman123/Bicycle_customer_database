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
	var domStrings;

	domStrings = {
		user: '.l_user',
		pass: '.l_pass',
		loginBtn: '.signinBtn'
	};



	return {
		getUserCredentials: function() {
			//Get user Credentials from login page
			return {
				username: document.querySelector(domStrings.user).value,
				password: document.querySelector(domStrings.pass).value
			};
		},
		sendDomStrings: function() {
			return domStrings;
		}
	}
})();


var appController = (function(uiCtrl, bikeMain) {
	var getDoms, getEventListeners,usrCredentials,doms;

	doms = uiCtrl.sendDomStrings();
	
	function getEventListeners(){

		document.querySelector(doms.loginBtn).addEventListener('click',sendCredentials);
		document.addEventListener('keypress', function(kpEvent) {

		if (kpEvent.keyCode === 13 || kpEvent.which === 13) {

			if (doms.user !== '' && doms.pass !== '') {
				sendCredentials();
			} else if (doms.user !== '' && doms.pass === '') {
				alert('Please Enter a Password Before Submitting!');
			} else if (doms.user === '' && doms.pass !== '') {
				alert('Please Enter your Username!');
			} else {
				alert('Please enteryour credentials!');
			}
		}
		console.log(kpEvent.keyCode);
	});
	};


	function sendCredentials() {

	//1. Get the Employee login information
	usrCredentials = uiCtrl.getUserCredentials();
	console.log(usrCredentials);
	};

	return {
		run: function() {
			getEventListeners();
		}
	};

})(uiController, Bicycle_main);

appController.run();