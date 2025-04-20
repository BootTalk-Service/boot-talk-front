import BootcampDetailClient from "@/components/feature/detail/BootcampDetailClient";

interface PageProps {
  params: { id: string };
}

const BootcampDetailPage = ({ params }: PageProps) => {
  return <BootcampDetailClient id={params.id} />;
};


export default BootcampDetailPage;