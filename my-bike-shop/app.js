var main = (function() {

	var CreateEmployee = function (f,l,u,p) {
	//"use strict";
		let employeeDatabase = Object.create(CreateEmployee.prototype);

		employeeDatabase.firstname = f;
		employeeDatabase.lastname = l;
		employeeDatabase.username = u;
		employeeDatabase.password = p;


		CreateEmployee.prototype.firstname = function(f) {
			console.log(`${this.fname} added to Database.`);
		};

		CreateEmployee.prototype.lastname = function(l) {
			console.log(`${this.lname} added to Database.`);
		};

		CreateEmployee.prototype.password = function(p) {
			console.log('Password saved to Database.');
		};

		CreateEmployee.prototype.id = function() {
			const empId = Math.floor(Math.random(1000) * 9999);
		};

		CreateEmployee.prototype.username = function(u) {
			console.log(`Username ${this.u} added to the database`);
		};
		return employeeDatabase;
	}

	return {
		CreateEmployee,

		deleteProperties:function(o) {
		for (const value in o) {
			Reflect.deleteProperty(o,`${value}`);
		}
		return o;
		},
	}
	
})();


var uiController = (function() {
	//"use strict";
	var domStrings,fetchCredentials,fetchCreds,clearFields,sendCredsObj, nodeListForEach;

	domStrings = {
		loginUsr: '.l_user',
		loginPwd: '.l_pass',
		loginBtn: '.signBTN',
		registerBtn: '.registr_Btn',
		regUsr: '.reg_user',
		regPwd: '.reg_pass',
		regFname: '.firstname',
		regLname: '.lastname',
		displayLogin: '#login1',
		displayRegister: '#register2',
		displayCustomer: '#customer3'
	};

	nodeListForEach = function(o, callback) {
		for (var i = 0; i < o.length; i++) {
			callback(o[i], i);;
		}
	};

	return {

		sendDomStrings: function() {
			return domStrings;
		},

		sendCreds: function() {
			return 	{
				lginUsr: document.querySelector(domStrings.loginUsr).value,
				lginpwd: document.querySelector(domStrings.loginPwd).value,
				registerFname: document.querySelector(domStrings.regFname).value,
				registerLname: document.querySelector(domStrings.regLname).value,
				registerUser: document.querySelector(domStrings.regUsr).value,
				registerPwd: document.querySelector(domStrings.regPwd).value
			}
		},

		clearFields: function() {
			var g, clearFields;

			//Clear the Input Fields
			fields = document.querySelectorAll(domStrings.regUsr + ','
					 + domStrings.regPwd + ',' 
					 + domStrings.regFname + ','
					 + domStrings.regLname + ','
					 + domStrings.regUsr);
			arr = Array.prototype.slice.call(fields);
			arr.forEach(function(e,i,a) {
				a[i].value = '';
			});
			return arr;
		},

		splashScreenCtrl: function(e){
			// some code here
		},

		invalidEntry: function(o) {
			var fields = document.querySelectorAll(
				domStrings.loginUsr + ',' +
				domStrings.loginPwd + ',' +
				domStrings.regUsr + ',' +
				domStrings.regPwd + ',' +
				domStrings.regFname + ',' +
				domStrings.regLname);

			nodeListForEach(fields, function(current) {
				current.classList.toggle('invalidEntry');
			});

		},
	}
})();


var appController = (function(uiCtrl, createEmp) {
	//"use strict";
	var getEventListeners, doms, sendCredentials, crds,
		 registrationInfo, f,l,u,p;

	//Fetch DomStrings
	doms = uiCtrl.sendDomStrings();

	getEventListeners = function(){
		document.querySelector(doms.registerBtn).addEventListener('click',addNewEmployee);

		document.addEventListener('keypress', function(e) {
			if (e.keyCode === 13 || e.which === 13) {
				addNewEmployee();
			}
		});
	};

	var addNewEmployee = function() {
		var f,l,u,p,newEmp, invalid;

		//Fetch Input Box Values
	 	f = uiCtrl.sendCreds().registerFname;
	 	l = uiCtrl.sendCreds().registerLname;
	 	u = uiCtrl.sendCreds().registerUser;
	 	p = uiCtrl.sendCreds().registerPwd;

	 	invalid = doms.loginUsr + ',' +
				doms.loginPwd + ',' +
				doms.loginBtn + ',' +
				doms.regUsr + ',' +
				doms.regPwd + ',' +
				doms.regFname + ',' +
				doms.regLname + ',';

	 	if ( (f !== '' && l !== '') && (u !== '' && p !== '') ) {
	 		// Add to user Database
			newEmp = createEmp.CreateEmployee(f,l,u,p);
		} else {
			createEmp.deleteProperties();

			//FIX CHANGE EVENT
			document.querySelector(doms.regFname).addEventListener('change',uiCtrl.invalidEntry);
			alert('Please Fill out all fields.');
		}
		uiCtrl.clearFields();

		//Display login screen

	}

	var verifyInput = function() {
		var u,p;

		u = uiCtrl.sendCreds().lginUsr;
		p = uiCtrl.sendCreds().lginPwd;

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
			uiCtrl.clearFields();
			getEventListeners()
		}
	}	

})(uiController, main);

appController.run();