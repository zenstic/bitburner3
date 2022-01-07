var targets = scan();
var autoScript = "early-hack-template-2.script";
var scriptRamUsage = getScriptRam(autoScript);
for (var i = 0; i < targets.length; i++) {
    var hostname = targets[i];
    killall(hostname);
    tprint("killed all processes on " + hostname);
    var maxRam = getServerMaxRam(hostname);
    var usedRam = getServerUsedRam(hostname);
    var currentRam = maxRam - usedRam;
    var calcThreads = Math.floor(currentRam / scriptRamUsage);
    
    if (hasRootAccess(hostname) == false) {
    nuke(hostname);
    tprint("Nuking " + hostname);
        }
    
    if (hasRootAccess(hostname) == true){

    scp(autoScript, "home", hostname)
    tprint("script copied to " + hostname);
    exec(autoScript, hostname, calcThreads)
    tprint("script executed on " + hostname);
        }
}