// Load the list of cotisations from the backend
function loadList() {
    fetch('../php/get_participations.php')
        .then(response => response.json())
        .then(data => {
            let content = '<h3>Liste des Cotisations</h3><ul class="list-group">';
            if (data.message) {
                content = `<p>${data.message}</p>`;
            } else {
                data.forEach(cotisation => {
                    content += `<li class="list-group-item">
                                    <strong>${cotisation.nom} ${cotisation.prenom}</strong> - 
                                    Montant: ${cotisation.montant} FCFA
                                </li>`;
                });
            }
            content += '</ul>';
            document.getElementById('content').innerHTML = content;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('content').innerHTML = '<p>Erreur lors du chargement des cotisations. Veuillez réessayer plus tard.</p>';
        });
}

// Load the form to add a new cotisation
function loadAddForm() {
    let content = `
        <h3>Ajouter une Cotisation</h3>
        <form id="addForm">
            <div class="mb-3">
                <label for="nom" class="form-label">Nom</label>
                <input type="text" class="form-control" id="nom" required>
            </div>
            <div class="mb-3">
                <label for="prenom" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="prenom" required>
            </div>
            <div class="mb-3">
                <label for="montant" class="form-label">Montant</label>
                <input type="number" class="form-control" id="montant" required>
            </div>
            <button type="submit" class="btn btn-primary">Ajouter</button>
        </form>
    `;
    document.getElementById('content').innerHTML = content;

    // Handle form submission
    document.getElementById('addForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const montant = document.getElementById('montant').value;

        // Validate the montant field (ensure it's positive)
        if (montant <= 0) {
            alert('Le montant doit être supérieur à zéro.');
            return;
        }

        fetch('../php/add_participations.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `nom=${nom}&prenom=${prenom}&montant=${montant}`
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            loadList();  // Reload the list of cotisations
            document.getElementById('addForm').reset();  // Reset form fields
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Une erreur est survenue. Veuillez réessayer plus tard.');
        });
    });
}

// Load the About section
function loadAbout() {
    const content = `
        <h3>A Propos</h3>
        <p>Ceci est une application pour gérer les cotisations de Ndogou 3ème Edition.</p>
    `;
    document.getElementById('content').innerHTML = content;
}

// Load the list of cotisations when the page is loaded
window.onload = loadList;
