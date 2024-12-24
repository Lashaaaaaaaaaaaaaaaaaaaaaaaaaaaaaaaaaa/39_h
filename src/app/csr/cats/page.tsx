"use client";

import { ICat } from "@/interfaces/cat.interface";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CatsPage() {
  const [cats, setCats] = useState<ICat[]>([]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await fetch(
          `https://api.thecatapi.com/v1/images/search?limit=20&api_key=${process.env.CAT_API}`
        );
        const data = await res.json();
        setCats(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCats();
  }, []);

  return (
    <div className="flex w-[800px] m-auto flex-wrap">
      {cats.map(({ url, id }) => (
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
      ))}
    </div>
  );
}
