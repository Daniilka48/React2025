# CO₂ Emissions Explorer

A React + TypeScript + Vite app for analyzing CO₂ emissions by country.

Functionality:
- select a year (or the latest available),
- filter by region,
- search for a country,
- sort (by name or population),
- add/remove additional columns.

---

## Development Setup

This project was created from the [React + TypeScript + Vite] template.

To run: npm run dev

---

## Performance Profiling

**React Dev Tools Profiler** was used to measure performance.

The following actions were tested:
- sorting the list of countries,
- searching for a country,
- switching the year,
- adding/removing additional columns.

### 🔹 Before optimization

**Parameters:**

### Baseline profiling
- Commit duration: ~15ms
- Render duration (AppInner): 12.5ms
- Interactions: search bar
- Almost every action caused a re-render of all country cards

- Commit duration: ~4679ms
- Render duration (AppInner): 2964ms
- Passive effects: 1715ms
- Main bottleneck: DataTableImpl and AppInner components
- Flamegraph shows heavy re-renders of DataTableImpl
- Ranked Chart: `AppInner` and `DataTable` generated the highest load

**results and screenshots**
(docs/profiling/baseline)

### 🔹 After optimization 
(`React.memo`, `useMemo`, `useCallback`)

Optimizations:
- `React.memo` added for `YearSelector`, `SearchBar`, `SortControl` and other "pure" components.
- `useMemo` used for calculations (e.g. YearSelector).
- `useCallback` used for handlers (`setYear`, `setRegion`, etc.).

**Parameters:**

### Optimized profiling
- Commit duration: ~12ms - ~15ms(Baseline)
- Render duration (AppInner): 9.7ms
- Interactions: search bar
- The number of unnecessary re-renders has been reduced

- Commit duration: ~4066ms (decreased but still the highest)
- Render duration (AppInner): 2469ms
- Passive effects: 1596ms
- Main bottleneck: DataTableImpl and AppInner components
- Flamegraph shows heavy re-renders of DataTableImpl
- Ranked chart confirms DataTableImpl is the slowest component

**results and screenshots**
(docs/profiling/optimized)

## Conclusion

After optimization, the application performance has improved significantly:
- commit duration has decreased,
- only changed components are re-rendered,
- UI has become more responsive when sorting and searching.

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
