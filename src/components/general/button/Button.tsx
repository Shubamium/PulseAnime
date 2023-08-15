import './button.scss';

type Props = {
	className?:string
	onClick?:()=>void
	children?:React.ReactNode
	type?: 'submit' | 'reset' | 'button' | undefined;
}

export default function Button({className,onClick,children,type}: Props) {
  return (
	<button onClick={onClick} className={`btn ${className}`} type={type}>
		{children}
	</button>
  );
}