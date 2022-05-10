const STORAGE_KEY = '__cart'

let saveListener: ((arg0: any) => void) | null = null;

export const listen = (cb: any) => { saveListener = cb }; // ugly but storage listener is not working for the same window..

export const list = (key: any) => {
	let userData = [];
	try {
		// Parse a JSON
		userData = JSON.parse(window.localStorage.getItem(key || STORAGE_KEY) as string) || []; 
	} catch (e) {
		// You can read e for more info
		// Let's assume the error is that we already have parsed the payload
		// So just return that
		userData = [];
	}

	console.log("[MODULE=CHACHE] list key: ", key, userData)
	return userData;

};

// export const products = () => JSON.parse(JSON.stringify(data)) || [];

// export const user = () => JSON.parse(JSON.stringify(userData)) || {};

export const save = async (data: any, key: any) => {
	console.log("[MODULE=CHACHE] save key: ", key, data)
	let saved:any;
	try {
		// Parse a JSON
		saved = window.localStorage.setItem(key || STORAGE_KEY, JSON.stringify(data));
	} catch (e) {
		// You can read e for more info
		// Let's assume the error is that we already have parsed the payload
		// So just return that
		return e
	}
	// if(saveListener) saveListener(list(key || STORAGE_KEY))
	return saved;
	
}

export const clear = (key: any) => {
	typeof window.localStorage.removeItem(key || STORAGE_KEY)
	if(saveListener) saveListener(list(key || STORAGE_KEY))
}