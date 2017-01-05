# hyper-run
Extension for hyper.app terminal. Runs a command before hyperterm starts. Intended to be used with hyperlayout

## Install
This plugin is still in development so you will need to download the repo and put the files in `~/.hyper_plugins/local/hyper-run`

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
