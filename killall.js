/** @param {NS} ns **/
export async function main(ns) {
    //var host = ns.args[0];
    //var hosts = ns.scan(host);
    //ns.tprint(hosts);
    //for(let i = 0; i < hosts.length; i++) {

	//}
    let servers = new Set(["home"]);
    scanAll("home", servers, ns);
    for (let server of servers) {
        ns.tprint("servers in kill loop " + server);
        ns.killall(server);
    }


function scanAll(host, servers, ns) {
    var hosts = ns.scan(host);
    ns.tprint("hosts in scan loop " + hosts);
    for (let i = 0; i < hosts.length; i++) {
        if (!servers.has(hosts[i])) {
            servers.add(hosts[i]);
            scanAll(hosts[i], servers, ns);
        }
    }
    return servers;
}
}