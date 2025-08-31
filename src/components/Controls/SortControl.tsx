import { memo } from 'react';
import type { SortDir, SortKey } from '../../types';
import './Controls.css';

type Props = {
  sortKey: SortKey;
  sortDir: SortDir;
  onChange: (key: SortKey, dir: SortDir) => void;
};

function SortControlImpl({ sortKey, sortDir, onChange }: Props) {
  return (
    <div className="controls-row">
      <label className="controls-label">Sort:</label>
      <select
        className="controls-select"
        value={`${sortKey}:${sortDir}`}
        onChange={(e) => {
          const [k, d] = e.target.value.split(':') as [SortKey, SortDir];
          onChange(k, d);
        }}
      >
        <option value="name:asc">Name ↑</option>
        <option value="name:desc">Name ↓</option>
        <option value="population:asc">Population ↑</option>
        <option value="population:desc">Population ↓</option>
      </select>
    </div>
  );
}

export default memo(SortControlImpl);
