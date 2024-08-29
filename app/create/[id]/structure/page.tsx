import { CreateCategoryPage } from "@/app/actions";
import { BottomBar } from "@/app/components/BottomBar";
import SelectedCategories from "@/app/components/SelectedCategories";

export default function StructureRoute({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h1 className="text-3xl font-semibold tracking-tight transition-colors">
          Which of these best describe your Home?
        </h1>
      </div>

      <form action={CreateCategoryPage}>
        <input type="hidden" name="homeId" value={params.id} />

        <SelectedCategories />
        <BottomBar />
      </form>
    </>
  );
}
