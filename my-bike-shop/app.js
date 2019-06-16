var Main = (function() {

	var createEmployee = function (f,l,u,p) {
	//"use strict";
		let employeeDatabase = Object.create(createEmployee.prototype);

		employeeDatabase.firstname = f;
		employeeDatabase.lastname = l;
		employeeDatabase.username = u;
		employeeDatabase.password = p;


		createEmployee.prototype.firstname = function(f) {
			console.log(`${this.fname} added to Database.`);
		};

		createEmployee.prototype.lastname = function(l) {
			console.log(`${this.lname} added to Database.`);
		};

		createEmployee.prototype.password = function(p) {
			console.log('Password saved to Database.');
		};

		createEmployee.prototype.id = function() {
			const empId = Math.floor(Math.random(1000) * 9999);
		};

		createEmployee.prototype.username = function(u) {
			console.log(`Username ${this.u} added to the database`);
		};

		if ( (f !== '' && l !== '') && (u !== '' && p !== '') ) {
			return employeeDatabase;
		} else {
			deleteProperties(employeeDatabase);
			alert('Please Fill out all fields.');
		}
	}

	var deleteProperties = function(o) {
		for (const value in o) {
			Reflect.deleteProperty(o,`${value}`);
		}
		return o;
	}

	return {
		createEmployee,
	}
	
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
		regPwd: '.reg_pass',
		regFname: '.firstname',
		regLname: '.lastname'
	};

	return {

		sendDomStrings: function() {
			return domStrings;
		},

		testPublicAccess: function() {
			console.log(fetchCreds.usr);
			console.log(fetchCreds.pwd);
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

	}
})();


var appController = (function(uiCtrl, createEmp) {
	//"use strict";
	var getEventListeners, doms, sendCredentials, crds,
		 registrationInfo, f,l,u,p;

	//Fetch DomStrings
	doms = uiCtrl.sendDomStrings();

	getEventListeners = function(){
		uiCtrl.clearFields();
		document.querySelector(doms.registerBtn).addEventListener('click',addNewEmployee);

		document.addEventListener('keypress', function(e) {
			if (e.keyCode === 13 || e.which === 13) {
				addNewEmployee();
			}
		});
	};

	var addNewEmployee = function() {
		var f,l,u,p,newEmp;

		//Fetch Input Box Values
	 	f = uiCtrl.sendCreds().registerFname;
	 	l = uiCtrl.sendCreds().registerLname;
	 	u = uiCtrl.sendCreds().registerUser;
	 	p = uiCtrl.sendCreds().registerPwd;

		newEmp = createEmp.createEmployee(f,l,u,p);
		console.log(newEmp);
		uiCtrl.clearFields();	
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
			getEventListeners()
		}
	}	

})(uiController, Main);

appController.run();