var Bicycle_main = (function(username, password) {
	"use strict";
	var employeeID, empDatabase, customerInfo;

	this.username = username;
	this.password = password;
	this.employeeID = employeeID;

	empDatabase = function(usr,pwd,id) {
		var employee;

		employee = 
		[
			{
				usr:[pwd,id]
			}
		]
	};
})();

var uiController = (function() {
	"use strict";
	var domStrings,fetchCredentials,fetchCreds,clearFields,sendCredsObj;

	domStrings = {
		user: '.l_user',
		pass: '.l_pass',
		loginBtn: '.signBTN'
	};

	return {
		sendDomStrings: function() {
			return domStrings;
		},
		testPublicAccess: function() {
			console.log(fetchCreds.usr);
			console.log(fetchCreds.pwd);
		},
		sendCredsObj: function() {
			return 	{
				usr: document.querySelector(domStrings.user).value,
				pwd: document.querySelector(domStrings.pass).value
			}
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
	"use strict";
	var getEventListeners,doms,sendCredentials, crds, fieldValues;

	//Fetch DomStrings
	doms = uiCtrl.sendDomStrings();
	//Fetch Input Box Values
	fieldValues = uiCtrl.sendCredsObj();

	getEventListeners = function(){
		
		document.querySelector(doms.loginBtn).addEventListener('click',verifyCreds);
		document.addEventListener('keypress', function(e) {
			if (e.keyCode === 13 || e.which === 13) {
				verifyCreds();
			}
		});
	};

	var verifyCreds = function() {
		var u,p;

		u = uiCtrl.sendCredsObj().usr;
		p = uiCtrl.sendCredsObj().pwd;

		if (u !== '' && p !== '') {
			sendCredentials(u,p);
		} else if (u === '' && p !== '') {
			alert('Please enter your username.');
		} else if (u !== '' && p === '') {
			alert('Please enter your password.');
		} else {
			alert('Please enter your credentials.');
		}
		uiCtrl.clearFields();

		// Verify user credentials in Database	


	};

	sendCredentials = function(usr,pwd) {
		// Some Code
		console.log(usr);
		console.log(pwd);
	}

	return {
		run: function() {
			getEventListeners()
		}
	}	

})(uiController, Bicycle_main);

appController.run();