'use client';

import Button from '../button/Button';
import './contentSwitch.scss';

export default function ContentSwitch() {
	return (
		<div className="container_content-switch">
			<Button className="btn_content-type active">
				Anime
			</Button>
			<Button className="btn_content-type">
				Manga
			</Button>
			<Button className="btn_content-type">
				Novel
			</Button>
		</div>
	);
}