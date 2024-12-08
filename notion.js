
export default async function handler(req, res) {
    const DATABASE_ID = '156bacdb4b9880ff808af4fa7ad149d9';
    const NOTION_API_KEY = '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';

    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
    }

    try {
        const url = `https://api.notion.com/v1/databases/${DATABASE_ID}/query`;
        console.log('🔍 URL de la requête Notion:', url);
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${NOTION_API_KEY}`,
                'Notion-Version': '2022-06-28'
            }
        });

        if (!response.ok) {
            console.error('❌ Erreur API Notion - Statut:', response.status, 'URL:', url);
            const errorData = await response.json();
            console.error('🛠️ Détails de l'erreur:', errorData);
            throw new Error(`Erreur API Notion : ${response.status}`);
        }

        const data = await response.json();
        console.log('📦 Données reçues de Notion:', data);
        res.status(200).json(data);

    } catch (error) {
        console.error('🔥 Erreur API Notion:', error);
        res.status(500).json({ error: 'Erreur de l'API Notion' });
    }
}
