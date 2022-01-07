/** @param {NS} ns **/
export async function main(ns) {
	var InputNumber = ns.args[0];

	var i = 2;

	var primeFactors = [];

	while(InputNumber != 1) {
		if(InputNumber % i == 0) {
			InputNumber /= i;
			primeFactors.push(i);
			i = 2;
		}
		else{
			i++;
		}
	}
	var biggestfactor = primeFactors[primeFactors.length - 1]; 

	ns.tprint(biggestfactor);
}