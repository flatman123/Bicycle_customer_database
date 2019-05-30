var Bicycle_main = (function(username, password) {
	var employeeID, empDatabase, customerInfo;

	this.username = username;
	this.password = password;
	this.employeeID = employeeID;

	empDatabase = function(usr,pwd,id) {
		var employee;

		employee = 
		[
		{usr:[pwd,id]}
		]
	};
})();



var uiController = (function() {
	var domStrings,fetchCredentials, clearFields;

	domStrings = {
		user: '.l_user',
		pass: '.l_pass',
		loginBtn: '.signinBtn'
	};

	fetchCreds = {
		username: document.querySelector(domStrings.user).value,
		password: document.querySelector(domStrings.pass).value
	};

	return {
		getUserCredentials: function() {

			if (fetchCreds.username !== '' && fetchCreds.password !== '') {
				return {
					usr: fetchCreds.username, pwd: fetchCreds.password
				};

			} else if (fetchCreds.username === '' && fetchCreds.password !== '') {
				alert('Please enter your username.');
			} else if (fetchCreds.username !== '' && fetchCreds.password === '') {
				alert('Please enter you password.');
			} else {
				alert('Please enter your credentials.');
			}
		},
		sendDomStrings: function() {
			return domStrings;
		},
		testPublicAccess: function() {
			console.log(fetchCreds.username);
			console.log(fetchCreds.password);
		},
		clearFields: function() {
			var g, clearFields;

			//Clear the Input Fields
			fields = document.querySelectorAll(domStrings.user + ',' + domStrings.pass);
			arr = Array.prototype.slice.call(fields);
			arr.forEach(function(e,i,a) {
				a[i].value = '';
			});
		return arr;
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
		var usrCredentials, clearedTest;
		
		//1. Get the Employee login information
		usrCredentials = uiCtrl.getUserCredentials();
		uiCtrl.clearFields();
		console.log(usrCredentials);
		
	}	

	return {
		run: function() {
			getEventListeners()
		}
	}	

})(uiController, Bicycle_main);

appController.run();