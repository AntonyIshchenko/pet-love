import { sprite } from 'icons';

type Props = {
  name: string;
  width: number;
  height: number;
};

function Icon({ name, width, height }: Props) {
  return (
    <svg width={width} height={height}>
      <use href={`${sprite}#${name}`} />
    </svg>
  );
}

export default Icon;
