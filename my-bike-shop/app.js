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
	var domStrings,fetchCredentials, clearFields,sendCredsObj;

	domStrings = {
		user: '.l_user',
		pass: '.l_pass',
		loginBtn: '.signinBtn'
	};

	fetchCreds = {
		usr: document.querySelector(domStrings.user).value,
		pwd: document.querySelector(domStrings.pass).value
	};

	return {
		getUserCredentials: function() {

			document.addEventListener('keypress', function(kpEvent) {
				if (kpEvent.keyCode === 13 || kpEvent.which === 13) {
					return fetchCreds;
			}
		});

		},
		sendDomStrings: function() {
			return domStrings;
		},
		testPublicAccess: function() {
			console.log(fetchCreds.usr);
			console.log(fetchCreds.pwd);
		},
		sendCredsObj: function() {
			return fetchCreds;
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
	var getEventListeners,doms,sendCredentials, crds, fieldValues;

	//Fetch DomStrings
	doms = uiCtrl.sendDomStrings();

	//Fetch Input Box Values
	fieldValues = uiCtrl.sendCredsObj();

	getEventListeners = function(){

		// Check Input fields for Value.
		if (fieldValues.usr !== '' && fieldValues.pwd !== '') {
			document.querySelector(doms.loginBtn).addEventListener('click',sendCredentials);

			//Get Credentials
			crds = uiCtrl.getUserCredentials();

			//Send Credentials
			sendCredentials(crds);

		} else if (fieldValues.usr === '' && fieldValues.pwd !== '') {
			alert('Please enter your username.');
		} else if (fieldValues.usr !== '' && fieldValues.pwd === '') {
			alert('Please enter your password.');
		} else {
			alert('Please enter your credentials.');
		}
	};

	sendCredentials = function(c) {
		return c;
	}	

	return {
		run: function() {
			getEventListeners()
		}
	}	

})(uiController, Bicycle_main);

appController.run();