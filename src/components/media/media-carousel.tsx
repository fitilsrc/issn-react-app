import { FileType } from "@/lib/types";
import { MediaList } from "./media-list";
import { AspectRatio } from "../ui/aspect-ratio";
import { FileUploadDialog } from "..";
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "../ui/carousel";

interface MediaCarouselProps {
  media: FileType[];
  onPersonUpdate?: () => void;
}

export const MediaCarousel = ({
  media,
  onPersonUpdate,
}: MediaCarouselProps) => {
  return (
    <>
      {!media.length ? (
        <AspectRatio
          ratio={3 / 4}
          className="bg-muted flex justify-center items-center overflow-hidden relative w-full"
        >
          <FileUploadDialog
            onPersonUpdate={onPersonUpdate}
            buttonProps={{
              variant: "ghost",
              size: "default",
              className: "w-full h-full",
            }}
          />
        </AspectRatio>
      ) : (
        <Carousel
          opts={{
            startIndex: media.length - 1,
          }}
          className="w-full flex flex-col gap-4"
        >
          <CarouselContent>
            <MediaList media={media} onPersonUpdate={onPersonUpdate} />
          </CarouselContent>

          <FileUploadDialog onPersonUpdate={onPersonUpdate} buttonProps={{
            variant: "outline",
            size: "icon",
            className: "rounded-full absolute top-2 left-2"
          }}/>

          <div className="flex gap-4 justify-center">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      )}
    </>
  );
};
