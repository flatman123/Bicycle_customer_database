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
		
		if ( (f !== '' && l !== '') && (u !== '' && p !== '') ) {
	 		// Add to user Database
			return employeeDatabase;
		} else {
			alert('Please Fill out all fields.');
			return returnEmptyFields(employeeDatabase);
			
		}
		return employeeDatabase;
	}

	var returnEmptyFields = function(obj) {
		var emptyFields;
		emptyFields = [];
		
		for (const key in obj) {
			if (`${obj[key]}` === '') {
				emptyFields.push(`${key}`);
			};			
		};
		emptyFields.push(true);
		return emptyFields;
	};



	return {
		CreateEmployee,

		deleteEmptyProperties: function(obj) {
		for (const key in obj) {
			Reflect.deleteProperty(obj,`${key}`);
		}
		return obj;
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
			callback(o[i], i);
		}
	};


	toggleDom = function(fields) {
			nodeListForEach(fields, function(current) {
				current.classList.toggle('red_invalid_Entry');
			});
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
	
		  

		invalidEntry: function(emptyFields) {
			var dom, fields;

			dom = '';
			emptyFields.forEach(function(e,i,a) {
				dom += '.' + a[i] + ',';
			});

			dom = dom.slice(0, dom.length -1);

			fields = document.querySelectorAll(dom);
			toggleDom(fields);
			//document.addEventListener('change',invalidEntry);


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
		var f,l,u,p,newEmp, userEntries, emptyFields, valid;

		//Fetch Input Box Values
	 	f = uiCtrl.sendCreds().registerFname;
	 	l = uiCtrl.sendCreds().registerLname;
	 	u = uiCtrl.sendCreds().registerUser;
	 	p = uiCtrl.sendCreds().registerPwd;


	 	
	 	newEmp = createEmp.CreateEmployee(f,l,u,p);

	 	if (newEmp[newEmp.length - 1] === true) {

	 		newEmp.pop();
	 		uiCtrl.invalidEntry(newEmp);
	 		console.log(newEmp, 'not valid we have some empty fields');
	 	} else{
	 		console.log('all good');
	 		uiCtrl.invalidEntry(newEmp);
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