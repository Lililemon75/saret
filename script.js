
const url = '/api/notion';

async function fetchNotionData() {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            console.error('❌ Erreur API Notion - Statut:', response.status);
            throw new Error(`Erreur API Notion : ${response.status}`);
        }

        const data = await response.json();
        console.log('📦 Données reçues de Notion:', data);

        const results = data.results;
        const instagramFeed = document.getElementById('instagram-feed');
        const storiesHighlights = document.getElementById('stories-highlights');

        results.forEach(item => {
            const imageUrl = item.properties.Image?.files[0]?.file?.url;
            const type = item.properties.Type?.select?.name;

            if (imageUrl && type === 'Photo') {
                const photoDiv = document.createElement('div');
                photoDiv.classList.add('instagram-photo');
                photoDiv.innerHTML = `<img src="${imageUrl}" alt="Photo Instagram" loading="lazy">`;
                instagramFeed.appendChild(photoDiv);
            }

            if (imageUrl && type === 'Story') {
                const storyDiv = document.createElement('div');
                storyDiv.classList.add('story');
                storyDiv.innerHTML = `<img src="${imageUrl}" alt="Story Highlight" loading="lazy">`;
                storiesHighlights.appendChild(storyDiv);
            }
        });

    } catch (error) {
        console.error('❌ Erreur de chargement des données Notion', error);
    }
}

fetchNotionData();
