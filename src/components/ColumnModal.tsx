import { memo, useState } from 'react';
import type { ColumnsConfig } from '../types';
import './ColumnModal.css';

type Props = {
  config: ColumnsConfig;
  selected: string[];
  onChange: (cols: string[]) => void;
};

function ColumnModalImpl({ config, selected, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [local, setLocal] = useState<string[]>(selected);

  return (
    <>
      <button
        className="column-button"
        onClick={() => {
          setLocal(selected);
          setOpen(true);
        }}
      >
        Columns…
      </button>
      {open && (
        <div className="column-overlay">
          <div className="column-modal">
            <h2 className="column-title">Select extra columns</h2>

            <div className="column-required">
              Required: <code>{config.required.join(', ')}</code>
            </div>

            <div className="column-options">
              {config.optional.map((k) => {
                const checked = local.includes(k);
                return (
                  <label key={k} className="column-option">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={(e) => {
                        setLocal((prev) =>
                          e.target.checked
                            ? [...prev, k]
                            : prev.filter((x) => x !== k)
                        );
                      }}
                    />
                    <span>{k}</span>
                  </label>
                );
              })}
            </div>

            <div className="column-actions">
              <button className="column-cancel" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button
                className="column-apply"
                onClick={() => {
                  onChange(local);
                  setOpen(false);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(ColumnModalImpl);
