const main = (function() {
	function _EmployeeCreator(f,l,u,p) {
		const employee = Object.create(_EmployeeCreator.prototype);

		employee.firstname = f;
		employee.lastname = l;
		employee.regUsr = u;
		employee.regPwd = p;

		if ( (f !== '' && l !== '') && (u !== '' && p !== '') ) {
			employee.id();
			return employee;
		} else {
			alert('Please Fill out all fields.');
			return _returnEmptyFields(employee);
		}
		return employee;
	};

	_EmployeeCreator.prototype.id = function() {
		const assignID = Math.floor(Math.random(1000) * 9999);
		return assignID;
	};

	// _EmployeeCreator.prototype.firstname = function() {
	// 	console.log(`${this.firstname} added to Database.`);
	// };

	// _EmployeeCreator.prototype.lastname = function() {
	// 	console.log(`${this.lastname} added to Database.`);
	// };

	// _EmployeeCreator.prototype.password = function() {
	// 	console.log('Password saved to Database.');
	// };

	// _EmployeeCreator.prototype.username = function(u) {
	// 	console.log(`Username ${this.u} added to the database`);
	// };

	const _returnEmptyFields = function(obj) {
		const emptyFields = [];
		const populatedFields = [];

		for (const key in obj) {
			if (`${obj[key]}` === '') {
				emptyFields.push(`${key}`);
			} else {
				populatedFields.push(`${key}`);
				populatedFields.push(`${key}`);
			}			
		};
		emptyFields.push(true);
		return emptyFields;
	};

	const _testPrintEmpDatabase = function(){
		console.log(employeeCreator);
	};

	return {
		_EmployeeCreator,

		deleteEmptyProperties: function(obj) {
		for (const key in obj) {
			Reflect.deleteProperty(obj,`${key}`);
		}
		return obj;
		},

		credHanlder: function (f,l,u,p) {
			u = _EmployeeCreator(f,l,u,p);

			if ( (f !== '' && l !== '') && (u !== '' && p !== '') ) {
				u.empID = u.id();
				return u;
			} else {
				return u;
			}
		},
	}
	
})();

const uiController = (function() {
	//"use strict";
	let domStrings,fetchCredentials,fetchCreds,clearFields,sendCredsObj, _nodeListForEach;

	domStrings = {
		loginUsr: '.l_user',
		loginPwd: '.l_pass',
		loginBtn: '.signBTN',
		registerBtn: '.registr_Btn',
		regUsr: '.regUsr',
		regPwd: '.regPwd',
		regFname: '.firstname',
		regLname: '.lastname',
		displayLogin: '#login1',
		displayRegister: '#register2',
		displayCustomer: '#customer3'
	};

	_nodeListForEach = function(o, callback) {
		for (var i = 0; i < o.length; i++) {
			callback(o[i], i);
		}
	};


	_toggleDom = function(fields) {
			_nodeListForEach(fields, function(current) {

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
			let g, clearFields;

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
			let dom, fields;

			// Create string for querySelectorAll
			dom = '';

			emptyFields.forEach(function(e,i,a) {
				dom += '.' + a[i] + ',';
			});

			//Modify dom string for querySelectorAll
			dom = dom.slice(0, dom.length - 1);
			fields = document.querySelectorAll(dom);
			_toggleDom(fields);
		},
	}
})();


const appController = (function(uiCtrl, createEmp) {
	//"use strict";
	let getEventListeners, doms,crds,
		 registrationInfo, f,l,u,p;

	//Fetch DomStrings
	doms = uiCtrl.sendDomStrings();

	_getEventListeners = function(){
		document.querySelector(doms.registerBtn).addEventListener('click',_addNewEmployee);

		document.addEventListener('keypress', function(e) {
			if (e.keyCode === 13 || e.which === 13) {
				_addNewEmployee();
			}
		});
	};

	const _addNewEmployee = function() {
		let f, l, u, p, newEmp, userEntries, emptyFields;

		//Fetch Input Box Values
	 	f = uiCtrl.sendCreds().registerFname;
	 	l = uiCtrl.sendCreds().registerLname;
	 	u = uiCtrl.sendCreds().registerUser;
	 	p = uiCtrl.sendCreds().registerPwd;

 	 	newEmp = createEmp.credHanlder(f,l,u,p);

	 	if (newEmp[newEmp.length - 1] === true) {
	 		newEmp.pop();
	 		//HighLight the missing Fields
	 		uiCtrl.invalidEntry(newEmp);	 		
	 	} else {
	 		uiCtrl.clearFields();
	 	}
	};

	const _verifyInput = function() {
		let u,p;

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

	return {
		run: function() {
			uiCtrl.clearFields();
			_getEventListeners()
		}
	}	

})(uiController, main);

appController.run();