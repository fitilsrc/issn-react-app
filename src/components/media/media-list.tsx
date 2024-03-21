import { FileType } from "@/lib/types";
import { useFileObject } from "@/lib/hooks/useFileObject";
import { useEffect } from "react";
import { MediaCard } from "./media-card";
import { CarouselItem } from "../ui/carousel";
import { AspectRatio } from "../ui/aspect-ratio";
import { DeleteDialog } from "../delete-dialog";

type MediaListProps = {
  media: FileType[];
  onPersonUpdate?: () => void;
}

export const MediaList = ({ media, onPersonUpdate}: MediaListProps) => {
  const {
    getBundleOfPresignedUrls,
    presignedUrls,
    deleteFileObjects,
    deleteMediaRelatedToPerson
  } = useFileObject();

  useEffect(() => {
    getBundleOfPresignedUrls(media);
  }, [media]);

  const handleConfirm = (index: number) => () => {
    const filenames = [presignedUrls[index]?.filename];
    const mediaId = media[index]?.id;

    deleteFileObjects(filenames, "photo");
    mediaId && deleteMediaRelatedToPerson(mediaId);
    onPersonUpdate?.();
  };

  return (
    <>
      {media.map((item, index) => {
        return (
          <CarouselItem key={item.id}>
            <AspectRatio
              ratio={3 / 4}
              className="bg-muted flex justify-center items-center overflow-hidden relative w-full"
            >
              <MediaCard file={item} url={presignedUrls[index]?.url}/>
              <DeleteDialog onConfirmHandle={handleConfirm(index)} />
            </AspectRatio>
          </CarouselItem>
        )
      })}
    </>
  )
}
