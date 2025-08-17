import MainPageClient from '../../../app/[locale]/(site)/MainPageClient';

export default async function Page({
  searchParams,
}: {
  searchParams?: { search?: string; page?: string; details?: string };
}) {
  const page = Number(searchParams?.page ?? '1');
  const search = searchParams?.search ?? '';
  return (
    <MainPageClient
      initialPage={page}
      initialSearch={search}
      initialDetailsId={searchParams?.details}
    />
  );
}
