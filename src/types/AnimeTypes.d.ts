export type AnimeData = {
	title:string;
	id:string;
	image:string;
}

export type AnimeDetail = {
	title:string;
	id:string;
	image:string;
	genre?:string[];
	totalEpisodes:number;
	releaseDate:string;
	subOrDub:string;
	description:string;
	type:string;
	status:string;
	episodes:{
		id:string,
		number:number
	}[]
}

export type AnimeSearchResults = {
	currentPage: number;
	hasNextPage: boolean;
	results: AnimeData[];
};


export type AnimeEpisodeData = {
	sources:{
		url:string,
		isM3U8:boolean,
		quality:string
	}[]
}