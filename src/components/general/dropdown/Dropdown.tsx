'use client';
import React from 'react';
import './dropdown.scss';

type Props = {
	options:{
		label:string;
		value:string;
	}[]
	onChange?:(value:string)=>void;
}
export default function Dropdown({options,onChange}: Props) {
	return (
		<select className="dropdown" onChange={(e) => onChange && onChange(e.target.value)}>
			{options.map((option,index:number)=>{
				return (
					<option value={option.value} key={'select-options-'+options.values+'-'+index}>
						{option.label}
					</option>
				);
			})}
		</select>
	);
}


{/* <option value="gogoanime">Gogoanime</option>
<option value="gogoanime">Zoro</option>
<option value="gogoanime">Enime</option>
<option value="gogoanime">9Anime</option>
<option value="gogoanime">AnimeFox</option> */}