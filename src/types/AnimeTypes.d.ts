export type AnimeSearchResult = {
	title:{
		romaji:string;
		english:string;
		native:string;
	};
	id:string;
	image:string;
	type:string;
}

// export type AnimeDetail = {
// 	title:string;
// 	id:string;
// 	image:string;
// 	genre?:string[];
// 	totalEpisodes:number;
// 	releaseDate:string;
// 	subOrDub:string;
// 	description:string;
// 	type:string;
// 	status:string;
// 	episodes:{
// 		id:string,
// 		number:number
// 	}[]
// }

export type AnimeSearchResults = {
	currentPage: number;
	hasNextPage: boolean;
	results: AnimeSearchResult[];
};


export type AnimeEpisodeData = {
	sources:{
		url:string,
		isM3U8:boolean,
		quality:string
	}[]
}


export type AnimeMeta = {
	id:string;
	title:{
		romaji:string;
		english:string;
		native:string;
	};
	image:string;
	cover:string;
	trailer:{
		id:string;
		site:string;
		thumbnail:string;
	};
	description:string;
	genres:string[];
	status:string;
	totalEpisodes:number;
	releaseDate:string;
	season:string;
	subOrDub:string;
	type:string;
	episodes:{
		id:string,
		number:number
	}[]
}