'use client';
import {useState, useEffect} from 'react';
import SearchBar from '../searchBar/SearchBar';
import ContentSwitch from '../contentSwitch/ContentSwitch';

type MediaSearchProps = {
	useAltColor?:boolean
	reverseOrder?:boolean
}

const MEDIA_TYPE = 'MEDIA_TYPE';
export default function MediaSearch({useAltColor,reverseOrder}: MediaSearchProps) {

	const [mediaType,setMediaType] = useState('anime') ;


	// Reverse the order of render for Navbar and MainHome title
	const switcher = <ContentSwitch onMediaSwitch={(media)=>{
			setMediaType(media);
			if(typeof window !== 'undefined'){
				localStorage.setItem(MEDIA_TYPE,media);
			}
		}
	} active={mediaType}/>;
	
	useEffect(() => {
		// Get the active media type from local storage
		let savedMediaType = localStorage.getItem(MEDIA_TYPE) ?? 'anime';
		setMediaType(savedMediaType);
	}, []);
	
	const searchBar = <SearchBar rounded={reverseOrder} placeholder="Search for the title here!" altSearchColor={useAltColor} route={`/${mediaType}/search`}/>;

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