/** @param {NS} ns **/
export async function main(ns) {
//stop server scripts
//killall(args[0])

//delete the server specified
//deleteServer(args[0])


var purchasedservers = ns.getPurchasedServers();
ns.tprint(purchasedservers);

for (let i = 0; i < purchasedservers.length; i++) {
	var hostname = purchasedservers[i];
	ns.killall(hostname);
	ns.deleteServer(hostname);
	}    
}