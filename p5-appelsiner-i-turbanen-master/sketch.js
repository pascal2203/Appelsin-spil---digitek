/*
Først laver vi nogle variable til at lave en appelsin:
 - en kugle som vi vil skyde afsted og fange i en turban
*/

// Appelsinen
const grav = 0.1; // acceleration i nedadgående retning, lige som tyngde
let x = 0; 
let y = 520;
const rad = 20;
let yspeedmax;
let farttid;
let xspeedmax;
let yspeed;
let xspeed;
let newspeed;
const col = [220,110,0];
// Turbanen
let turban;
// Øvrige
let tid = 150;
let score = 0;
let missed = 0;
let liv = 8;
let spilIgang = true;   //flag

/* 
 * 
 */
function setup() {  // kører kun en gang, når programmet startes
    createCanvas(750, 600);

    textAlign(CENTER, CENTER);

    shootNew()
    x = rad;
    // parametrene til Kurv-konstruktøren er (x, y, bredde, dybde, speed)
    turban = new Kurv(670, 100, 70, 50, 10);
}

function draw() {
    background(0);

    if (liv == 8|| liv == 6 || liv == 4|| liv == 2){
        if (spilIgang) {
            move();
            checkScore();
            display();
            if (keyIsDown(UP_ARROW)) {
                turban.moveY(-5);
            }
            if (keyIsDown(DOWN_ARROW)) {
                turban.moveY(5);
            }    
            if (keyIsDown(LEFT_ARROW)) {
                turban.moveX(-5);
            }
            if (keyIsDown(RIGHT_ARROW)) {
                turban.moveX(5);
            } 
        }
    }
    else if (liv == 7 || liv == 5 || liv == 3|| liv == 1){
        if (spilIgang) {
            move();
            checkScore();
            display();
            if (keyIsDown(UP_ARROW)) {
                turban.moveY(5);
            }
            if (keyIsDown(DOWN_ARROW)) {
                turban.moveY(-5);
            }    
            if (keyIsDown(LEFT_ARROW)) {
                turban.moveX(5);
            }
            if (keyIsDown(RIGHT_ARROW)) {
                turban.moveX(-5);
            } 
        }
    }
    else {  // så er Game Over det der skal vises
        fill(col);
        textSize(46);
        text("Game Over",width/2 + random(-5,5), height/2 + random(3 ));
        text("Score: "+score, width/2, height/2 + 50);
        text("Missede appelsiner: "+missed,width/2, height/2 + 100)
    }
}

function display() {
    fill(255);
    textSize(12);
    text("Score: "+score, width-80, 30);
    text("Liv: " + liv, width-160, 30);
    
    //Her skal vi sørge for at appelsinen bliver vist, hvis den skal vises
    if(tid > 0) {
        tid -= 1;
    }
    if (tid < 100) {
        fill(col);
        ellipse(x, y, rad*2, rad*2);

    }

    // Her vises turbanen - foreløbig blot en firkant
    turban.tegn();
}
    
function move() {
    //Her skal vi sørge for at appelsinen bevæger sig, hvis den er startet
    if (tid <= 0) {
        x += xspeed;
        y += yspeed;
        yspeed += grav;
    }
    if (x > width || y > height) {
        missed += 1;
        liv -= 1;
        if (liv < 1) {
            spilIgang = false;
        }
        shootNew();
    }
}

function checkScore() {
    // Her checkes om turbanen har fanget appelsinen. Hvis ja, skydes en ny appelsin afsted
    if (yspeed > 0) {
        if (turban.grebet(x, y, rad)) {
            score += 1;
            shootNew(); 
        }
    }
}
    
function shootNew() {
    //Her skal vi sørge for at en ny appelsin skydes afsted 
    x = rad;
    //y = 520;
    y = Math.floor(Math.random()*550);
    yspeedmax = -(Math.sqrt(2*grav*(y-rad)));
    farttid = (-yspeedmax+Math.sqrt(2*grav*730+yspeedmax*yspeedmax))/grav
    xspeedmax = 730/farttid

    yspeed = random(yspeedmax,-1);
    farttid = (-yspeed+Math.sqrt(2*grav*730+yspeed*yspeed))/grav
    xspeed = random(730/farttid,2)
    tid = random(400);
    console.log(yspeed)
    console.log(farttid)
    console.log(xspeed)
}


function keyPressed() {
    // Funktionen gør ingenting lige nu
    return false;  // Forebygger evt. browser default behaviour
}

/*
OPGAVER
 Opgave 1 - undersøg hvad variablerne  grav  og  tid  bruges til, og hvor.
            Skriv det i kommentarer, prøv at se hvad der sker, når
            I laver dem om. 

 Opgave 2 - lav programmet om så det er tilfældigt hvor højt oppe 
            på venstre kan appelsinerne starter. Overvej om man kan 
            sikre, at appelsinen ikke ryger ud af skærmens top men 
            stadig har en "pæn" bane.

 Opgave 3 - ret programmet til, så det også angives hvor mange 
            appelsiner man IKKE greb med turbanen

 Opgave 4 - Undersøg hvad scriptet  kurv.js  er og gør, og forklar 
            lidt mere detaljeret end det er gjort nu hvad sammenhængen 
            mellem dette script og turbanen i  sketch.js  er. 
            Skriv det som kommentarer i toppen af  kurv.js
            Prøv jer frem med forskellige løsninger for hvor hurtigt 
            turbanen skal rykke. 

 Opgave 5 - Find et billede af en turban og sæt det ind i stedet 
            for firkanten. Find eventuelt også en lyd, der kan afspilles, 
            når appelsinen gribes. Se gerne i "p5 Reference" hvordan, 
            hvis ikke I kan huske det:   https://p5js.org/reference/
            
 Opgave 6 - Lav en Appelsin-klasse, lige som der er en Kurv-klasse. 
            Flyt koden til appelsinen ud i et selvstændigt script.
            Overvej hvad det skal hedde, og hvilke variabler og funktioner, 
            der skal lægges over i det nye script, herunder hvordan det 
            kommer til at berøre turbanen. Skriv jeres overvejelser i 
            kommentarerne

 Opgave 7 - Ret programmet til, så der kan være flere appelsiner i 
            luften på en gang, dvs. at der kan skydes en ny appelsin
            afsted før den foregående er forsvundet. Overvej hvordan 
            og hvor hurtigt de skal skydes af, for at det kan gøre spillet
            sjovere og mere udfordrende, og forklar jeres tanker
            i kommentarerne

 Opgave 8 - Ret programmet til, så det kan vindes og/eller tabes ved
            at man griber eller misser et antal appelsiner. Sørg for 
            at der vises en "Game Over"-skærm, som fortæller om man 
            vandt eller tabte, og som giver mulighed for at starte et
            nyt spil. Se evt. om I kan lave en løsning så turbanens
            bevægelseshastighed, skydetempoet med appelsinerne og andre
            ting kan justeres mens man spiller. Lav evt. programmet om, 
            så man kan flytte turbanen med musen


*/
