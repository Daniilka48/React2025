import { memo } from 'react';
import type { YearData } from '../types';
import type { ReactNode } from 'react';
import './DataTable.css';

type Props = {
  rows: YearData[];
  extraColumns: string[];
};

const format = (v: unknown): ReactNode => {
  if (v === null || v === undefined) return 'N/A';
  if (typeof v === 'number') return v.toLocaleString();
  if (typeof v === 'string') return v;
  return String(v);
};

function DataTableImpl({ rows, extraColumns }: Props) {
  const headers = [
    'year',
    'population',
    'co2',
    'co2_per_capita',
    ...extraColumns,
  ];

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((h) => (
              <th key={h} className="data-th">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.year}>
              {headers.map((h) => (
                <td key={h} className="data-td">
                  {format((r as Record<string, unknown>)[h])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default memo(DataTableImpl);
