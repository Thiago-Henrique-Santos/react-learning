const baseURL = 'http://127.0.0.1:3333/api';

async function getAll() {
    const completeURL = baseURL + '/person';
    
    try {
        let response = await fetch(completeURL, {
            method: "GET"
        });

        const data = await response.json();

        return data;
    } catch(error) {
        console.error(error);
        throw error;
    }
}

export {
    getAll
};