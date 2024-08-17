import Image from "next/image";
import renaissanceimage from "@/assets/renaissanceimage.webp";

const HomeMessage = () => {
  return (
    <div className=" bg-zinc-900  h-[90vh] md:h-[89vh] w-[98vw] md:w-[85vw] flex flex-col items-center justify-center gap-3">
      <Image
        src={renaissanceimage}
        className="h-[40vh] w-[60vw] md:w-[30vw]"
        alt="image"
      ></Image>
      <h1 className=" text-3xl font-bold text-center text-white">
        Please! Click on the Sidebar menu for using the feature
      </h1>
    </div>
  );
};

export default HomeMessage;
