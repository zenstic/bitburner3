// Array of all servers that don't need any ports opened
// to gain root access. These have 16 GB of RAM
var servers0Port = ["n00dles",
                    "sigma-cosmetics",
                    "joesguns",
                    "nectar-net",
                    "hong-fang-tea",
                    "harakiri-sushi"];

// Array of all servers that only need 1 port opened
// to gain root access. These have 32 GB of RAM
var servers1Port = ["neo-net",
                    "zer0",
                    "max-hardware",
                    "iron-gym"];

// Array of all servers that only need 2 port opened
// to gain root access.
var servers2Port = ["silver-helix",
                    "johnson-ortho",
                    "phantasy",
					"the-hub",
					"avmnite-02h",
					"omega-net",
                    "crush-fitness"];

// Copy our scripts onto each server that requires 0 ports
// to gain root access. Then use nuke() to gain admin access and
// run the scripts.
for (var i = 0; i < servers0Port.length; ++i) {
    var hostname = servers0Port[i];
	var maxRam = getServerMaxRam(hostname);
    var usedRam = getServerUsedRam(hostname);
    var currentRam = maxRam - usedRam;
    var calcThreads = Math.floor(currentRam / scriptRamUsage);
    scp("early-hack-template.script-2", hostname);
    nuke(hostname);
    exec("early-hack-template.script-2", hostname, calcThreads);
}

// Wait until we acquire the "BruteSSH.exe" program
//while (!fileExists("BruteSSH.exe")) {
//    sleep(60000);
//}

// Copy our scripts onto each server that requires 1 port
// to gain root access. Then use brutessh() and nuke()
// to gain admin access and run the scripts.
for (var i = 0; i < servers1Port.length; ++i) {
    var hostname = servers1Port[i];
	var maxRam = getServerMaxRam(hostname);
    var usedRam = getServerUsedRam(hostname);
    var currentRam = maxRam - usedRam;
    var calcThreads = Math.floor(currentRam / scriptRamUsage);
    scp("early-hack-template.script-2", hostname);
    brutessh(hostname);
    nuke(hostname);
    exec("early-hack-template.script-2", hostname, calcThreads);
}

// Copy our scripts onto each server that requires 2 ports
// to gain root access. Then use brutessh(), ftpcrack() and nuke()
// to gain admin access and run the scripts.
for (var i = 0; i < servers1Port.length; ++i) {
    var hostname = servers2Port[i];
	var maxRam = getServerMaxRam(hostname);
    var usedRam = getServerUsedRam(hostname);
    var currentRam = maxRam - usedRam;
    var calcThreads = Math.floor(currentRam / scriptRamUsage);
    scp("early-hack-template-2.script", hostname);
    brutessh(hostname);
	ftpcrack(hostname);
    nuke(hostname);
    exec("early-hack-template-2.script", hostname, calcThreads);
}