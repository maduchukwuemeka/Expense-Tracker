export { saveToStorage, loadFromStorage}

//Saving all the list class the localstorage 
function saveToStorage(data){
    localStorage.setItem(Object.keys(data)[0], JSON.stringify(Object.values(data)[0]))
}

//getting all what to get from the localStorage transaction 
function loadFromStorage(data){
    return JSON.parse(localStorage.getItem(data)) || []
}




