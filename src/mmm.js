/* mmm - Mail Me Message
 * A tiny node mailclient, mainly for short messages as command
 */

// external modules =================================================
var nodemailer  = require('nodemailer');
var program     = require('commander');
var fs          = require('fs');

// modules ==========================================================
var mail        = require('./module_mail');

function list(val) {
    return val.split(',');
}

program
.version('0.0.1')

.option('-J, --json [file]','Use non default JSON file as setup', list)
.option('-T, --test','Send testmail')

.option('-m, --message [message]','Message as string to send')
.parse(process.argv);

var defaultJson = process.env.HOME + '/.mmm/mmm.json';

var failed = false;
var config;

if (program.json) {
    try {
        var json = JSON.parse(fs.readFileSync(program.json[0], 'utf8'));
        config = json;
    } catch (err) {
        console.log("***** Could not read JSON from file: " + program.json + "\n" + err);
        failed = true;
    }
}
else {
    try {
        var json = JSON.parse(fs.readFileSync(defaultJson, 'utf8'));
        config = json;
    } catch (err) {
        console.log("***** Could not read default JSON\n" + err);
        failed = true;
    }
}

if (!failed)
    console.log("***** Successfully read JSON config");
else
    process.exit(1);


console.log('\n***** Evaluating params:');

if (!config.app_name || !config.my_gmail || !config.my_pass || !config.reciever_email) {
    failed = true;
    console.log("** No app name, email, password or recipient email configured in config.");
}

if (!program.test && !program.message) {
    failed = true;
    console.log("** Need message parameter -m or -T for testmail");
}

if (failed) {
    console.log("** Evaluating params failed. Program exits on error (1)");
    process.exit(1);
}

if (program.test) {
    console.log('\n***** Sending testmail');
    mail.sendMail(nodemailer, config, null);
}
else if (program.message) {
    console.log('\n***** Sending message: ' + program.message);
    mail.sendMail(nodemailer, config, program.message);
}
