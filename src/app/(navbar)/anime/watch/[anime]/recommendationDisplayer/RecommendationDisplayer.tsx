import { AnimeRecommendation } from '@/types/AnimeTypes';
import './recommendationDisplayer.scss';
import { getTitle } from '@/db/util';
import Image from 'next/image';
import { MdStarOutline } from 'react-icons/md';
import Link from 'next/link';
type Props = {
	recommendations:AnimeRecommendation[];
}

export default function RecommendationDisplayer({recommendations}: Props) {
	return (
		<div className="container_recommendation">
			<div className="recommendation-header">
				<h2>Recommendation</h2>
			</div>
			<div className="recommendation-list" >
				{recommendations.slice(0,8).map((recommendation,index:number)=>{
					return(
						<Link href={'/anime/detail/'+recommendation.id} className="recommendation" key={index}>
							<div className="banner">
								<Image src={recommendation.cover} alt="" width={300} height={100}></Image>
							</div>
							<div className="content">
								<div className="img-part">
									<Image src={recommendation.image} alt="" width={150} height={200}></Image>
								</div>
								<div className="info-part">
									<h2 className="rec-title">{getTitle(recommendation.title)}</h2>
									<div className="rec-details">
										<p className="rec-episode">{recommendation.episodes} Episodes</p>
										<p className="rec-detail">{recommendation.type} - {recommendation.rating / 10}<MdStarOutline/></p>
									</div>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}