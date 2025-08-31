import { memo } from 'react';
import './Controls.css';

type Props = { value: string; onChange: (v: string) => void };

function SearchBarImpl({ value, onChange }: Props) {
  return (
    <input
      className="controls-input"
      placeholder="Search country..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export default memo(SearchBarImpl);
