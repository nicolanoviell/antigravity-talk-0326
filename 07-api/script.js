/**
 * @file script.js
 * @description Logica pe' piglià 'e quadri 'e Van Gogh e ffa 'a galleria Pop Art.
 * @author Antigravity
 */

const API_BASE = 'https://collectionapi.metmuseum.org/public/collection/v1';
const ARTIST_QUERY = 'Vincent van Gogh';

/**
 * Funzione principale: pigliamm' 'e dati e ammuostriamoli!
 */
async function loadGallery() {
    const grid = document.getElementById('gallery-grid');
    const loader = document.getElementById('loader');

    try {
        // 1. Cerchiamm' l'opere (isPublicDomain=true pe' avè l'immagini)
        console.log("🔍 Cerchiamm' Van Gogh...");
        const searchResp = await fetch(`${API_BASE}/search?q=${encodeURIComponent(ARTIST_QUERY)}&isPublicDomain=true`);
        
        if (!searchResp.ok) throw new Error("Errore 'na ricerca");
        
        const searchData = await searchResp.json();
        const ids = searchData.objectIDs.slice(0, 40); // Ne pigliamm' nu poco 'e cchiù pe' sicurezz'

        let loadedCount = 0;
        const validArtworks = [];

        // 2. Pigliamm' 'e detalje de l'opere
        for (const id of ids) {
            if (loadedCount >= 10) break;

            try {
                // Aspettamm' nu poco pe' nun abboffà 'o server
                await new Promise(r => setTimeout(r, 100));

                const objResp = await fetch(`${API_BASE}/objects/${id}`);
                if (!objResp.ok) continue;

                const art = await objResp.json();

                // Cuntrullamm' si è Van Gogh e si tène l'immagine
                if (art.artistDisplayName && art.artistDisplayName.includes("Gogh") && (art.primaryImageSmall || art.primaryImage)) {
                    validArtworks.push(art);
                    loadedCount++;
                    console.log(`✨ Truvata l'opera: ${art.title}`);
                }
            } catch (err) {
                console.error(`💥 Errore co' l'opera ${id}:`, err);
            }
        }

        // 3. Facimm' 'e carte!
        renderCards(validArtworks);

        // 4. Levamm' 'o loader
        loader.classList.add('hidden');
        grid.classList.remove('hidden');

    } catch (error) {
        console.error("🔥 Maronna! Errore generale:", error);
        loader.innerHTML = `<p style="color:red">😱 È succiess' nu guaio: ${error.message}</p>`;
    }
}

/**
 * Disegnamm' 'e carte ind''a griglia
 * @param {Array} artworks - Lista de l'opere truvate
 */
function renderCards(artworks) {
    const grid = document.getElementById('gallery-grid');
    
    artworks.forEach(art => {
        const card = document.createElement('div');
        card.className = 'card';
        
        const imageUrl = art.primaryImageSmall || art.primaryImage;
        const title = art.title || "Senza Titolo";
        const date = art.objectDate || art.objectBeginDate || "Anno ignoto";

        card.innerHTML = `
            <div class="image-container">
                <img src="${imageUrl}" alt="${title}" loading="lazy">
            </div>
            <div class="card-info">
                <h2>${title}</h2>
                <p>${date}</p>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Jammo! Partimm'!
document.addEventListener('DOMContentLoaded', loadGallery);
