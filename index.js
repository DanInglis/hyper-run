'use strict';


exports.onWindow = function (win) {
	setTimeout(() => {
        win.sessions.forEach(session => {
            session.write('echo hello world');
            session.write('\x0a');
        })
    }, 1000)
};


