var Bicycle_main = (function(username, password) {
	//"use strict";
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
	//"use strict";
	var domStrings,fetchCredentials,fetchCreds,clearFields,sendCredsObj;

	domStrings = {
		loginUsr: '.l_user',
		loginPwd: '.l_pass',
		loginBtn: '.signBTN',
		registerBtn: '.registr_Btn',
		regUsr: '.reg_user',
		regPwd: '.reg_pass'
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
				usr: document.querySelector(domStrings.regUsr).value,
				pwd: document.querySelector(domStrings.regPwd).value
			}
		},

		clearFields: function() {
			var g, clearFields;

			//Clear the Input Fields
			fields = document.querySelectorAll(domStrings.regUsr + ',' + domStrings.regPwd);
			arr = Array.prototype.slice.call(fields);
			arr.forEach(function(e,i,a) {
				a[i].value = '';
			});
			return arr;
		},

		checkCredentials: function(usr,crd) {

			//1. check User credentials in database.
		}
	}
})();


var appController = (function(uiCtrl, bikeMain) {
	//"use strict";
	var getEventListeners,doms,sendCredentials, crds, fieldValues;

	//Fetch DomStrings
	doms = uiCtrl.sendDomStrings();
	//Fetch Input Box Values
	fieldValues = uiCtrl.sendCredsObj();

	getEventListeners = function(){
		
		document.querySelector(doms.registerBtn).addEventListener('click',verifyInput);
		document.addEventListener('keypress', function(e) {
			if (e.keyCode === 13 || e.which === 13) {
				verifyInput();
			}
		});
	};

	var verifyInput = function() {
		var u,p;

		u = uiCtrl.sendCredsObj().usr;
		p = uiCtrl.sendCredsObj().pwd;

		if (u !== '' && p !== '') {
			sendUsrCredentials(u,p);
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

	sendUsrCredentials = function(usr,pwd) {
		// Some Code
		//uiCtrl.checkCredentials(usr,pwd);

	}

	return {
		run: function() {
			getEventListeners()
		}
	}	

})(uiController, Bicycle_main);

appController.run();