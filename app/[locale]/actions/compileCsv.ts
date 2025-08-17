'use server';

type SelectedItem = {
  name: string;
  birth_year: string;
  gender: string;
  url: string;
  height: string;
  mass: string;
};

export async function compileCsv(items: SelectedItem[]) {
  const header = 'Name,Birth Year,Gender,URL,Height,Mass\n';
  const rows = items
    .map((i) =>
      [i.name, i.birth_year, i.gender, i.url, i.height, i.mass]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(',')
    )
    .join('\n');

  return header + rows + '\n';
}
