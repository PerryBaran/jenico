export function getLocalStorage(value:string) {
    if (!localStorage.getItem(value)){
        return undefined;
    } else {
        const retrieveStorage = localStorage.getItem(value);
        if (retrieveStorage) {
            return JSON.parse(retrieveStorage)
        }
        return undefined;
    }
}

export function populateStorage(name: string, value: any) {
    localStorage.setItem(name, JSON.stringify(value));
}