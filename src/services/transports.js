// Somme very simple service for getting or sending data 
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

export const getData = async ({url}) => {
    return await fetch(url)
        .then(handleErrors)
        .then(async response => {
            return await response.json();
        })
        .catch(error => error );
}