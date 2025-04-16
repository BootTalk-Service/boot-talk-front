import BootcampDetailClient from "@/components/feature/detail/BootcampDetailClient";

interface PageProps {
  params: { id: string };
}

const BootcampDetailPage = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  return <BootcampDetailClient id={resolvedParams.id} />;
};


export default BootcampDetailPage;