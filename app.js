const morseAbeceda = {
    "A": ".-", "B": "-...", "C": "-.-.", "D": "-..", "E": ".", "F": "..-.",
    "G": "--.", "H": "....", "CH": "----", "I": "..", "J": ".---", "K": "-.-",
    "L": ".-..", "M": "--", "N": "-.", "O": "---", "P": ".--.", "Q": "--.-",
    "R": ".-.", "S": "...", "T": "-", "U": "..-", "V": "...-", "W": ".--",
    "X": "-..-", "Y": "-.--", "Z": "--..",
    "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
    "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----",
    " ": "/"
};

// Načtení textu z inputu a příprava krabiček na výsledek a chyby
function spustPrevod(smer) {
    // Načtení textu z inputu a příprava krabiček na výsledek a chyby
    let vstup = document.getElementById("vstupniText").value;
    let vysledekBox = document.getElementById("vysledek");
    let chybaBox = document.getElementById("chyba");

    // Vyčistíme web od minula
    vysledekBox.textContent = "";
    chybaBox.textContent = "";
    chybaBox.style.display = "none";

    try {
        // kontrola prázdného pole
        if (vstup === "") {
            throw "Musíte zadat nějaký text nebo kód k převodu!";
        }

        let konecnyVysledek = "";

        // Podle parametru z tlačítka poznáme, co chceme překládat
        if (smer === "toMorse") {
            konecnyVysledek = textNaMorse(vstup);
        } else if (smer === "toText") {
            konecnyVysledek = morseNaText(vstup);
        }

        vysledekBox.textContent = konecnyVysledek;

    } catch (chyba) {
        // Zachycení chyb a zobrazení boxu
        chybaBox.textContent = "Chyba: " + chyba;
        chybaBox.style.display = "block";
        vysledekBox.textContent = "Chyba při převodu.";
    } finally {
        console.log("Převod ve směru " + smer + " byl dokončen.");
    }
}

// Funkce pro převod z normálního textu do Morseovky
function textNaMorse(text) {
    // Na velká písmena at nemusíme řešit i malá
    let velkyText = text.toUpperCase();
    let vyslednyText = "";

    // Projíždění textu písmeno po písmenu
    for (let i = 0; i < velkyText.length; i++) {
        let pismeno = velkyText[i];
        let nalezenyKod = "";

        // Prohledávání slovníku, jestli tam písmeno je
        for (let klic in morseAbeceda) {
            if (klic === pismeno) {
                nalezenyKod = morseAbeceda[klic];
                break;
            }
        }

        // Pokud jsme kód našli, přičteme ho k textu a přidáme za něj mezeru
        if (nalezenyKod !== "") {
            vyslednyText = vyslednyText + nalezenyKod + " ";
        } else {
            // Pokud znak ve slovníku není
            throw "Znak '" + pismeno + "' nelze převést. Zadejte text bez diakritiky.";
        }
    }

    return vyslednyText;
}

// Funkce pro převod z Morseovky do normálního textu
function morseNaText(morse) {
    // Rozsekáme kód podle mezer na jednotlivé znaky
    let znaky = morse.split(" ");
    let vyslednyText = "";

    for (let i = 0; i < znaky.length; i++) {
        let kod = znaky[i];

        // přeskočení prázdného místa
        if (kod === "") {
            continue;
        }

        let nalezenePismeno = "";

        // Hledáme v objektu podle hodnoty (kódu) zpátky to písmeno
        for (let klic in morseAbeceda) {
            if (morseAbeceda[klic] === kod) {
                nalezenePismeno = klic;
                break;
            }
        }

        // Přidáme písmeno do slova, nebo vyhodíme chybu, pokud zadal neexistující kód
        if (nalezenePismeno !== "") {
            vyslednyText = vyslednyText + nalezenePismeno;
        } else {
            throw "Kód '" + kod + "' neexistuje v Morseově abecedě.";
        }
    }

    return vyslednyText;
}