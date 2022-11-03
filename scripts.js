/* Sziasztok, lekommenteztem végig a feladatot, nemcsak onnan ameddig megoldottuk,
hiszen Gergő hiányzott. Remélem ezek szerint sikerül mindenkinek átnéznie.

A kijelzőn meg fogunk jeleníteni mindig egy állapotot, amit a user beküld számot,
annak lesz egy állapot, majd művelet, és újabb szám, végül eredmény.
SZÁMOLÁSHOZ SZÜKSÉGES VÁLTOZÓK létrehozása az állapotok meghatározásához:
Haszonos taktika lehet összetettebb programok esetében, hogy a constansokat
nagybetűvel írjuk, a változókat pedig kisbetűvel, így később is látjuk, 
hogy a constansokat ne is próbáljuk meg felül írni, változtatni. 
Ezekre azért van szükség, hogy legyen valami fix érték, 
amire tudunk hivatkozni, mivel később az elágazásoknál ezeket fogjuk használni. 
Ezért kell nekik adnunk valamilyen értéket is, hogy meg tudjuk különböztetni 
egymástól, érték lehet akár szám is, lényeg az, hogy a végén a konstanssal
hasonlítjuk össze a státuszt.

Azért csak 4 konstanst hozunk létre, mert mindig 3 helyre írunk, első szám, operátor,
második szám, ha egyenlőségjelet írunk akkor az első szám helyére kerül az eredmény,
ha újabb operátor jelet ütünk le akkor az eredmény bekerül az első szám helyére,
az újabb operátor jel pedig utána.
 */
const STATUS_FIRSTNUM = "firstnum",
    STATUS_OPERAND = "operand",
    STATUS_SECONDNUM = "secondnum",
    STATUS_DONE = "done";

//1-lépés  adjuk hozzá az általános változókat

let number1 = null,
    number2 = null,
    operand = null,
    /*ezt a 3 változót fogjuk folyamatosan kilogolni az oldalra, 
    a 3 db span tagbe amiket a htmlben létre hozunk a következő lépésben*/

    //a constansok után hozzuk létre, majd térjünk vissza az onnumber és onoperand click függvényekhez
    status = STATUS_FIRSTNUM; // firstnum || operand || secondnum || done

// ELEMEK ÖSSZEGYŰJTÉSE

// 3-ik lépés a kijelző elemek
let displayNumber1 = document.getElementById("displayNumber1");
let displayNumber2 = document.getElementById("displayNumber2");
let displayOperand = document.getElementById("displayOperand");

//teszteljük is le: console.log(displayNumber1, displayNumber2, displayOperand)
// html-ben hozzuk létre a számokat


//szám gombok elátrolása változóba 
//(ez így elég repetatív lett, meg lehet oldani javascripttel, de kezdetnek átláthatóbb lesz)
let button0 = document.getElementById("button0");
let button1 = document.getElementById("button1");
let button2 = document.getElementById("button2");
let button3 = document.getElementById("button3");
let button4 = document.getElementById("button4");
let button5 = document.getElementById("button5");
let button6 = document.getElementById("button6");
let button7 = document.getElementById("button7");
let button8 = document.getElementById("button8");
let button9 = document.getElementById("button9");

// operandus gombok eltárolása változókba
let buttonAdd = document.getElementById("buttonAdd");
let buttonMinus = document.getElementById("buttonMinus");
let buttonTimes = document.getElementById("buttonTimes");
let buttonDivide = document.getElementById("buttonDivide");
let buttonEquals = document.getElementById("buttonEquals");

//  ESEMÉNYEK

/* adjuk meg a gomb esetében milyen eseményre akarunk reagálni, és nézzük meg mit is csinál, 
ez egy darab event paramétert fog nekünk átadni, és itt is el tudjuk érni magát az elemet a this-el, 
button0.addEventListener('click', function(event){
  let currentButton = this; azért érdemes elnevezni a this-t, mert így ha ránézünk a kódra, 
  akkor tudhatjuk, hogy ez most melyik gomb, a thist mindenhol this-ek hívják, és ha több helyen 
  is szerepel , akkor bele lehet zavarodni, hol tartunk.
  console.log(currentButton); //ezzel kiírja nekünk a this-t tehát magát az elemet  a konzolba.
   Bár nekünk nem pont ez fog kelleni, hanem a thisnek az innertextje, egészítsük ki és nézzük meg:
  console.log(currentButton.innerText); kiír egy 0-t
  console.log(currentButton.innerText + currentButton.innerText);
kiír két nullát a konzolra, érdemes megkülönböztetni, azt hogy számot látunk a konzolon vagy 
sztringet. (felül a button gombot írjuk át button1.addEventlistener...stb- mert így beszédesebb) 
ha lekérjük a szöveget azaz az innertextet, az onnantól kezdve nekünk egyszöveges érték lesz. 
Ha ezt számértékként akarjuk kiíratni csak annyit kell tenni, hogy elé írni egy-egy + jellet:
console.log(+currentButton.innerText + +currentButton.innerText);
})
Nézzük meg így:
button1.addEventListener('click', function(event) {
    let currentButton = this;
    let currentNumber = +currentButton.innerText;
    console.log(event);
})
ha most kattintunk a számra akkor kiírja azt, hogy ez egy mouse event volt, kiír egy ccsomó hasznos dolgot pl hol kattintottak rá, hol volt az egér stb.láthatjuk a targetet, hogy mi történt 
*/
// szám click - esemény figyelés

button0.addEventListener("click", OnNumberClick);
button1.addEventListener("click", OnNumberClick);
button2.addEventListener("click", OnNumberClick);
button3.addEventListener("click", OnNumberClick);
button4.addEventListener("click", OnNumberClick);
button5.addEventListener("click", OnNumberClick);
button6.addEventListener("click", OnNumberClick);
button7.addEventListener("click", OnNumberClick);
button8.addEventListener("click", OnNumberClick);
button9.addEventListener("click", OnNumberClick);

// ESEMÉNYKEZELŐK

/*
gombnyomásra reagálást próbáljuk ki:
function OnNumberClick() {
    let currentButton = this;
    let currentNumber = +currentButton.innerText;
    próbáljuk ki, hogy az összes gombunk működik e:
    console.log(currentNumber); és kattintsuk végig az összes számunkat,
    közben figyeljük a konzolra kiírja e az eredményt, ha szépen kiírja a konzolba akkor jól csináltuk. 
    Ezzel elkészült az első eseménykezelős kódunk
}
mehetünk tovább:
*/
/*operandus click - meg kell mondanunk milyen eseményre akarunk reagálni*/

buttonAdd.addEventListener("click", OnOperandClick);
buttonMinus.addEventListener("click", OnOperandClick);
buttonTimes.addEventListener("click", OnOperandClick);
buttonDivide.addEventListener("click", OnOperandClick);
buttonEquals.addEventListener("click", OnOperandClick);

/*

function OnNumberClick() {
    let currentButton = this;
    let currentNumber = +currentButton.innerText;
}

function OnOperandClick() {
    // adatok begyűjtése
    let currentButton = this;
    let currentOperand = currentButton.innerText;
    console.log(currentOperand);
}
    ezzel letesztelhetjük működnek e a gombok, amit kiad azok sztringek. 
    Következő kérdés, hogyan tudunk lefutattni egy 1+2 műveletet. 
    Van egy olyan függvény, hogy eval azaz kiértékelés, ki is próbálhatjuk a konzolon beírjuk:
    eval('1+2') kiadja hogy 3. Láthatjuk, ha megadunk neki egy sztringet, amiben benne 
    vannak a számok, akkor ki fogja nekünk értékelni és kiadja nekünk, hogy ez mennyi volt.
    Ezzel már könnyű dolgunk lesz, mert ha megvannak a számok és hozzá fűzünk egy sztringet, 
    akkor azt is kiérteli:
    eval(2 + '+' +2) nyomunk egy entert kiértékeli és megkapjuk hogy 4.

    Következő az értékadó függvények 
   
*/

// ÉRTÉKbeállító értékadó FÜGGVÉNYEK
// number1

function SetNumber1(value) {
    number1 = value;
    displayNumber1.innerText = value;
}

// number2

function SetNumber2(value) {
    number2 = value;
    displayNumber2.innerText = value;
}

// operand

function SetOperand(value) {
    operand = value;
    displayOperand.innerText = operand;
}
/*
Fontos, hogy az állapotokot tudjuk kezelni, amit az ábrán meg is néztünk.
erre létre kell hoznunk néhány constanst az egész kódunk elejére

*/

function OnNumberClick() {
    // adatok begyűjtése
    let currentElement = this;
    let currentNumber = +currentElement.innerText;

    // logika
    /*a switc-hel ugye nemcsak azt mondom meg, milyen értéket akarok vizsgálni, nemcsak a változót 
    lehet belerakni, hanem akár egy függvény hívást is, csak akkor a függvény hívásnak vissza kell 
    térnie valamilyen értékkel, és akkor azt fogja vizsgálni majd a switch.   
        A statuszt fogjuk vizsgálni, pontosabban azt, hogy a felül létrehozott 4 konstans melyik 
        értékét vette föl, azaz milyen állapotban vagyunk most éppen.

        switch (status) {
            case STATUS_FIRSTNUM:
                console.log('első szám');
                break; ha kattintunk egy számra ki is írja a konzolra nekünk hogy első szám
        }
    }
          nekünk igazából viszont azt kell tennünk, hogy az adott számhoz, hozzá kelle írnunk a fent írt első számnak az értékéhez  
           case STATUS_FIRSTNUM:
            // első számhoz fűzés
            SetNumber1(number1 * 10 + currentNumber); azért szorzzuk meg 10-el, hogy egy helyiértékkel balra tudjuk tolni, és be tudjunk írni mögé másik számot, és hozzá adhatjuk az aktuális számot. (1*10 ebből lesz tizen akármennyi amit mögé írunk, vagy 2*10 abból lesz huszonakármennyi, amennyit mögé írunk. Tehát minden egyes gomb nyomásnál lökünk egyet rajta balra, és beíródik az érték. Ugyanezt fogjuk csinálni a második számnál is)
            Műveletet az operand függvényhez megyünk
            break;
         */

    switch (status) {
        //elsőként ezt írjuk fel
        case STATUS_FIRSTNUM:
            // első számhoz fűzés
            SetNumber1(number1 * 10 + currentNumber);
            break;
            //létre kell hoznunk ez első opreandot a másik függvénynél

        case STATUS_OPERAND:
            status = STATUS_SECONDNUM;

        case STATUS_SECONDNUM:
            /* második számhoz fűzés, amikor az operandus begyűjtés állapotból a második számot 
            akarunk begyűjteni, akkor */
            SetNumber2(number2 * 10 + currentNumber);
            break;

        case STATUS_DONE:
            // új szám beírása
            SetNumber1(currentNumber);
            status = STATUS_FIRSTNUM;
            break;
    }
    console.log("status: ", status);
}

function OnOperandClick() {
    // adatok begyűjtése
    let currentElement = this;
    let currentOperand = currentElement.innerText;

    // logika
    /*
    case STATUS_FIRSTNUM:
           SetOperand(currentOprand); arra is fel kell készítenünk a rendszert, ha a user meggondolja magát és más operandust akar megadni, 
           status = STATUS_OPERAND;
           break;
            }
           
    */
    //////////////////////////////itt folytatni szerdán
    switch (status) {
        //elsőként ezt hozzuk létre
        case STATUS_FIRSTNUM:
            // egy számra nem engedünk egyenlőséget
            if (currentOperand == "=") {
                break;
            }

            // operandus beállítás
            SetOperand(currentOperand);

            // státusz billentés
            status = STATUS_OPERAND;
            break;

        case STATUS_OPERAND:
            // egy számra nem engedünk egyenlőséget
            if (currentOperand == "=") {
                break;
            }

            // operandus mentése
            SetOperand(currentOperand);
            break;

        case STATUS_SECONDNUM:
            /*
            számítsuk ki az eddigieket: 
            
            let answear = eval(number1 + opreand + number2);
            console.log(result) 
            
            : próbáljuk ki, majd ezt be kell írni az első szám értékébe, a setnumber1-be:
            SetNumber1(result);
            új művelet összegyűjtése: mivel történt egy kis módosítást, akkor a második számot ki kell üríteni, és a régi opeandust felül kell írni az újjal:
            SetNumber2(null);//kiürítés
            SetOperand(currentOperand); //új művelet beállítása, hogy ne a régit használja, tehát már le tudja kezelni, hogy pl.12+3*2
            állapot billentése
            status = STATUS_DONE;
            break;
            
        
            */
            // eddigiek kiszámítása
            let answer =
                Math.round(eval(number1 + operand + number2) * 1000) / 1000;
            /*ha nem szeretnénk hogy egy osztás esetén végtelen tizedeseket írjon, akkor azt a már ismert round-al tudjuk megoldani, de hogy hány helyiértékig keretkítsen azt az 1000-el való szorzással és osztással tudjuk megadni, ha 10.000 el tesszük 4 helyiértéket hagy, ezerrel pedig 3 helyi értéket.*/

            // válaszérték beszúrása első helyre
            SetNumber1(answer);

            // második szám ürítése
            SetNumber2(null);

            if (currentOperand == "=") {
                // státusz billentés
                status = STATUS_DONE;

                // operandus ürítése
                SetOperand(null);
            } else {
                // operandus mentése
                SetOperand(currentOperand);

                // státusz billentés
                status = STATUS_OPERAND;
            }
            break;

        case STATUS_DONE:
            // egy számra nem engedünk egyenlőséget
            if (currentOperand == "=") {
                break;
            }
            status = STATUS_FIRSTNUM;
    }
    console.log("status: ", status);
}

/**Feladat: próbáljátok meg szépen ledokumentálni a feladatot lépésenként,
 * angol fordítást is kérek hozzá, amit Szilvivel majd átbeszéltek.
 */