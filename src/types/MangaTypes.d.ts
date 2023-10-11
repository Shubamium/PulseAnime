export type MangaMeta = {
	id: string;
	malId: number;
	title: {
		romaji: string;
		english: string;
		native: string;
	};
	status: string;
	image: string;
	cover: string;
	popularity: number;
	description: string;
	rating: number;
	genres: string[];
	color: string;
	totalChapters: number;
	volumes: number;
	type: string;
	releaseDate: string;
}


export type MangaSearchResult = {
	results: MangaMeta[];
	currentPage: number;
	hasNextPage: boolean;
}