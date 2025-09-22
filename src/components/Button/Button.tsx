import s from './Button.module.css';

type ButtonProps = {
    text?: string;
    onClick?: () => void;
    numb?: 'one' | 'two' | 'three';
    size?: 'small' | 'medium' | 'large';
}


export const Button = ({
    text = 'Click me!',
    onClick,
    numb = 'one',
    size = 'medium',
                       }: ButtonProps) => {

    return (
        <button className={`${s.button} ${s[numb]} ${s[size]}`}onClick={onClick}>{text}</button>
    );
};

