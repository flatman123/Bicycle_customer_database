var Main = (function() {

	var createEmployee = function (fname, lname, usr, pwd) {
	//"use strict";
		let employeeDatabase = Object.create(createEmployee.prototype);

		employeeDatabase.firstname = fname;
		employeeDatabase.lastname = lname;
		employeeDatabase.username = usr;
		employeeDatabase.password = pwd;


		createEmployee.prototype.firstname = function(fname) {
			console.log(`${this.fname} added to Database.`);
		};

		createEmployee.prototype.lastname = function(lname) {
			console.log(`${this.lname} added to Database.`);
		};

		createEmployee.prototype.password = function(pwd) {
			console.log('Password saved to Database.');
		};

		createEmployee.prototype.id = function() {
			const empId = Math.floor(Math.random(1000) * 9999);
		};

		createEmployee.prototype.username = function(u) {
			console.log(`Username ${this.u} added to the database`);
		};
		return employeeDatabase;
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
				usr: document.querySelector(domStrings.regUsr).value,
				pwd: document.querySelector(domStrings.regPwd).value,
				registerFname: document.querySelector(domStrings.regFname).value,
				registerLname: document.querySelector(domStrings.regLname).value,
				registerUser: document.querySelector(domStrings.regUsr).value,
				registerPwd: document.querySelector(domStrings.regPwd).value
			}
		},

		}

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

	}
})();


var appController = (function(uiCtrl, createEmp) {
	//"use strict";
	var getEventListeners, doms, sendCredentials, crds,
		 fieldValues, firstname, lastname, username, password;

	//Fetch DomStrings
	doms = uiCtrl.sendDomStrings();

	//Fetch Input Box Values
	fieldValues = uiCtrl.sendCreds();

	//fetch registration information
	firstname = doms.regFname;
	lastname = doms.regLname;
	username = doms.regUsr;
	password = doms.regPwd;

	getEventListeners = function(){
		
		document.querySelector(doms.registerBtn).addEventListener('click',addNewEmployee);

		document.addEventListener('keypress', function(e) {
			if (e.keyCode === 13 || e.which === 13) {
				addNewEmployee();
			}
		});
	};

	var addNewEmployee = function() {

		// Create user account in DataBase
		let newEmp = createEmp.createEmployee(firstname, lastname, 
								username, password);
		console.log(newEmp);
	}


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

})(uiController, Main);

appController.run();




// var CreateEmployee = (function(fname, lname, usr, pwd) {
// 	//"use strict";
// 	let employeeDatabase = Object.create(CreateEmployee.prototype);

// 	employeeDatabase.firstname = fname;
// 	employeeDatabase.lastname = lname;
// 	employeeDatabase.username = usr;
// 	employeeDatabase.password = pwd;


// 	CreateEmployee.prototype.firstname = function(fname) {
// 		console.log(`${this.fname} added to Database.`);
// 	};

// 	CreateEmployee.prototype.lastname = function(lname) {
// 		console.log(`${this.lname} added to Database.`);
// 	};

// 	CreateEmployee.prototype.password = function(pwd) {
// 		console.log('Password saved to Database.');
// 	};

// 	CreateEmployee.prototype.id = function() {
// 		const empId = Math.floor(Math.random(1000) * 9999);
// 	};

// 	CreateEmployee.prototype.username = function(u) {
// 		console.log(`Username ${this.u} added to the database`);
// 	};

// 	return employeeDatabase;
// })();