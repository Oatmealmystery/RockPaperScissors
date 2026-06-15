async function laadFeestdagen() {

    const lijst = document.getElementById("feestdagen-lijst");

    try {


        const jaar = new Date().getFullYear();


        const response = await fetch(
            `https://date.nager.at/api/v3/PublicHolidays/${jaar}/NL`
        );


        const feestdagen = await response.json();

        const vandaag = new Date();

        const toekomstigeFeestdagen = feestdagen.filter(feestdag => {
            return new Date(feestdag.date) >= vandaag;
        });


        lijst.innerHTML = "";


        if (toekomstigeFeestdagen.length === 0) {

            lijst.innerHTML = "<li>Geen aankomende feestdagen gevonden.</li>";
            return;
        }
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


laadFeestdagen();