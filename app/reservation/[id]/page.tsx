import { facilities } from "@/lib/types";
import { notFound } from 'next/navigation';
import { ReservationCard } from "@/components/ReservationCard"; 

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}


export default async function Reservation({ params }: PageProps) {
  const { id } = await params;
  
  const facility = facilities.find((item) => item.id === id);
  
  if (!facility) {
    return notFound(); 
  }

 
  return <ReservationCard facility={facility} />;
}