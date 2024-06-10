import { Icons } from "@/components/icons/Iconts";
import { Image, Source } from "@unpic/react";
interface HeroSectionProps {}

export function HeroSection({}: HeroSectionProps) {
  return (
    <div className="w-full h-[70vh] relative flex justify-center items-center">
      <picture className="absolute inset-0 z-20 ">
        <source media="(min-width:768px)" srcSet="/hero-image.webp" />
        <source media="(max-width:768px)" srcSet="/hero-image-potrait.webp" />
        {/* <!-- Fallback image, also used for shared alt and loading props --> */}
        <Image
          layout="fullWidth"
          src="/hero-image.webp"
          alt="fallback hero image"
          className="w-full h-[70vh] object-cover"
          priority
          unstyled
        />
      </picture>
      <div className="z-30 min-h-[40%] w-[80%] flex justify-center">
        <Icons.writtenlogo className="   w-[80%] h-full fill-primary bg-base-200/60 p-2 rounded-lg" />
      </div>
    </div>
  );
}



