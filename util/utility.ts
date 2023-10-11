
export function getLocalStorage(){
	if(typeof window !== "undefined"){
		return localStorage;
	}
	return null;
	
}

export const IS_SERVER = () => typeof window === "undefined";