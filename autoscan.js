//while(true){

    var targets = scan();

    for (var i = 0; i < targets.length; i++) {
        var hostname = targets[i];

        if (fileExists("autoscan.script", hostname)) {
        continue;
        }
        else{
            scp("autoscan.script", hostname)
        }

        if (fileExists("autohackv2.script", hostname)) {
        continue;
        }
        else{
            scp("autohackv2.script", hostname)
        }

        if (fileExists("BruteSSH.exe", "home")) {
        brutessh(hostname);
        tprint("brutesshing " + hostname);

        if (fileExists("ftpcrack.exe", "home")) {
        ftpcrack(hostname);
        tprint("ftpcracking " + hostname);
    
        if ((hasRootAccess(hostname) == false) //&& (getServerNumPortsRequired(hostname) = 0)
        ) {
        nuke(hostname);
        tprint("Nuking " + hostname);
            }
        }
    }
    }

//}