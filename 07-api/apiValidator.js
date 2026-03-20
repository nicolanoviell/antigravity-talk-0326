/**
 * @file apiValidator.js
 * @description Classe pe' cuntrullà si l'API d''o Met funziunano bbuono pe' Vincent van Gogh.
 * @author Antigravity
 */

class VanGoghApiValidator {
    constructor() {
        this.baseUrl = 'https://collectionapi.metmuseum.org/public/collection/v1';
        this.searchTerm = 'Vincent van Gogh';
    }

    /**
     * Accumminciamm' a faticà! Verificamm' si l'API risponne bbuono pe' Van Gogh.
     */
    async testApi() {
        console.log("--- Accumminciamm' 'o test pe' Vincent van Gogh ---");
        
        try {
            // 1. Facimm' 'a ricerca (usamm' isPublicDomain=true pe' sicurezz')
            console.log(`🔍 Cerchiamm' '${this.searchTerm}'...`);
            const searchUrl = `${this.baseUrl}/search?q=${encodeURIComponent(this.searchTerm)}&isPublicDomain=true`;
            const searchResponse = await fetch(searchUrl);
            
            if (!searchResponse.ok) {
                throw new Error(`Mannaggia! Search API nun va: ${searchResponse.status}`);
            }

            const searchData = await searchResponse.json();
            console.log(`✅ Truvate ${searchData.total} oggette in pubblico dominio.`);

            if (!searchData.objectIDs || searchData.objectIDs.length < 10) {
                throw new Error("Guagliò, nun ce stann' abbastanza opere!");
            }

            // 2. Cuntrullamm' 'e primme 10 opere
            const validArtworks = [];
            const idsToTest = searchData.objectIDs.slice(0, 30); // Ne guardamm' 30 pe' sicurezz'

            console.log("🧪 Verificamm' 'e detalje...");

            for (const id of idsToTest) {
                if (validArtworks.length >= 10) break;

                try {
                    // Mettimm' nu poco 'e pausa pe' nun fà 'ncazzà 'o server
                    await new Promise(r => setTimeout(r, 200));

                    const objectUrl = `${this.baseUrl}/objects/${id}`;
                    const objectResponse = await fetch(objectUrl);
                    
                    if (!objectResponse.ok) {
                        console.warn(`⚠️ L'opera ${id} nun s'arap'!`);
                        continue;
                    }

                    const art = await objectResponse.json();

                    // Cuntrullamm' si è veramente 'e Van Gogh e si tène l'immagine
                    const isVanGogh = art.artistDisplayName && art.artistDisplayName.includes("Gogh");
                    const hasTitle = art.title && art.title.trim() !== "";
                    const hasImage = art.primaryImage || art.primaryImageSmall;
                    const hasDate = art.objectDate || art.objectBeginDate;

                    if (isVanGogh && hasTitle && hasImage && hasDate) {
                        validArtworks.push({
                            id: art.objectID,
                            title: art.title,
                            image: art.primaryImageSmall || art.primaryImage,
                            date: art.objectDate
                        });
                        console.log(`✨ [${validArtworks.length}/10] '${art.title}' va bbuono!`);
                    } else {
                        // console.log(`❌ L'opera ${id} nun va bbuono.`);
                    }
                } catch (err) {
                    console.error(`💥 Errore co' l'opera ${id}:`, err.message);
                }
            }

            if (validArtworks.length < 10) {
                console.error(`🛑 Ne vulimm' 10, ma ne avimm' truvate sulo ${validArtworks.length}.`);
                return false;
            }

            console.log("\n🎉 TUTTO A POSTO! L'API funziuna 'na bellezza!");
            console.log("--- Riassunto ---");
            validArtworks.forEach((a, i) => {
                console.log(`${i+1}. ${a.title} (${a.date})`);
            });
            
            return true;

        } catch (error) {
            console.error("🔥 Maronna mia! È succiess' 'n urreggia:", error.message);
            return false;
        }
    }
}

// Mo' facimm' correre 'o test
const validator = new VanGoghApiValidator();
validator.testApi().then(success => {
    if (!success) process.exit(1);
});
