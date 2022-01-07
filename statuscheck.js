/** @param {NS} ns **/
export async function main(ns) {
	while(true){
		await ns.exec("fl1ght.exe", "home");
		await ns.sleep(10000);
	}
}