//home early hack template 2
var hostname = "home";
//script used and statistics
var autoScript = "early-hack-template-2.script";
var scriptRamUsage = getScriptRam(autoScript);

//ram math
var maxRam = getServerMaxRam(hostname);
var usedRam = getServerUsedRam(hostname);
var currentRam = maxRam - usedRam;
var calcThreads = Math.floor(currentRam / scriptRamUsage);
var threadsToRun = calcThreads - (scriptRamUsage * 8);

//run thread
exec(autoScript, hostname, threadsToRun);