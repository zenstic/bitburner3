// How much RAM each purchased server will have. In this case, it'll
// be 8GB.
var ram = args[0];
//script to be used
var scriptUsed1 = "weaken.js";
var scriptUsed2 = "hack.js";
var scriptUsed3 = "grow.js";

//amount of ram used by script
//var scriptRamUsage = getScriptRam(scriptUsed);
// Iterator we'll use for our loop
var i = 0;
var servercost = getPurchasedServerCost(ram)
// Continuously try to purchase servers until we've reached the maximum
// amount of servers
while (i < getPurchasedServerLimit()) {
    // Check if we have enough money to purchase a server
    if (getServerMoneyAvailable("home") > servercost) {
        // If we have enough money, then:
        //  1. Purchase the server
        //  2. Copy our hacking script onto the newly-purchased server
        //  3. Run our hacking script on the newly-purchased server with 3 threads
        //  4. Increment our iterator to indicate that we've bought a new server
        var hostname = "pserv-" + i;
        if (getServerMaxRam(hostname) < ram) {
            var killed = killall(hostname);
            while (killed != true || getServerUsedRam(hostname) > 0) {
                killed = killall(hostname);
                sleep(1000);
            }
            tprint("killed scripts on " + hostname);

            var deleted = deleteServer(hostname);
            while (deleted != true) {
                sleep(1000);
            }
            tprint("deleted server: " + hostname);
            purchaseServer(hostname, ram);
            tprint("purchased server " + hostname + "for " + servercost);
            //var maxRam = getServerMaxRam(hostname);
            //var usedRam = getServerUsedRam(hostname);
            //var currentRam = maxRam - usedRam;
            //var calcThreads = Math.floor(currentRam / scriptRamUsage);
            scp(scriptUsed1, hostname);
            scp(scriptUsed2, hostname);
            scp(scriptUsed3, hostname);
            //exec(scriptUsed, hostname, calcThreads);
        }
        ++i;
    }
}