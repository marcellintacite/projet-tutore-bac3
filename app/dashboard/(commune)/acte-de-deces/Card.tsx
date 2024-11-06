// components/DeathCertificateCard.tsx
import Link from "next/link";

type DeathCertificateCardProps = {
  id: string;
  declarationNumber: string;
  name: string;
  deathDate: string;
  deathPlace: string;
};

export default function DeathCertificateCard({
  id,
  declarationNumber,
  name,
  deathDate,
  deathPlace,
}: DeathCertificateCardProps) {
  return (
    <div className="card w-full bg- bg-white shadow-md p-4 mb-4">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">N° Déclaration: {declarationNumber}</p>
      <p className="text-gray-600">Date de Décès: {deathDate}</p>
      <p className="text-gray-600">Lieu de Décès: {deathPlace}</p>
      <Link
        href={`/dashboard/acte-de-deces/${id}`}
        className="btn btn-primary mt-2"
      >
        Voir plus
      </Link>
    </div>
  );
}
