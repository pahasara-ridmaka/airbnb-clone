import { CreateDescriptionPage } from "@/app/actions";
import { BottomBar } from "@/app/components/BottomBar";
import { Counter } from "@/app/components/Counter";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="w-3/5 m-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Please describe your home as good as you can
        </h2>
      </div>

      <form action={CreateDescriptionPage}>
        <input type="hidden" name="homeId" value={params.id} />
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input
              name="title"
              type="text"
              required
              placeholder="Short and simple..."
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="">Description</label>
            <Textarea
              name="description"
              required
              placeholder="Please describe your home..."
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              name="price"
              required
              type="number"
              placeholder="Price per night in USD"
              min={10}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <Label>Image</Label>
            <Input name="image" type="file" required />
          </div>

          <Card>
            <CardHeader className="flex flex-col gap-y-5">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium ">Guests</h3>
                  <p className="text-muted-foreground text-sm">
                    How many guests do you want?
                  </p>
                </div>
                <Counter name="guests" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium ">Rooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many Rooms do you have?
                  </p>
                </div>
                <Counter name="rooms" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium ">Bathrooms</h3>
                  <p className="text-muted-foreground text-sm">
                    How many Bathrooms do you have?
                  </p>
                </div>
                <Counter name="bathrooms" />
              </div>
            </CardHeader>
          </Card>
        </div>

        <BottomBar />
      </form>
    </>
  );
};

export default page;
