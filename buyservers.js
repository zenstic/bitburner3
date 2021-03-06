/** @param {NS} ns **/
export async function main(ns) {

//the goal of this script is to purchase small servers (8gb) if we don't have any
//once small servers are purchased, jump to the next larger size servers
//continue until we are at 10240gb servers. 
//future: build sizeindex array using ns.getPurchasedServerMaxRam()

	//getting maximum servers allowed
	var maxServers = ns.getPurchasedServerLimit();

	//scripts to be copied into purchased servers
	var scriptUsed1 = "weaken.js";
	var scriptUsed2 = "hack.js";
	var scriptUsed3 = "grow.js";

	//server ram sizes to step through
	var sizeindex = [8, 16, 32, 64, 128, 256, 512, 1024, 2048, 3072, 4096, 5120, 6144, 7168, 8192, 9216, 10240];

	//sizeindex length
	var sizeIndexLength = sizeindex.length;
	//initializing sizeindex iterators
	var x;

	//checking if we have already purchased servers
	//if(maxServers.length > 0){
	//	x = 1;
	//}
	//else{
	//	x = 0;
	//}

	ns.tprint("size index length: " + sizeIndexLength);
	//ns.tprint("Initial X Value: " + x);
	
	//looping through the sizeindex array as we purchase servers
	for (x = maxServers.length > 0 ? 1 : 0; x < len; x++) {
		//looping through purchasing loop
		for (var i = 0; i < maxServers;) {
			//initial server purchase and setup
			if (x == 0) {
				ns.tprint("value of x in if loop: " + x);
				// Continuously try to purchase servers until we've reached the maximum
				// amount of servers
				var b = 0;
				while (b < maxServers) {
					// Check if we have enough money to purchase a server
					var servercost = ns.getPurchasedServerCost(sizeindex[x]);
					if (ns.getServerMoneyAvailable("home") > servercost) {
						// If we have enough money, then:
						//  1. Purchase the server
						//  2. Copy our hacking script onto the newly-purchased server
						//  3. Run our hacking script on the newly-purchased server with 3 threads
						//  4. Increment our iterator to indicate that we've bought a new server
						var hostname = "pserv-" + i;
						ns.purchaseServer(hostname, 8);
						await ns.scp(scriptUsed1, hostname);
						await ns.scp(scriptUsed2, hostname);
						await ns.scp(scriptUsed3, hostname);
						await ns.sleep(500);
						b++;
					}
				}
			}
			//server upgrade if already purchased
			else {
				//calculating the cost of a server
				var servercost = ns.getPurchasedServerCost(sizeindex[x]);
				//resetting iterator in case we set it to something else earlier
				//i = 0;
				//looping until we purchase all servers we are allowed
				var c = 0;
				while (c < maxServers) {
					// Check if we have enough money to purchase a server
					if (ns.getServerMoneyAvailable("home") > servercost) {
						// If we have enough money, then:
						//  1. Purchase the server
						//  2. Copy our hacking script onto the newly-purchased server
						//  3. Increment our iterator to indicate that we've bought a new server
						var hostnames = ns.getPurchasedServers();
						ns.tprint("value of x in else loop: " + x);
						if (ns.getServerMaxRam(hostnames[i]) < sizeindex[x]) {
							var killed = ns.killall(hostnames[i]);
							var hostusedram = ns.getServerUsedRam(hostnames[i]);
							ns.tprint("host used ram = " + hostusedram);
							while (hostusedram != 0) {
								ns.tprint(hostnames[i] + "has this much ram used " + hostusedram);
								killed = ns.killall(hostnames[i]);
								ns.tprint("killed value " + killed);
								await ns.sleep(250);
							}
							ns.tprint("killed scripts on " + hostnames[i]);
							var deleted = ns.deleteServer(hostnames[i]);
							while (deleted != true) {
								var deleted = ns.deleteServer(hostnames[i]);
								await ns.sleep(250);
							}
							ns.tprint("deleted server: " + hostnames[i]);
							ns.purchaseServer(hostnames[i], sizeindex[x]);
							ns.tprint("purchased server " + hostnames[i] + " for " + servercost);
							await ns.sleep(250);
							await ns.scp(scriptUsed1, hostnames[i]);
							await ns.scp(scriptUsed2, hostnames[i]);
							await ns.scp(scriptUsed3, hostnames[i]);
							c++;
						}
						//else{
						//	i++;
						//}

					}
					await ns.sleep(250);
					//i++
				}

			}

		}
	}
ns.tprint("Script Finished @ x value of: " + x + " iterator and " + sizeindex[x] + " ram on each server");
}