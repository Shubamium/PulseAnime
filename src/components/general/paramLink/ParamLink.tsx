'use client';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import './paramLink.scss';
import { useRouter } from 'next/navigation';
type ParamLinkProps = {
	children?:ReactNode
	param:string,
	value:string,
}

export default function ParamLink({children,param,value}: ParamLinkProps) {
	const router = useRouter();
	const navigate = (param:string,value:string) =>{
		const newUrl =  new URL(window.location.href);
		newUrl.searchParams.set(param,value);
		console.log(newUrl.searchParams.toString());
		const newParam = '?' + newUrl.searchParams.toString();
		router.replace(newParam);
	};
	return (
		<div onClick={()=>navigate(param,value)} className='param-link'>
			{children}
		</div>
	);
}