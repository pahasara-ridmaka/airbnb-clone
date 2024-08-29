import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { NoItems } from "../components/NoItems";
import ListingsCard from "../components/ListingsCard";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore;
  const data = await prisma.favourite.findMany({
    where: {
      userId: userId,
    },
    select: {
      Home: {
        select: {
          photo: true,
          id: true,
          Favourite: true,
          price: true,
          country: true,
          description: true,
        },
      },
    },
  });

  return data;
}

export default async function FavouriteRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return redirect("/");
  const data = await getData(user.id);
  return (
    <section className="container mx-auto px-5 lg:px-10 mt-10">
      <h2 className="text-3xl font-semibold tracking-tight ">
        Your favourites
      </h2>

      {data.length === 0 ? (
        <NoItems
          title="Hey you don't have any favorites"
          description="Please add favorites to see them right here..."
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
          {data.map((item) => (
            <ListingsCard
              key={item.Home?.id}
              description={item.Home?.description as string}
              homeId={item.Home?.id as string}
              price={item.Home?.price as number}
              location={item.Home?.country as string}
              imagePath={item.Home?.photo as string}
              pathName="/favourites"
              favouriteId={item.Home?.Favourite[0].id as string}
              isInFavoriteList={
                (item.Home?.Favourite.length as number) > 0 ? true : false
              }
              userId={user.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}
