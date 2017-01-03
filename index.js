'use strict';

let fs = require('fs');
let loaded = false;
let cmdDefault = [];	//winType = 0
let cmdTab = [];		//winType = 1
//let cmdWindow = [];		//winType = 2

let exists;

//Gets called on change to the terminal
exports.middleware = (store) => (next) => (action) => {
	console.log(exists);	//outputs false
	console.log(cmdDefault);
	next(action);
};


function waitForSessions(sessions, commands) {
	if (!loaded) {
		sessions.forEach(session => {
			commands.forEach(cmd => {
				session.write(cmd + '\r');
			});
			loaded = true;
		});

		setTimeout(() => waitForSessions(sessions, commands), 10);
	}
};

//gets called on app startup
exports.onApp = function (obj) {
	const config = obj.config.getConfig();
	if (config.hyperRun) {
		cmdDefault = config.hyperRun
	}
	if (config.hyperRunTab){
		cmdTab = config.hyperRunTab;
	}
};

exports.onWindow = function (win) {
	waitForSessions(win.sessions, cmdDefault);
};
