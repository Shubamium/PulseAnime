
export function getLocalStorage(){
	if(typeof window !== "undefined"){
		return localStorage;
	}
	return null;
	
}

export const IS_SERVER = () => typeof window === "undefined";


export function rating(rating:number){
	return parseFloat((rating / 100 * 5).toFixed(2));
}


export const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];