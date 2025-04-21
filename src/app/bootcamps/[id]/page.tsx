import BootcampDetailClient from "@/components/feature/detail/BootcampDetailClient";

export default function BootcampDetailPage({
  params,
}: {
  params: { id: string };
}) {
  if (!params.id) {
    return <div>Invalid Bootcamp ID</div>;
  }

  return <BootcampDetailClient id={params.id} />;
}
