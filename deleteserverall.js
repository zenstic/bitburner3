//stop server scripts
//killall(args[0])

//delete the server specified
//deleteServer(args[0])

var i = 0

var hostnames = getPurchasedServers();

while (i < getPurchasedServerLimit()) {
	killall(hostnames[i]);
	deleteServer(hostnames[i]);
	i++;
}