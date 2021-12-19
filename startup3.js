//script used and statistics
var autoScript = "early-hack-template-2.script";
var scriptRamUsage = getScriptRam(autoScript);

// Array of all servers that don't need any ports opened
// to gain root access. These have 16 GB of RAM
var servers0Port = ["n00dles",
                    "sigma-cosmetics",
                    "joesguns",
                    "nectar-net",
                    "hong-fang-tea",
                    "harakiri-sushi",
                    "foodnstuff"];


// Array of all servers that only need 1 port opened
// to gain root access. These have 32 GB of RAM
var servers1Port = ["neo-net",
                    "zer0",
                    "max-hardware",
                    "iron-gym"];

// Array of all servers that only need 2 port opened
// to gain root access.
var servers2Port = ["silver-helix",
                    "phantasy",
					"the-hub",
					"avmnite-02h",
					"omega-net",];

// Array of all servers that only need 3 port opened
// to gain root access.
var servers3Port = ["netlink",
                    "rothman-uni",
					"summit-uni",
					"I.I.I.I",
					"catalyst",];

// Copy our scripts onto each server that requires 0 ports
// to gain root access. Then use nuke() to gain admin access and
// run the scripts.
for (var i = 0; i < servers0Port.length; ++i) {
    var hostname = servers0Port[i];
	killall(hostname);
	var maxRam = getServerMaxRam(hostname);
    var usedRam = getServerUsedRam(hostname);
    var currentRam = maxRam - usedRam;
    var calcThreads = Math.floor(currentRam / scriptRamUsage);
    scp(autoScript, hostname);
    brutessh(hostname);
    ftpcrack(hostname);
    relaysmtp(hostname);
    nuke(hostname);
    exec(autoScript, hostname, calcThreads);
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
	killall(hostname);
	var maxRam = getServerMaxRam(hostname);
    var usedRam = getServerUsedRam(hostname);
    var currentRam = maxRam - usedRam;
    var calcThreads = Math.floor(currentRam / scriptRamUsage);
    scp(autoScript, hostname);
    brutessh(hostname);
    ftpcrack(hostname);
    relaysmtp(hostname);
    nuke(hostname);
    exec(autoScript, hostname, calcThreads);
}

// Copy our scripts onto each server that requires 2 ports
// to gain root access. Then use brutessh(), ftpcrack() and nuke()
// to gain admin access and run the scripts.
for (var i = 0; i < servers2Port.length; ++i) {
    var hostname = servers2Port[i];
	killall(hostname);
	var maxRam = getServerMaxRam(hostname);
    var usedRam = getServerUsedRam(hostname);
    var currentRam = maxRam - usedRam;
    var calcThreads = Math.floor(currentRam / scriptRamUsage);
    scp(autoScript, hostname);
    brutessh(hostname);
	ftpcrack(hostname);
    relaysmtp(hostname);
    nuke(hostname);
    exec(autoScript, hostname, calcThreads);
}

// Copy our scripts onto each server that requires 2 ports
// to gain root access. Then use brutessh(), ftpcrack(), relaySMTP() and nuke()
// to gain admin access and run the scripts.
for (var i = 0; i < servers3Port.length; ++i) {
    var hostname = servers3Port[i];
	killall(hostname);
	var maxRam = getServerMaxRam(hostname);
    var usedRam = getServerUsedRam(hostname);
    var currentRam = maxRam - usedRam;
    var calcThreads = Math.floor(currentRam / scriptRamUsage);
    scp(autoScript, hostname);
    brutessh(hostname);
	ftpcrack(hostname);
    relaysmtp(hostname);
    nuke(hostname);
    exec(autoScript, hostname, calcThreads);
}