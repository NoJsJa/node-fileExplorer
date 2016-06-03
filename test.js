console.log(process.argv);
console.log(process.argv.slice(2));
console.log(process.cwd());
/*
console.log(process.env.NODE_ENV);
console.log(process.env.SHELL);*/
process.on('SIGKILL', function () {
    console.log('SIGKILL signal to kill progress!');
});
console.log('programme has exited!');
/*process.exit(1);*/

