/** @param {NS} ns**/
export async function main(ns) {
	ns.disableLog("ALL"); //Visual clarity

	//Welcome to the Auto Farm part 2: Electric Boogaloo
	//This script is a little more complicated to explain easily, it dedicates high RAM servers to attack high profit servers
	//This is also set and forget, your EXEs and hacking level are reacquired each second, so new servers are added without needing to reboot it
	//Well I hope this brings you ideas, knowledge and or profits :D

	var files = ["grow.js", "weak.js", "hack.js"];//Modify the scripts as needed, if you know what you're doing
	await ns.write(files[0], "grow(args)", "w");
	await ns.write(files[1], "weaken(args)", "w");
	await ns.write(files[2], "hack(args)", "w");

	var serverList; var targetList; var hostList; var exes; var temp;
	var netManager = false; var serverManager = false;
	var cycle = [0, "▄", "█", "▀", "█"]; var latest = [["-", "-"], ["-", "-"], ["-", "-"]];
	if (false) { brutessh(); ftpcrack(); relaysmtp(); httpworm(); sqlinject() } //Avoid RAM cost bypass error

	var pServers = await ns.prompt("Use player servers as hosts?");

	async function scanExes() {
		exes = ["BruteSSH", "FTPCrack", "relaySMTP", "SQLInject", "HTTPWorm"];
		for (let i = 0; i <= exes.length - 1; i++) { if (!ns.fileExists(exes[i] + ".exe")) { exes.splice(i, 1); i-- } }//Removes EXEs you don't have
	}

	function checkM(c, d) { return eval(c < ns.getPlayer().money / d) }
	function arraySort(array) { return array.sort(function (a, b) { return b[0] - a[0] }) }//Sorts nested arrays
	function logBalance(server) {//For balance in display
		return [ns.nFormat(ns.getServerMoneyAvailable(server), '0a')] + " / " + [ns.nFormat(ns.getServerMaxMoney(server), '0a')]
			+ " : " + ns.nFormat(ns.getServerMoneyAvailable(server) / ns.getServerMaxMoney(server), '0%')
	}

	async function log() {//The display
		if (cycle[0] >= 4) { cycle[0] = 0 }; cycle[0]++;//Bounce
		ns.clearLog();
		ns.print("╔═══╦═╣ HOST ╠════════════════╣ TARGET ╠═╗");
		ns.print("║ G ║ " + latest[0][0] + latest[0][1].padStart(34 - latest[0][0].length) + " ║")
		ns.print("║ W ║ " + latest[1][0] + latest[1][1].padStart(34 - latest[1][0].length) + " ║")
		ns.print("║ H ║ " + latest[2][0] + latest[2][1].padStart(34 - latest[2][0].length) + " ║")
		ns.print("║ " + cycle[cycle[0]] + " ╠════════════════════════════════════╣")
		if (targetList.length < 6) { ns.print("╚═══╝                                    ║") } else {
			ns.print("╠═══╝ Priority Servers       Balance     ║")
			for (let i = 0; i < 6; i++) {
				temp = targetList[i][1];
				ns.print("║ > " + temp + logBalance(temp).padStart(36 - temp.length) + " ║")
			}
			ns.print("╠════════════════════════════════════════╣")
			var str1 = "║ EXE " + exes.length + "/5 ║ HOST " + hostList.length + " ║ TAR " + targetList.length + " ║ SER " + ns.getPurchasedServers().length + "/25"
			ns.print(str1.padEnd(40) + " ║ ")
			ns.print("╠═════╣ RAM ╠════════════════════════════╣")
			var sum = 0;
			var servs = ns.getPurchasedServers().length
			var i = 0;
			while (i < servs) {
				var ramGB = ns.getServerMaxRam("pserv-" + i++)
				while (ramGB > 1) {
					ramGB = ramGB / 2
					sum++;
				}
			}
			var avg = sum / servs
			var cost = ns.getPurchasedServerCost(Math.pow(2, Math.floor(avg) + 1))
			var price
			if (cost > 1000000000) {
				price = (cost / 1000000000).toFixed(3) + "b"
			} else if (cost > 1000000) {
				price = (cost / 1000000).toFixed(3) + "m"
			} else if (cost > 1000) {
				price = (cost / 1000).toFixed(3) + "k"
			} else {
				price = cost + ""
			}
			var done = ((avg - Math.floor(avg)) * 25).toFixed(0)
			var str2 = "║ AVG " + avg.toFixed(2) + " ║ PRICE " + price + " ║ DONE " + (done < 10 ? "0" + done : done) + "/" + servs
			ns.print(str2.padEnd(40) + " ║ ")
			ns.print("╠════════════════════════════════════════╝")
			if (netManager) {
				ns.print("╠══════╣ Managing " + ns.hacknet.numNodes() + " Hacknet Nodes".padEnd(21) + "║")
			}
			if (serverManager) {
				ns.print("╠══════╣ Managing " + servs + " Player Servers".padEnd(21) + "║")
			}
		}
	}

	async function scanServers() {//Finds all servers
		serverList = ns.scan("home"); let serverCount = [serverList.length, 0]; let depth = 0; let checked = 0; let scanIndex = 0;
		while (scanIndex <= serverCount[depth] - 1) {
			let results = ns.scan(serverList[checked]); checked++;
			for (let i = 0; i <= results.length - 1; i++) {
				if (results[i] != "home" && !serverList.includes(results[i])) {
					serverList.push(results[i]); serverCount[depth + 1]++
				}
			}
			if (scanIndex == serverCount[depth] - 1) { scanIndex = 0; depth++; serverCount.push(0) } else { scanIndex++ };
		}
	}

	async function checkServers() {//Sorts servers into lists based on RAM and money: hostList and targetList
		targetList = []; hostList = [[ns.getServerMaxRam("home"), "home"]];
		for (let i = 0; i <= serverList.length - 1; i++) {
			let cTarget = serverList[i];
			if (ns.getServerMaxMoney(cTarget) > 0 || ns.getServerMaxRam(cTarget) > 0) {//Filters out servers like darkweb
				temp = ns.getPurchasedServers().includes(cTarget)
				if ((ns.getServerNumPortsRequired(cTarget) <= exes.length && !temp) || (temp && pServers)) {
					if (!temp) {
						for (let i = 0; i <= exes.length - 1; i++) { ns[exes[i].toLowerCase()](cTarget) }//Runs all EXEs you have
						ns.nuke(cTarget);//Ghandi.jpeg
					}
					temp = [Math.floor(ns.getServerMaxMoney(cTarget) / ns.getServerMinSecurityLevel(cTarget)), cTarget];
					if (ns.getServerMaxMoney(cTarget) != 0 && ns.getServerRequiredHackingLevel(cTarget) <= ns.getHackingLevel() && ns.getServerMinSecurityLevel(cTarget) < 100) {
						targetList.push(temp); targetList = arraySort(targetList);
					}
					temp = [ns.getServerMaxRam(cTarget), cTarget];
					if (ns.getServerMaxRam(cTarget) > 4) {
						hostList.push(temp); hostList = arraySort(hostList)
					}
					await ns.scp(files, "home", cTarget);
				}
			}
		}
	}

	async function hackAll() {//Dedicates high RAM servers to high value ones
		let tarIndex = 0; let loop = false; let hType; let threads;
		for (let i = 0; i <= hostList.length - 1; i++) {
			if (tarIndex > targetList.length - 1) { tarIndex = 0; loop = true };
			let hHost = hostList[i][1]; let hTarget = targetList[tarIndex][1]; let freeRam;
			temp = ns.getServerMaxRam(hHost) - ns.getServerUsedRam(hHost)
			if (hHost == "home") { freeRam = Math.max(temp - 50, 0) } else { freeRam = temp }
			if (ns.getServerMoneyAvailable(hTarget) < ns.getServerMaxMoney(hTarget) * .80) { hType = 0 }
			else if (ns.getServerSecurityLevel(hTarget) > ns.getServerMinSecurityLevel(hTarget) + 5 || loop) { hType = 1 }
			else { latest[2][0] = hHost; latest[2][1] = hTarget; hType = 2 }
			threads = Math.floor(freeRam / ns.getScriptRam(files[hType]));
			if (freeRam > 4) {
				if (hType == 2 && !ns.scriptRunning(files[2], hHost)) {
					ns.scriptKill(files[0], hHost); ns.scriptKill(files[1], hHost)
					threads = Math.floor(freeRam / ns.getScriptRam(files[hType]));
					while (parseFloat(ns.hackAnalyze(hTarget)) * threads > .30) { threads-- }
				} else if (hType == 1) {
					ns.exec(files[0], hHost, Math.ceil(0.15 * threads), hTarget);
					threads = Math.floor(0.85 * threads)
				} else if (hType == 0) {
					ns.exec(files[1], hHost, Math.ceil(0.15 * threads), hTarget);
					threads = Math.floor(0.85 * threads)
				}
				ns.exec(files[hType], hHost, threads, hTarget); latest[hType][0] = hHost; latest[hType][1] = hTarget
				if (hType == (1 || 2) && freeRam * ns.getServerMaxRam(hHost) < .5) {
					ns.scriptKill(files[0], hHost); ns.scriptKill(files[1], hHost)
				}
			}
			tarIndex++
		}
	}
	//Put modules below here

	//But above here
	ns.tail()
	while (true) {//Keeps everything running once per second
		await scanExes()
		await scanServers()
		await checkServers()
		await hackAll()
		if (netManager) { await hnManager() }
		if (serverManager) { await pServerManager() }
		await log()
		await ns.asleep(1000)
	}
}