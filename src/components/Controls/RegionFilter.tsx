import { memo } from 'react';
import './Controls.css';

type Props = {
  value: string | 'all';
  regions: string[];
  onChange: (value: string | 'all') => void;
};

function RegionFilterImpl({ value, regions, onChange }: Props) {
  return (
    <div className="controls-row">
      <label className="controls-label">Region:</label>
      <select
        className="controls-select"
        value={value}
        onChange={(e) => onChange(e.target.value as Props['value'])}
      >
        {regions.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
    </div>
  );
}

export default memo(RegionFilterImpl);
