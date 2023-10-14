import { FaFilter } from 'react-icons/fa';
import './mangaSearch.scss';
import { redirect } from 'next/navigation';
import {  searchManga } from '@/db/MangaData';
import ResultDisplayer from '../../anime/search/resultDisplayer/ResultDisplayer';
import { MangaMeta } from '@/types/MangaTypes';
import { getTitle } from '@/db/util';
import MangaSearchResult from '@/components/manga/search/mangaSearchResult/MangaSearchResult';

type MangaSearchProps = {
	searchParams:{
		query:string
	}
}

export default async function MangaSearch({searchParams}: MangaSearchProps) {
	if(!searchParams?.query){
		redirect('/');
	}
	const mangaSearchResults = await searchManga(searchParams.query);

	return (
		<div id='container_manga-search'>
			<div className="confine">
				<div className="breadcrumbs">
					Searching for {searchParams.query}
				</div>
				<div className="filter-bar"><FaFilter/> Filter by - Showing {mangaSearchResults?.results && mangaSearchResults.results.length + ' results'}</div>
				<div className="container_search-results">
					{mangaSearchResults?.results.map((result:MangaMeta) => {
						const title = getTitle(result.title);
						return <MangaSearchResult 
							key={'manga-search-result'+result.id} 
							title={title} 
							cover={result.image} 
							to={`/manga/detail/${result.id}`} 
							type={result.type} 
							tags={result.genres} 
							chapter={result.totalChapters}
							volume={result.volumes}
						/>;
					})}
				</div>

			</div>
		</div>
	);
}