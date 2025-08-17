import MainPageClient from '../../../app/[locale]/(site)/MainPageClient';

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ search?: string; page?: string; details?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page ?? '1');
  const search = params?.search ?? '';
  const detailsId = params?.details;

  return (
    <MainPageClient
      initialPage={page}
      initialSearch={search}
      initialDetailsId={detailsId}
    />
  );
}
