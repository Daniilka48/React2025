import { notFound } from 'next/navigation';

export default async function BlogPost({
  params,
}: {
  params: { slug: string[] };
}) {
  if (params.slug.length > 0) {
    return notFound();
  }

  return <h1>Пост: {params.slug}</h1>;
}
