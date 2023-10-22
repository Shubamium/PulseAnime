export type MangaMeta = {
	id: string;
	malId: number;
	title: {
		romaji: string;
		english: string;
		native: string;
	};
	trailer:{
		id:string,
		site:string,
	}
	status: string;
	image: string;
	cover: string;
	popularity: number;
	description: string;
	rating: number;
	genres: string[];
	color: string;
	totalChapters?: number;
	volumes?: number;
	chapters:MangaChapter[]
	type: string;
	releaseDate: number;
}

export type MangaChapter = {
	id:string;
	title:string;
	releaseDate:string;
}

export type MangaChapterPages = {
	page:number;
	img:string;
}


export type MangaSearchResult = {
	results: MangaMeta[];
	currentPage: number;
	hasNextPage: boolean;
}