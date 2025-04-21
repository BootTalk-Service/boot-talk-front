import BootcampDetailClient from "@/components/feature/detail/BootcampDetailClient";

export default async function BootcampDetailPage(
  incoming: Promise<{ params: { id: string } }>
) {
  const { params } = await incoming;

  if (!params.id) {
    return <div>Invalid Bootcamp ID</div>;
  }

  return <BootcampDetailClient id={params.id} />;
}
