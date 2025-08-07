let uebungen = [];
let trainingStartzeit = null;
let trainingEndzeit = null;

function addUebung() {
    const name = document.getElementById("uebung-name").value;
    const beschreibung = document.getElementById("uebung-beschreibung").value;
    const bildUrl = document.getElementById("uebung-bild-url").value;

    const uebung = { name, beschreibung, bildUrl, saetze: [] };
    uebungen.push(uebung);

    updateUebungsliste();
}

function updateUebungsliste() {
    const list = document.getElementById("uebungsliste");
    list.innerHTML = "";
    uebungen.forEach((uebung, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${uebung.name}</strong> – ${uebung.beschreibung} <br>
            <img src="${uebung.bildUrl}" alt="${uebung.name}" width="100">`;
        list.appendChild(li);
    });
}

function startTraining() {
    trainingStartzeit = new Date();
    document.getElementById("startzeit").innerText = trainingStartzeit.toLocaleString();
    document.getElementById("training-info").style.display = "block";

    const container = document.getElementById("satz-erfassung");
    container.innerHTML = "";
    uebungen.forEach((uebung, index) => {
        const div = document.createElement("div");
        div.innerHTML = `<h3>${uebung.name}</h3>`;
        for (let i = 0; i < 3; i++) {
            div.innerHTML += `Satz ${i+1}: Gewicht (kg) <input type="number" id="w_${index}_${i}" size="4">
                Wiederholungen <input type="number" id="r_${index}_${i}" size="4"><br>`;
        }
        container.appendChild(div);
    });
}

function beendeTraining() {
    trainingEndzeit = new Date();
    document.getElementById("endzeit").innerText = trainingEndzeit.toLocaleString();

    uebungen.forEach((uebung, index) => {
        for (let i = 0; i < 3; i++) {
            const gewicht = document.getElementById(`w_${index}_${i}`).value;
            const wh = document.getElementById(`r_${index}_${i}`).value;
            if (gewicht && wh) {
                uebung.saetze.push({ gewicht: parseFloat(gewicht), wh: parseInt(wh) });
            }
        }
    });

    console.log("Training abgeschlossen:", {
        startzeit: trainingStartzeit,
        endzeit: trainingEndzeit,
        uebungen
    });
}