async function laadFeestdagen() {

    const lijst = document.getElementById("feestdagen-lijst");

    try {

        // Huidig jaar ophalen
        const jaar = new Date().getFullYear();

        // API request
        const response = await fetch(
            `https://date.nager.at/api/v3/PublicHolidays/${jaar}/NL`
        );

        // JSON data omzetten
        const feestdagen = await response.json();

        // Vandaag
        const vandaag = new Date();

        // Alleen toekomstige feestdagen
        const toekomstigeFeestdagen = feestdagen.filter(feestdag => {
            return new Date(feestdag.date) >= vandaag;
        });

        // HTML leegmaken
        lijst.innerHTML = "";

        // Controleren of er nog feestdagen zijn
        if (toekomstigeFeestdagen.length === 0) {

            lijst.innerHTML = "<li>Geen aankomende feestdagen gevonden.</li>";
            return;
        }

        // Eerstvolgende 3 feestdagen tonen
        toekomstigeFeestdagen.slice(0, 3).forEach(feestdag => {

            const li = document.createElement("li");

            li.innerHTML = `
                <strong>${feestdag.localName}</strong><br>
                Datum: ${feestdag.date}
            `;

            lijst.appendChild(li);

        });

    } catch (error) {

        console.error(error);

        lijst.innerHTML = "<li>Fout bij laden van feestdagen.</li>";
    }
}

// Functie uitvoeren
laadFeestdagen();