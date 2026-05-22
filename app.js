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

// Funkce, která ovládá tlačítka a dává signál, které uživatel zadal tlačíko
function spustPrevod(smer) {
    let vstup = document.getElementById("vstupniText").value;
    let vysledekBox = document.getElementById("vysledek");
    let chybaBox = document.getElementById("chyba");

    vysledekBox.textContent = "";
    chybaBox.textContent = "";
    chybaBox.style.display = "none";

    try {
        // kontrola prázdného pole
        if (vstup === "") {
            throw "Musíte zadat nějaký text nebo kód k převodu!";
        }

        let konecnyVysledek = "";

        if (smer === "toMorse") {
            konecnyVysledek = textNaMorse(vstup);
        } else if (smer === "toText") {
            konecnyVysledek = morseNaText(vstup);
        }

        vysledekBox.textContent = konecnyVysledek;

    } catch (chyba) {
        chybaBox.textContent = "Chyba: " + chyba;
        chybaBox.style.display = "block";
        vysledekBox.textContent = "Chyba při převodu.";
    } finally {
        console.log("Převod ve směru " + smer + " byl dokončen.");
    }
}

// Funkce pro převod z normálního textu do Morseovky
function textNaMorse(text) {
    let velkyText = text.toUpperCase();
    let vyslednyText = "";

    for (let i = 0; i < velkyText.length; i++) {
        let pismeno = velkyText[i];
        let nalezenyKod = "";

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
    // Rozdělíme text podle mezer do pole
    let znaky = morse.split(" ");
    let vyslednyText = "";

    for (let i = 0; i < znaky.length; i++) {
        let kod = znaky[i];

        // Obyčejné přeskočení prázdného místa
        if (kod === "") {
            continue;
        }

        let nalezenePismeno = "";

        // Prohledávání slovníku
        for (let klic in morseAbeceda) {
            if (morseAbeceda[klic] === kod) {
                nalezenePismeno = klic;
                break;
            }
        }

        if (nalezenePismeno !== "") {
            vyslednyText = vyslednyText + nalezenePismeno;
        } else {
            throw "Kód '" + kod + "' neexistuje v Morseově abecedě.";
        }
    }

    return vyslednyText;
}