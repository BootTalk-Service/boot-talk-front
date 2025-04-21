import BootcampDetailClient from "@/components/feature/detail/BootcampDetailClient";

interface PageProps {
  params: { id: string };
}

const BootcampDetailPage = ({ params }: PageProps) => {
  if (!params?.id) {
    return <div>Invalid Bootcamp ID</div>;
  }

  return <BootcampDetailClient id={params.id} />;
};

export default BootcampDetailPage;
