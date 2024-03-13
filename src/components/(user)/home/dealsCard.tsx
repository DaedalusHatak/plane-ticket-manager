import { Box } from "@mui/material";
import Image from "next/image";

export default function DealsCard() {
  return (
<Box className="flex  justify-center items-center flex-wrap md:flex-nowrap px-12  gap-8 max-w-5xl  pt-12">

<Image
      src="/dealsPlane2.jpg"
      width={500}
      height={300}
      alt="plane above ground"
      className="rounded-2xl shadow-2xl shadow-black"
    ></Image>
    <div>
      <h2 className="pb-4 pt-1 font-bold text-4xl">Explore the Skies</h2>
      <p>Travel with ease, find the best flights and connections to suit your travel needs with lowest costs.</p>
    </div>

</Box>



  );
}
