
import Image from "next/image";

export default function DealsCard() {
  return (
<div className="flex justify-center max-w-5xl  items-center flex-wrap md:flex-nowrap  px-12 lg:px-0 gap-8  w-full pt-12">

<Image
priority

      src="/dealsPlane2.jpg"
    width={500}
    height={0}
      alt="plane above ground"

      className="rounded-2xl w-[500px] aspect-video shadow-2xl shadow-black"
    ></Image>
    <div>
      <h2 className="pb-4 pt-1 font-bold text-4xl">Explore the Skies</h2>
      <p>Travel with ease, find the best flights and connections to suit your travel needs with lowest costs.</p>
    </div>

</div>



  );
}
