'use strict';

let fs = require('fs');
let loaded = false;

// debugging purposes
// function log(str) {
// 	fs.appendFile(`${__dirname}/log.txt`, str + '\n');
// }

function waitForSessions(sessions) {
	if (!loaded) {
		sessions.forEach(session => {
			session.write('echo hello world');
			session.write('\r');
			loaded = true;
		});

		setTimeout(() => waitForSessions(sessions), 10);
	}
}

exports.onWindow = function (win) {
	waitForSessions(win.sessions);
};
