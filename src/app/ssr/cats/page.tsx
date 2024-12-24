import { ICat } from "@/interfaces/cat.interface";
import { getCats } from "@/services/getCats";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 20;
export default async function CatsPage() {
  const cats: ICat[] = await getCats();

  return (
    <div className="flex w-[800px] m-auto flex-wrap">
      {cats.map(({ url, id }) => (
        <Link href={`/ssr/cats/${id}`} key={id}>
          <div key={id} className="w-56 h-64 relative m-2">
            <Image
              src={url}
              alt={url}
              fill={true}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
