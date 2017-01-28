module.exports = {

    sendMail: function(nodemailer, config, message) {
        var smtpTransport = nodemailer.createTransport('smtps://' + config.my_gmail + ':' + config.my_pass + '@smtp.gmail.com');
        var mailOptions = {
            to : config.reciever_email,
            subject : config.app_name + ' on behaf of ' + config.my_gmail,
            text : config.app_name + " notification:" + ((message != null) ? "\n" + message : "\ntestmail"),
        }
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function(error, info){
            if(error){
                console.log("***** Message was not sent:\n" + error);
                process.exit(1);
            }else{
                console.log("***** Message sent:\n" + info.response);
                process.exit(0);
            }  
        });
    }
};

