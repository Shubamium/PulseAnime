import React from 'react';
import { FaSpinner } from 'react-icons/fa';

type Props = {}

export default function RootLoading({}: Props) {
  return (
		<div className="loader"><FaSpinner/></div>
  );
}