import BootcampDetailClient from "@/components/feature/detail/BootcampDetailClient";

const BootcampDetailPage = ({ params }: { params: { id: string } }) => {
  return <BootcampDetailClient id={params.id} />;
};

export default BootcampDetailPage;