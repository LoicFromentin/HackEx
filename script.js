var tailleIPMax = 15;
var bdd = new Array ();		// Tableau contenant tous les ip

// str AdresseIP, bool mdp crack, bool spam, bool spyware
function ip (adresse,cracke,spamme,spyware) {
	this.ip = adresse;
	this.crack = cracke;
	this.spam = spamme;
	this.spy = spyware;
	this.tabIp = new Array ();

	this.toString = function () {
		var padding = "";
		for (var i = 0; i < tailleIPMax-this.ip.length ; i++) {
			padding+=" ";
		}
		return this.ip+padding+" :  Crack = "+this.crack+" | Spam = "+this.spam+" | Spy = "+this.spy;
	}
}

function setUpIp (adresse) {
	var tab = new Array ();
	var indice = 0;
	// 4 paquets de l'adresse IP
	for (var i = 0; i < 4; i++) {
		var str = "";
		// Tant que le paquet n'est pas fini
		while (adresse.charAt(indice)!='.' && indice<adresse.length) {
			str += adresse.charAt(indice);	// Ajoute le chiffre au paquet
			indice++;
		}
		// Paquet fini : ajoute au tableau
		tab.push(parseInt(str));
		indice++;
	}
	return tab;
}

// Cree une nouvelle adresse ip, l'ajoute a la BDD, tri la BDD et l'affiche
function setUp (adresse,cracke,spamme,spyware) {
	var courant = new ip (adresse,cracke,spamme,spyware);
	courant.tabIp = setUpIp(adresse);
	bdd.push(courant);
	triBDD ();	// Tri par ordre croissant les adresses ip
	//printBDD ();// Affiche la nouvelle base de donnees 
}

function searchIP (adresse) {
	if (adresse=="null") adresse = document.getElementById("inpRecherche").value.toString();
	else adresse += "";
	// Si une adresse IP a ete ecrite dans le champ
	if (adresse != "") {
		console.log(adresse);
		if (adresse.length<4) {	// S'il n'y a qu'un paquet IP

		}
		else {
			// Parcours les adresses de la base de donnees
			for (var i = 0; i < bdd.length; i++) {
				// Si ip dans bdd
				if (bdd[i].ip==adresse) {
					//console.log(bdd[i].toString());
					// Reset le tableau : garde les titres de colonnes
					document.getElementById("tableau").innerHTML = "<tr><th>Adresse IP</th><th>Bank Crack</th><th>Spam</th><th>Spyware</th></tr>";
					// Affiche son IP, crack, spam et spyware
					document.getElementById("tableau").innerHTML += 
					"<tr> <td>"+bdd[i].ip+"</td><td>"+bdd[i].crack+"</td><td>"+bdd[i].spam+"</td><td>"+bdd[i].spy+"</td></tr>";
				}
			}
		}
	}
	else afficherBDD ();
}

// Affiche dans la console le contenu de la BDD
function printBDD () {
	//console.clear();
	for (var i = 0; i < bdd.length; i++) {
		console.log(i+"| "+bdd[i].toString());
	}
	console.log("\n\n");
	console.log("\n--------------------------------------------------------------------------------------------------\n\n\n");
}

// Tri la BDD selon le critere en entree
// Croissant pour IP, et de faux a vrai pour les booleens
function triBDD () {
	//tab.sort(function(a,b)); si function return -1: A avant B; 1: B avant A
	var arg = document.getElementById("listTri").value;

	if (arg=="IP Croissant" || arg =="IP Décroissant") {
		// ip croissant = 12 char ; ip decroissant = 14char
		bdd.sort(function(a,b) {
			// Si le premier paquet IP est identique
			if (a.tabIp[0]==b.tabIp[0]) {
				// Si le second paquet IP est identique
				if (a.tabIp[1]==b.tabIp[1]) {
					// Si le troisieme paquet IP est identique
					if (a.tabIp[2]==b.tabIp[2]) {
						// Tri selon le quatrieme paquet IP
						if (arg.length==12) return a.tabIp[3] - b.tabIp[3];		// Croissant
						else if (arg.length==14) return b.tabIp[3] - a.tabIp[3];// Decroissant
					}
					else {	// Tri selon le troisieme paquet IP
						if (arg.length==12) return a.tabIp[2] - b.tabIp[2];		// Croissant
						else if (arg.length==14) return b.tabIp[2] - a.tabIp[2];// Decroissant
					}
				}
				else {	// Tri selon le second paquet IP
					if (arg.length==12) return a.tabIp[1] - b.tabIp[1];			// Croissant
					else if (arg.length==14) return b.tabIp[1] - a.tabIp[1];	// Decroissant
				}
			}
			else { // Tri selon le premier paquet IP
				if (arg.length==12) return a.tabIp[0] - b.tabIp[0];				// Croissant
				else if (arg.length==14) return b.tabIp[0] - a.tabIp[0];		// Decroissant
			}
		});
	}

	if (arg=="Crack Croissant" || arg =="Crack Décroissant") {
		// "Crack Croissant" = 15 ; "Crack Décroissant" = 17
		bdd.sort(function (a,b) {
			// S'ils ont la meme valeur de crack, compare Spam
			if (a.crack==b.crack) {
				// S'ils ont la meme valeur de spam, compare Spyware
				if (a.spam==b.spam) {
					if (a.spy==b.spy) return 0;
					else {
						if (a.spy=="oui") { // Si a.spy est vrai
							if (arg.length==15) return 1;	// Croissant
							else return -1;					// Decroissant
						}
						else { // Si b.spy est vrai
							if (arg.length==15) return -1;	// Croissant
							else return 1;					// Decroissant
						}
					}
				}
				else {
					if (a.spam=="oui") { // Si a.spam est vrai
						if (arg.length==15) return 1;	// Croissant
						else return -1;					// Decroissant
					}
					else { // Si b.spam est vrai
						if (arg.length==15) return -1;	// Croissant
						else return 1;					// Decroissant
					}
				}
			}
			// S'ils n'ont pas la meme valeur de crack
			else {
				if (a.crack=="oui") { // Si a.crack est vrai
					if (arg.length==15) return 1;	// Croissant
					else return -1;					// Decroissant
				}
				else { // Si b.crack est vrai
					if (arg.length==15) return -1;	// Croissant
					else return 1;					// Decroissant
				}
			}
		});
	}
	afficherBDD();
}


setUp("124.112.15.139","oui","oui","non");
setUp("18.209.83.94","oui","oui","non");
setUp("65.51.102.210","oui","oui","non");
setUp("223.192.196.185","oui","oui","non");
setUp("63.113.65.96","oui","oui","non");
setUp("186.55.139.242","oui","oui","non");
setUp("218.0.26.144","oui","oui","non");
setUp("93.35.10.5","oui","oui","non");
setUp("41.169.145.2","oui","oui","non");
setUp("188.25.10.250","oui","oui","non");
setUp("95.57.219.135","oui","oui","non");
setUp("212.74.25.241","oui","oui","non");
setUp("44.227.178.171","oui","oui","non");
setUp("57.60.129.35","oui","oui","non");
setUp("52.56.5.167","oui","oui","non");
setUp("224.89.132.167","oui","oui","non");
setUp("225.194.135.69","oui","oui","non");
setUp("64.162.100.58","oui","oui","non");
setUp("106.246.218.96","oui","oui","non");
setUp("29.224.84.97","oui","oui","non");
// 24/10
setUp("205.163.47.245","oui","oui","non");
setUp("120.250.102.168","oui","oui","non");
setUp("61.17.99.24","oui","oui","non");
setUp("89.93.222.195","oui","oui","non");
setUp("47.90.119.16","oui","oui","oui");
setUp("0.121.14.16","oui","oui","non");
setUp("228.10.68.202","oui","oui","non");
setUp("72.233.140.20","non","oui","non");
setUp("24.21.92.79","non","oui","non");
// 07/11
setUp("183.155.138.147","oui","oui","non");
setUp("131.39.118.8","oui","oui","non");
setUp("46.212.185.236","non","non","non");
setUp("181.199.152.156","oui","non","non");
setUp("181.212.183.45","non","non","non");
setUp("201.193.183.132","non","non","non");
setUp("206.12.62.106","oui","non","non");
setUp("249.219.3.144","non","non","non");
setUp("132.167.44.142","non","non","non");
setUp("54.227.70.148","oui","non","non");
setUp("23.218.17.102","oui","non","non");
setUp("44.187.128.132","oui","non","non");
setUp("101.206.81.83","oui","non","non");
setUp("3.20.181.124","oui","non","non");
setUp("15.117.146.107","non","oui","non");
setUp("255.149.249.15","non","non","non");
setUp("99.33.80.236","oui","oui","oui");
setUp("54.96.5.6","oui","oui","non");
setUp("180.179.143.124","non","non","non");
setUp("237.234.113.225","non","non","non");
setUp("208.255.153.138","non","non","non");
setUp("149.66.54.243","non","non","non");
setUp("240.73.180.234","non","oui","non");
setUp("83.201.32.73","non","non","non");
/*
setUp("","non","non","non");
*/

// Crée le tableau HTML pour afficher tous les IP de la BDD
function afficherBDD () {
	// Reset le tableau : garde les titres de colonnes
	document.getElementById("tableau").innerHTML = "<tr><th>Adresse IP</th><th>Bank Crack</th><th>Spam</th><th>Spyware</th></tr>";
	// Pour chaque adresse IP
	for (var i = 0; i < bdd.length; i++) {
		// Affiche son IP, crack, spam et spyware
		document.getElementById("tableau").innerHTML += 
		"<tr> <td>"+bdd[i].ip+"</td><td>"+bdd[i].crack+"</td><td>"+bdd[i].spam+"</td><td>"+bdd[i].spy+"</td></tr>";
	}
}
