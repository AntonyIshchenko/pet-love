import { ReactNode } from 'react';
import css from './Title.module.css';

type Props = {
  children: ReactNode;
};

function Title({ children }: Props) {
  return <h2 className={css.title}>{children}</h2>;
}

export default Title;
