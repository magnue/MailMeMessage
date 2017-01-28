### MailMeMessage

#### Summary
MailMeMessage is a tiny Node mailclient for sending basic message with gmail on Linux.
```
mmm -T # Sends a testmessage from default config.
mmm -m "This is a scripted alert" # Sends a small scriptable message from default config.
mmm -J ~/.someConfig.json -T # Sends a testmessage from specified config file.
```

#### Install Dependencies
MMM depends on node. Instructions can be found at http://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/#

#### Install MailMeMessage
Run the install.sh script.
You will be asked for password to move mmm sh script to /usr/local/bin/ and set permission 765
```
cd ~/Projects
git clone https://github.com/magnue/mailmemessage.git mmm
cd mmm

# Do NOT use 'sudo ./install.sh' You will be prompted for password when it's needed
./install.sh
```

#### Setup config file
The config is a json file located in ~/.mmm/mmm.json.
You can set the appname, your gmail account, password (or appcode) and mail adress for recipient.

Example config
```
{
  "app_name": "MailMeMessage",
  "my_gmail": "YourGMailAccount",
  "my_pass": "YourGMailPasswordOrTwoStageAppPassword",
  "reciever_email": "RecipientMail"
}
```

#### Example output
```
Subject:
MailMeMessage on behaf of yourgmailaccount@gmail.com

Body:
MailMeMessage notification:
This is a scripted alert
```
