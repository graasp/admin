import type { JSX } from 'react';

type Props = {
  legends: {
    title: string;
    color: string;
  }[];
};
const Legends = ({ legends }: Props): JSX.Element => (
  <div style={{ position: 'absolute', zIndex: 450, bottom: 0, fontSize: 12 }}>
    {legends.map(({ title, color }) => (
      <div
        key={title}
        className="legend-item d-flex"
        style={{
          display: 'flex',
          gap: 4,
          marginTop: 4,
        }}
      >
        <div style={{ backgroundColor: color, width: 20, height: 20 }} />
        {title}
      </div>
    ))}
  </div>
);

export default Legends;
