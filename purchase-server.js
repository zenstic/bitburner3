/** @param {NS} ns **/
export async function main(ns) {

    var serversize = ns.args[0];
    var servernumber = ns.args[1];
    var purchasedservers = ns.getPurchasedServers();

    //ns.killall(deletehostname);
    //ns.deleteServer(deletehostname);
    //ns.tprint("deleting: " + deletehostname);


    //get money available
    var availablemoney = await ns.getServerMoneyAvailable("home");

    //maximum servers avialable to purchase
    var numberservers = await ns.getPurchasedServerLimit();

    //cost per server
    var costperserver = availablemoney / numberservers;

    // How much RAM each purchased server will have. 
    var ram = ns.args[0];

    //show cost of server with args
    var servercost = ns.getPurchasedServerCost(ram);
    ns.tprint(servercost);
    //script to be used
    var scriptUsed1 = "weaken.js";
    var scriptUsed2 = "hack.js";
    var scriptUsed3 = "grow.js";
    //amount of ram used by script
    //var scriptRamUsage = getScriptRam(scriptUsed);
    var i = 0
    // Continuously try to purchase servers until we've reached the maximum
    // amount of servers
    //while (i < numberservers) {
    // Check if we have enough money to purchase a server
    //if (ns.getServerMoneyAvailable("home") > ns.getPurchasedServerCost(ram)) {
    // If we have enough money, then:
    //  1. Purchase the server
    //  2. Copy our hacking script onto the newly-purchased server
    //  3. Run our hacking script on the newly-purchased server with 3 threads
    //  4. Increment our iterator to indicate that we've bought a new server
    var hostname = await ns.purchaseServer("pserv-" + servernumber, serversize);
    //var maxRam = getServerMaxRam(hostname);
    //var usedRam = getServerUsedRam(hostname);
    //var currentRam = maxRam - usedRam;
    //var calcThreads = Math.floor(currentRam / scriptRamUsage);
    await ns.scp(scriptUsed1, hostname);
    await ns.scp(scriptUsed2, hostname);
    await ns.scp(scriptUsed3, hostname);
    //exec(scriptUsed, hostname, calcThreads);
    ns.tprint("buying" + hostname);
    //i++
    //await ns.sleep(500)
}