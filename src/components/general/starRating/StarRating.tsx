import React from 'react';
import { FaStar, FaStarHalf, FaStarHalfAlt } from 'react-icons/fa';
import {ImStarEmpty} from 'react-icons/im';
type starRatingProps = {
	rating:number
}

export default function StarRating({rating}: starRatingProps) {

  return (
	<div className='stars'>
		{new Array(5).fill('').map((_,index)=>{
			return index + 1 <= rating  ? <FaStar/> : index < Math.ceil(rating) ? <FaStarHalfAlt/> : <ImStarEmpty/>;
		})}
	</div>
  );
}