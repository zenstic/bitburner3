// How much RAM each purchased server will have. In this case, it'll
// be 8GB.
var ram = args[0];
//script to be used
var scriptUsed = "early-hack-template-2.script"
//amount of ram used by script
var scriptRamUsage = getScriptRam(scriptUsed);
// Iterator we'll use for our loop
var i = 0;

tprint("server cost" + getPurchasedServerCost(ram));

if (getServerMoneyAvailable("home") < (getPurchasedServerCost(ram) * 25)){

    tprint("enough money to buy all 25");
}
else{

    tprint("not enough to buy all");
}


// Continuously try to purchase servers until we've reached the maximum
// amount of servers
while (i < getPurchasedServerLimit()) {
    // Check if we have enough money to purchase a server
    if (getServerMoneyAvailable("home") > getPurchasedServerCost(ram)) {
        // If we have enough money, then:
        //  1. Purchase the server
        //  2. Copy our hacking script onto the newly-purchased server
        //  3. Run our hacking script on the newly-purchased server with 3 threads
        //  4. Increment our iterator to indicate that we've bought a new server
        var hostname = purchaseServer("pserv-" + i, ram);
        var maxRam = getServerMaxRam(hostname);
        var usedRam = getServerUsedRam(hostname);
        var currentRam = maxRam - usedRam;
        var calcThreads = Math.floor(currentRam / scriptRamUsage);
        scp(scriptUsed, hostname);
        exec(scriptUsed, hostname, calcThreads);
        ++i;
    }
}