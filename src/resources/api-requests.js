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

async function getPersonByName(fullName) {
    const completeURL = baseURL + `/person/resource?name=${fullName}`;
    
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

async function getPersonById(id) {
    const completeURL = baseURL + `/person/${id}`;
    
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

async function createPerson (data) {
    try {
        const fetchData = await fetch('http://localhost:3333/api/person', {
            method: "POST",
            body: JSON.stringify(data)
        });

        const response = fetchData.json();

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function updatePerson (data) {
    try {
        const fetchData = await fetch('http://localhost:3333/api/person', {
            method: "PUT",
            body: JSON.stringify(data)
        });

        const response = fetchData.json();

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function deletePerson (id) {
    try {
        const fetchData = await fetch(`http://localhost:3333/api/person/${id}`, {
            method: "DELETE"
        });

        const response = fetchData.json();

        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export {
    getAll,
    getPersonByName,
    getPersonById,
    createPerson,
    updatePerson,
    deletePerson
};