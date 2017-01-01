'use strict';

let fs = require('fs');
let loaded = false;
let commands = [];

// debugging purposes
// function log(str) {
// 	fs.appendFile(`${__dirname}/log.txt`, str + '\n');
// }

function waitForSessions(sessions) {
	if (!loaded) {
		sessions.forEach(session => {
			commands.forEach(cmd => {
				session.write(cmd + '\r');
			});
			loaded = true;
		});

		setTimeout(() => waitForSessions(sessions), 10);
	}
}

exports.onApp = function (obj) {
	const config = obj.config.getConfig();
	if (config.commands) {
		commands = config.commands;
	}
};

exports.onWindow = function (win) {
	waitForSessions(win.sessions);
};
