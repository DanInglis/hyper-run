# hyper-run
Extension for hyper.app terminal. Runs a command before hyperterm starts. Intended to be used with hyperlayout

## Install
Open `~/.hyperterm.js` and add `hyper-run` to the list of plugins.

## setup

In your `.hyper.js`...
```
module.exports = {
    config: {
        ...
        hyperRun: ['echo first command', 'echo second command'],
        hyperRunTab: ['echo first command', 'echo second command'],
    },
    ...
};

```

hyperRun commands will run on startup and when a new window is opened

hyperRunTab commands will run when a new tab is created or a window is split

Only 1 is required


## Acknowledgements

Special thanks to curz46 for your help (https://github.com/curz46)

Hypercwd was used for reference for middleware (https://github.com/hharnisc/hypercwd)
