import Image from "next/image";
import styling from './homeTitle.module.scss';

import {FaSearch} from 'react-icons/fa';
import SearchBar from "@/components/general/searchBar/SearchBar";
import ContentSwitch from "@/components/general/contentSwitch/ContentSwitch";

type Props = {}

export default function HomeTitle({}: Props) {
	return (
		<section className={styling["container_home-title"]}>
			<Image src={'/images/art/ai_hoshino.png'} className={styling["decor_art-r"]} alt="pulseanime-logo" width={600} height={240}/>
			<Image src={'/images/art/tate_yuusha.png'} className={styling["decor_art-l"]} alt="pulseanime-logo" width={600} height={240}/>
			<div className={styling["background"]}></div>
			<div className={styling['title-section']}>
				<Image src={'/images/logo/logo.png'} alt="pulseanime-logo" width={600} height={240}/>
				<p className={styling['tagline']}>Watch Anime & Read Manga & Novel for Free</p>
				<p className={styling['description']}>Welcome to PulseAnime - Your Ultimate Destination for Anime, Manga, and Light Novels! Immerse yourself in a world of captivating stories, vibrant characters, and thrilling adventures. Discover a vast collection of the latest anime episodes, manga chapters, and light novels, all at your fingertips, and all for free! Whether you&apos;re a seasoned otaku or new to the world of Japanese entertainment, PulseAnime brings you the best content in high-quality streaming.</p>
			</div>
			<div className={styling["container_action"]}>
				<SearchBar/>	
				<ContentSwitch/>
			</div>
		</section>
	);
}