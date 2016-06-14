/*
	OBJSECTIF:

		-ajouter des marquer pour les unite de temps cle (minute, heure, jour, semaine)									DONE
		-position automatiquemen risize si proche d'une position clef													DONE
		-calcule du coefisiant en fonction de la position																DONE
		-definir le cef multiplicateur (en fonction du temp par default, donc plus de calendrier pour le modifier)		DONE
		-integre le coef multiplicateur au calcule 																		DONE
		-actualiser le rendu des linge en fonction de l'echantillonage													DONE

		-poser les base pour le curseur d'interval d'etude
*/


/*
	curseur unite:
		-min		une minute									:60000				=> 10px
		-inter_m	une heure									:3600000			=> width * 1/4
		-mid 		une journer									:86400000			=> width * 2/4
		-inter_M	une sewmaine								:604800000			=> width * 3/4
		-max 		le temp totale (donc a terme mis a jour)	:max				=> width * 1

	si on est proche (10px d'une zone on se cale dessu)
*/

/*	curseur_d'interval

		-on defini le min et la max (temp) +- 10%
		-
*/

/*
*	Plage de temps superpose 
		-rayon en fonction de sa valeur, + sa heuteur en fonction de sa valeur
		-si on fait aussi la moyenne des x ? 
*
*/


var	curseur_borne;
var	curseur_unite;
var coef_unite = 1;
var global_unite_time;

// function Key_time()
// {
// 	var	interval = get_time_interval();

// 	this.min 	= 60000;
// 	this.hour	= 3600000;
// 	this.day	= 86400000;
// 	this.week	= 604800000;
// 	this.all	= interval.end - interval.begin;	//le all peu etre inferieur a une semaine donc il faudra soi ne rien faire sois aller deprogresivement;
// }


function	get_unite_time_curseur(event, obj)
{
	// detection des position clef + definition du temps minimal em fonction des truc + 
		// console.log("mouHBIBIBHInijhibj");
		// console.log(obj);
		// console.log(obj.data);
		// console.log(obj.data.from);
		// console.log(obj.data.from);
		var delta = obj.data.to.x - obj.data.from.x;
		var marge = 4;
		var position = event.point.x - obj.data.from.x;// - obj.data.from.x;
		var	interval = get_time_interval();
		var limit = [60000, 3600000 * 3, 86400000, 604800000, interval.end - interval.begin]//new Key_time();
		var delta_interval = 0;
		var delta_val = 0; 
		var coef = 1;
		var delta_result = 0;
		var result;
		for (var i = 0; i < 5; i++)
		{

			// detection de proximiter des point intermediares
			if (((position - marge) / delta) <= (i / 4) && ((position + marge) / delta) >= (i / 4))
			{
				// console.log("position:"+i);
				obj.position.x = obj.data.from.x + i * delta / 4;
				obj.data.line[1].point.x = obj.data.from.x + i * delta / 4;

			}
			//definition du coef
			if (i < 4)
			{
				delta_interval = (obj.data.from.x + (i + 1) * delta / 4) - ((obj.data.from.x + i * delta / 4));
				delta_val = obj.position.x - (obj.data.from.x + i * delta / 4);
				if (delta_val >= 0 && (delta_val / delta_interval) < 1)
				{
					delta_result = limit[i + 1] - limit[i]; 
					// console.log(limit.item);
					coef = (delta_val / delta_interval) ;
					// console.log("coef:"+coef);
					result = delta_result * coef + limit[i];
					// console.log("coef:"+coef+"	result:"+result);

				}
				// console.log(limit.item(i));
				// coef = ((obj.position.x - obj.data.from.x + i * delta / 4) / )
			}
			// else if (i == 4)
			// {
			// 	result = limit[4];
			// }




			// for (var x in limit)
			// {
			// 	console.log(x);
			// }
		}

		if (result == undefined)
		{
			result = limit[4];
			// console.error("On a pas pu trouver de position pour:"+obj.position.x+" sur :");
		}
		// else
		// {
			// console.log("result:"+result);
		// }
		return result;
}


function	test()
{
	var hue = 60;
	var position = new Point(view.size.width * 2 / 3 + (Math.random() * 60 - 40), view.size.height * 2 / 3  + (Math.random() * 60 - 40));
	var circle = new Path.Circle(position , 1  + (Math.random() * 30));
	circle.style = {
		fillColor: new Color({ hue: ((Math.random() * 360)), saturation: 8, brightness:0.4, alpha : 0.01})
		// strokeColor: new Color({ hue: (hue * 360), saturation: 0.7, brightness:0.2}),
    	// strokeWidth: 1
    };

	// var circle_style = 
}


// function 	resize()
// {
// //	alert(this.position.x);
// 	console.log("mouahaha");
// 	console.log(this);
// 	var	delta = this.data.position.x - this.data.init;
// //	console.log("delta");
// //	console.log(delta);
// //	console.log(this.data.init);
// 	this.position.x = this.data.init;//this.data.init;
// 	this.data.line[1].point.x = this.data.init;//this.data.init;
// }

// function onMouseUp(event)
// {
// 	console.log(event);
// }



