// Array of all servers that don't need any ports opened
// to gain root access. These have 16 GB of RAM
var servers0Port = ["n00dles",
                    "sigma-cosmetics",
                    "joesguns",
                    "nectar-net",
                    "hong-fang-tea",
                    "foodnstuff",
                    "harakiri-sushi"];

// Array of all servers that only need 1 port opened
// to gain root access. These have 32 GB of RAM
var servers1Port = ["neo-net",
                    "zer0",
                    "max-hardware",
                    "CSEC",
                    "iron-gym"];

// Copy our scripts onto each server that requires 0 ports
// to gain root access. Then use nuke() to gain admin access and
// run the scripts.
for (var i = 0; i < servers0Port.length; ++i) {
    var serv = servers0Port[i];

    scp("early-hack-template.script", serv);
    nuke(serv);
    exec("early-hack-template.script", serv, 6);
}

// Wait until we acquire the "BruteSSH.exe" program
//while (!fileExists("BruteSSH.exe")) {
//    sleep(60000);
//}

// Copy our scripts onto each server that requires 1 port
// to gain root access. Then use brutessh() and nuke()
// to gain admin access and run the scripts.
for (var i = 0; i < servers1Port.length; ++i) {
    var serv = servers1Port[i];

    scp("early-hack-template.script", serv);
    brutessh(serv);
    nuke(serv);
    exec("early-hack-template.script", serv, 12);
}