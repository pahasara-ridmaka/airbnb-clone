import { Suspense } from "react";
import ListingsCard from "./components/ListingsCard";
import MapFilterItems from "./components/MapFilterItems";
import prisma from "@/app/lib/db";
import { SkeletonCard } from "./components/SkeletonCard";
import { NoItems } from "./components/NoItems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getData({
  searchParams,
  userId,
}: {
  searchParams: {
    filter?: string;
    country?: string;
    guests?: string;
    bedrooms?: string;
    bathrooms?: string;
  };
  userId: string | undefined;
}) {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams.country ?? undefined,
      guests: searchParams.guests ?? undefined,
      bedrooms: searchParams.bedrooms ?? undefined,
      bathrooms: searchParams.bathrooms ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favourite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });
  return data;
}

// Home function
export default function Home({
  searchParams,
}: {
  searchParams: {
    filter?: string;
    country?: string;
    guests?: string;
    rooms?: string;
    bathrooms?: string;
  };
}) {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />

      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams: {
    filter?: string;
    country?: string;
    guests?: string;
    bedrooms?: string;
    bathrooms?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams: searchParams, userId: user?.id });

  return (
    <>
      {data.length === 0 ? (
        <NoItems
          title="Sorry no listings found for this category..."
          description="Please check a other category or create your own listing!"
        />
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingsCard
              key={item.id}
              description={item.description as string}
              imagePath={item.photo as string}
              location={item.country as string}
              price={item.price as number}
              userId={user?.id}
              favouriteId={item.Favourite[0]?.id}
              isInFavoriteList={item.Favourite.length > 0 ? true : false}
              homeId={item.id}
              pathName="/"
            />
          ))}
        </div>
      )}
    </>
  );
}

function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 md:grid-cols-3 gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
