var elementImg = 	["ressources/air.jpg", 
					"ressources/earth.jpg",
					"ressources/fire.jpg",
					"ressources/water.jpg",]

var cell ; // Récupère l'ID de la cellule.
var randomCell ; // permet la génération aléatoire des assets.
var switchPossible; // limite le switch aux cases adjacentes.
var randomCellTab = new Array(); // permet la non répétition des assets.
var firstClic; // récup' l'id du premier élément cliqué.
var firstClicBg; // récup' le BG du premier élément cliqué.
var secondClic; // récup l'id du second élément cliqué.
var secondClicBg; // récup' le BG du second élément cliqué.
var clicOn = false; // switch entre firstCllic et secondClic.
var matchVerifV = false; // Var qui sert à savoir s'il y a match ou non.
var matchVerifH = false;
var i; var j; var k;
var score = document.getElementById("score");
var temps = 60;


// fonction de génération aléatoire de la grille.
window.onload = function (event) // appel la fonction loopCell().
{
	loopCell();
	matchTime();
}
function loopCell()
{ 
	for( i = 0; i < 64; i ++)
	{
		randomCell = elementImg[Math.floor (Math.random() * elementImg.length)]; // randomCell séléctionne un assets aléatoire dans la var elementImg.
		if (i >= 2)
		{ 
		while((randomCell == randomCellTab[i-1])||(randomCell == randomCellTab[i-8])) // compare l' élément précédent (-1) et celui du dessus (-8).
			{ 
				randomCell = elementImg[Math.floor (Math.random() * elementImg.length)];
			}
		}
		cell = document.getElementById(i); // récup' l'id selon le for.
		cell.style.backgroundImage = "url("+randomCell+")"; // place dans l'id récup' le BG randomCell.
		randomCellTab.push(randomCell); // on push dans le tableau le contenu de randomCell (pour permettre la comparaison).
	}
}

function loopCellLineOne(celli) // Regen la première ligne après une chute.
{ 
		randomCell = elementImg[Math.floor (Math.random() * elementImg.length)]; // randomCell séléctionne un assets aléatoire dans la var elementImg.
		cell = document.getElementById(celli); // récup' l'id selon le for.
		cell.style.backgroundImage = "url("+randomCell+")"; // place dans l'id récup' le BG randomCell.
}

function switchPossible() // ne permet que les switch sur les cases adjacentes.
{
 if (((secondClic == firstClic - 1) && (firstClic % 8 != 0) 
 	|| (firstClic == secondClic - 1) && (secondClic % 8 != 0) 
 	|| (secondClic == firstClic - 8) || (firstClic == secondClic -8)))
	{
		return true;
	}
	else
	{
		return false;
	}
}

function onClic(value) // fonction switch.
{
	if (clicOn == false) // premier clic.
	{
		firstClic = value.id;
		firstClicBg = value.style.backgroundImage;
		document.getElementById(firstClic).style.borderColor = "red"
		clicOn = true;
		console.log("first clic : " + firstClic);
	}
	else if (clicOn == true) // second clic.
	{
		clicOn = false;
		document.getElementById(firstClic).style.borderColor = "black";
		console.log("second clic : " + secondClic);
			secondClic = value.id;
			secondClicBg = value.style.backgroundImage;
			if (switchPossible())
				{
					document.getElementById(secondClic).style.backgroundImage = document.getElementById(firstClic).style.backgroundImage;
					document.getElementById(firstClic).style.backgroundImage = secondClicBg;
					matchHori3();
					matchHori2();
					matchHori();
					matchVerti3();
					matchVerti2();
					matchVerti();
					if (matchVerifH == false && matchVerifV == false)
					{
						document.getElementById(firstClic).style.backgroundImage = document.getElementById(secondClic).style.backgroundImage;
						document.getElementById(secondClic).style.backgroundImage = secondClicBg;
					}
					else
					{
						matchScore();
					}
				}
	}
	matchVerifH = false;
	matchVerifV = false;
}

// ******************************************** Match Horizontaux ******************************************************************************

function matchHori() // Match3
{
	for(i=0; i <=63; i++)
	{
		if(i <= 61)
		{
			if((document.getElementById(i).style.backgroundImage == document.getElementById(i+1).style.backgroundImage)
			&& Math.floor(i/8) == Math.floor((i+1)/8))
			{
				if((document.getElementById(i).style.backgroundImage == document.getElementById(i+2).style.backgroundImage)
				&& Math.floor(i/8) == Math.floor((i+2)/8))
				{
					matchVerifH = true;
					destructorHori(i);
					destructorHori(i+1);
					destructorHori(i+2);
					matchHori3();
					matchHori2();
					matchHori();
					matchVerti();
					return;
				}
			}
		}
	}
}

function matchHori2() // Match4
{
	for(i=0; i <=63; i++)
	{
		if(i <= 61)
		{
			if((document.getElementById(i).style.backgroundImage == document.getElementById(i+1).style.backgroundImage)
			&& Math.floor(i/8) == Math.floor((i+1)/8))
			{
				if((document.getElementById(i).style.backgroundImage == document.getElementById(i+2).style.backgroundImage)
				&& Math.floor(i/8) == Math.floor((i+2)/8))
				{
					if((document.getElementById(i).style.backgroundImage == document.getElementById(i+3).style.backgroundImage)
					&& Math.floor(i/8) == Math.floor((i+3)/8))
					{
						matchVerifH = true;
						destructorHori(i);
						destructorHori(i+1);
						destructorHori(i+2);
						destructorHori(i+3);
						matchHori3();
						matchHori2();
						matchHori();
						matchVerti();
						return;
					}
				}
			}
		}
	}
}

function matchHori3() // Match5
{
	for(i=0; i <=63; i++)
	{
		if(i <= 61)
		{
			if((document.getElementById(i).style.backgroundImage == document.getElementById(i+1).style.backgroundImage)
			&& Math.floor(i/8) == Math.floor((i+1)/8))
			{
				if((document.getElementById(i).style.backgroundImage == document.getElementById(i+2).style.backgroundImage)
				&& Math.floor(i/8) == Math.floor((i+2)/8))
				{
					if((document.getElementById(i).style.backgroundImage == document.getElementById(i+3).style.backgroundImage)
					&& Math.floor(i/8) == Math.floor((i+3)/8))
					{
						if((document.getElementById(i).style.backgroundImage == document.getElementById(i+4).style.backgroundImage)
						&& Math.floor(i/8) == Math.floor((i+4)/8))
						{
						matchVerifH = true;
						destructorHori(i);
						destructorHori(i+1);
						destructorHori(i+2);
						destructorHori(i+3);
						destructorHori(i+4);
						matchHori3();
						matchHori2();
						matchHori();
						matchVerti();
						return;
						}
					}
				}
			}
		}
	}
}

// ******************************************************************* Match Verticaux ********************************************************

function matchVerti() // Match 3
{
	for(i=0; i <= 63; i++)
	{
		if(i <= 47)
		{
			if(document.getElementById(i).style.backgroundImage == document.getElementById(i+8).style.backgroundImage)
			{
				if(document.getElementById(i).style.backgroundImage == document.getElementById(i+16).style.backgroundImage)
				{
					matchVerifV = true;
					destructorVerti(i + 16)
					matchHori();
					matchVerti();
					return;
				}
			}
		}
	}
}

function matchVerti2() // Match 4
{
	for(i=0; i <= 63; i++)
	{
		if(i <= 39)
		{
			if(document.getElementById(i).style.backgroundImage == document.getElementById(i+8).style.backgroundImage)
			{
				if(document.getElementById(i).style.backgroundImage == document.getElementById(i+16).style.backgroundImage)
				{
					if(document.getElementById(i).style.backgroundImage == document.getElementById(i+24).style.backgroundImage)
					{
						matchVerifV = true;
						destructorVerti(i + 16)
						destructorVerti(i + 24)
						matchHori2();
						matchHori();
						matchVerti2();
						matchVerti();
						return;
					}
				}
			}
		}
	}
}

function matchVerti3() // Match 5
{
	for(i=0; i <= 63; i++)
	{
		if(i <= 31)
		{
			if(document.getElementById(i).style.backgroundImage == document.getElementById(i+8).style.backgroundImage)
			{
				if(document.getElementById(i).style.backgroundImage == document.getElementById(i+16).style.backgroundImage)
				{
					if(document.getElementById(i).style.backgroundImage == document.getElementById(i+24).style.backgroundImage)
					{
						if(document.getElementById(i).style.backgroundImage == document.getElementById(i+32).style.backgroundImage)
						{
							matchVerifV = true;
							destructorVerti(i + 16)
							destructorVerti(i + 24)
							destructorVerti(i + 32)
							matchHori3();
							matchHori2();
							matchHori();
							matchVerti3();
							matchVerti2();
							matchVerti();
							return;
						}
					}
				}
			}
		}
	}
}

// ***************************************************** fonctions de chutes **************************************************************

function destructorHori(j)
{
	while(j > 7)
	{
		document.getElementById(j).style.backgroundImage = document.getElementById(j-8).style.backgroundImage;
		j = j-8;
	}
	loopCellLineOne(j);
}

function destructorVerti(k)
{
	while(k > 23)
	{
		document.getElementById(k).style.backgroundImage = document.getElementById(k-24).style.backgroundImage;
		k = k - 8;
	}
	while(k > -1)
	{
		loopCellLineOne(k);
		k = k - 8;
	}
}

// **************************************************** Score ******************************************************************************

function matchScore()
{
	if(matchHori() || matchVerti())
	{
		score = score + 5;
		temps = temps + 1
		document.getElementById("score").innerHTML = score;
		return;
	}
	else if(matchHori2() || matchVerti2)
	{
		score = score + 10;
		temps = temps + 1.5
		document.getElementById("score").innerHTML = score;
		return;
	}
	else if(matchHori3() || matchVerti3)
	{
		score = score * 2;
		temps = temps + 2
		document.getElementById("score").innerHTML = score;
		return;
	}
	else if(matchHori4() || matchVerti4)
	{
		score = score * 4;
		temps = temps + 2
		document.getElementById("score").innerHTML = score;
		return;
	}
	else
	{
		return;
	}
}

// ****************************************************** Timer *************************************************************************

function matchTime()
{
	if(temps >= 0)
	{
	temps --;
	document.getElementById("time").innerHTML = temps;
	setTimeout("matchTime()", 1000);
	}
	else
	{
		location.href="gameover.html";
	}
}

// ********************************* Corbeiiiiiiiiiiille Dallaaaaaaaaaaaace !! ********************************************************************

/* function matchHori()
{
	for( j = 0; j <= 63; j ++)
		{
			k = 1;
			l = k + j
			while((j <= 61)
			&& (document.getElementById(j).style.backgroundImage == document.getElementById(l).style.backgroundImage) 
			&& Math.floor(j/8) == Math.floor((j+k)/8))
			{
				k ++;
				if((j <= 61) 
				&& (document.getElementById(j).style.backgroundImage == document.getElementById(l).style.backgroundImage) 
				&& Math.floor(j/8) == Math.floor(l/8))
				{
					console.log("match Hori");
					matchVerif = true;
					destructor();
					return;
				}
				else
				{
				matchVerifH = false;
				}
			}
	}
}

function matchVerti()
{
	for( x = 0; x <= 63; x ++)
	{
		y = 8;
		z = x + y
		while((j <= 55)
		&& (document.getElementById(x).style.backgroundImage == document.getElementById(z).style.backgroundImage) 
		&& j%8 == l%8)
		{
			y + 8;
			if((x <= 55)
			&& (document.getElementById(x).style.backgroundImage == document.getElementById(z).style.backgroundImage) 
			&& j%8 == l%8)
			{
				console.log("match Verti.");
				matchVerifV = true;
				destructor();
				return;
			}
			else
			{
				matchVerif = false;
			}
		}
	}
}

function destructor()
{
	if(matchVerifH == true)
	{
		document.getElementById(i).style.backgroundImage = null;
		document.getElementById(i+1).style.backgroundImage = null;
		document.getElementById(i+2).style.backgroundImage = null;
		matchVerifH = false;
		console.log("destructor > matchVerifH");
	}
	else if(matchVerifV == true)
	{
		document.getElementById(i).style.backgroundImage = null;
		document.getElementById(i+8).style.backgroundImage = null;
		document.getElementById(i+16).style.backgroundImage = null;
		matchVerifV = false;
		console.log("destructor > matchVerifV");
	}
}
} */