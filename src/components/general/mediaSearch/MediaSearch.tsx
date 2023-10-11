'use client';
import {useState} from 'react';
import SearchBar from '../searchBar/SearchBar';
import ContentSwitch from '../contentSwitch/ContentSwitch';

type MediaSearchProps = {
	useAltColor?:boolean
	reverseOrder?:boolean
}

const MEDIA_TYPE = 'MEDIA_TYPE';
export default function MediaSearch({useAltColor,reverseOrder}: MediaSearchProps) {

	// Get the active media type from local storage
	const savedMediaType = localStorage.getItem(MEDIA_TYPE) ?? 'anime';
	const [mediaType,setMediaType] = useState(savedMediaType);



	// Reverse the order of render for Navbar and MainHome title
	const switcher = <ContentSwitch onMediaSwitch={
		(media)=>{
			setMediaType(media);
			localStorage.setItem(MEDIA_TYPE,media);
		}
	} defaultValue={mediaType}/>;
	
	const searchBar = <SearchBar placeholder="Search for the title here!" altSearchColor={useAltColor} route={`/${mediaType}/search`}/>;

	return (
		<>
			{reverseOrder ? 
				<>
					{switcher}
					{searchBar}
				</> 
			: 
				<>
					{searchBar}
					{switcher}
				</>
			}
		</>
	);
}