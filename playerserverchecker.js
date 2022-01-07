/** @param {NS} ns **/
export async function main(ns) {
	var hostnames = ns.getPurchasedServers();
	ns.tprint("number of hosts: " + hostnames.length);
	for (var i = 0; i < hostnames.length; i++) {
		var hostram = await ns.getServerMaxRam(hostnames[i])
		ns.tprint("host " + hostnames[i] + " has " + hostram + " ram");
	}
}