'use client';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import './paramLink.scss';
import { useRouter } from 'next/navigation';
type ParamLinkProps = {
	children?:ReactNode,
	className?:string,
	param:string,
	value:string,
}

export default function ParamLink({className,children,param,value}: ParamLinkProps) {
	const router = useRouter();
	const navigate = (param:string,value:string) =>{
		const newUrl =  new URL(window.location.href);
		newUrl.searchParams.set(param,value);
		console.log(newUrl.searchParams.toString());
		const newParam = '?' + newUrl.searchParams.toString();
		router.push(newParam);
		router.refresh();
	};

	const getLink = () => {
		const newUrl =  new URL(window.location.href);
		newUrl.searchParams.set(param,value);
		const newParam = '?' + newUrl.searchParams.toString();
		return newParam;
	};
	// onClick={()=>navigate(param,value)} 
	return (
		<div onClick={()=>navigate(param,value)}  className={`param-link ${className}`}>
			{children}
		</div>
	);
}