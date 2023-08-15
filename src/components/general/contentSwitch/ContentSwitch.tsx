'use client';

import { useState } from 'react';
import Button from '../button/Button';
import './contentSwitch.scss';

export default function ContentSwitch() {

	const [active,setActive] = useState('anime');

	return (
		<div className="container_content-switch">
			<Button className={"btn_content-type" + ` ${active === 'anime' ? ' active' : '' }`} onClick={()=>setActive('anime')}>
				Anime
			</Button>
			<Button className={"btn_content-type" + ` ${active === 'manga' ? ' active' : '' }`} onClick={()=>setActive('manga')}>
				Manga
			</Button>
			<Button className={"btn_content-type" + ` ${active === 'novel' ? ' active' : '' }`} onClick={()=>setActive('novel')}>
				Novel
			</Button>
		</div>
	);
}