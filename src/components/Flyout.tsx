'use client';

import React from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearSelected } from '../store/selectedItemsSlice';
import { compileCsv } from '../../app/[locale]/actions/compileCsv';

const Flyout: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.items);

  if (selectedItems.length === 0) return null;

  const handleUnselect = () => {
    dispatch(clearSelected());
  };

  const handleDownload = async () => {
    const csv = await compileCsv(selectedItems);
    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedItems.length}_items.csv`;
    link.click();
  };

  return (
    <div className="flyout">
      <span>{selectedItems.length} items are selected</span>
      <button onClick={handleUnselect}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default Flyout;
