import { FileType } from "@/lib/types";
import { useFileObject } from "@/lib/hooks/useFileObject";
import { MediaCard } from "./media-card";
import { CarouselItem } from "../ui/carousel";
import { AspectRatio } from "../ui/aspect-ratio";
import { DeleteDialog } from "../delete-dialog";
import { useGetBundleOfPresignedUrls } from "@/lib/hooks";

type MediaListProps = {
  media: FileType[];
  onPersonUpdate?: () => void;
}

export const MediaList = ({ media, onPersonUpdate}: MediaListProps) => {
  const {
    deleteFileObjects,
    deleteMediaRelatedToPerson
  } = useFileObject();

  const { data, error, loading } = useGetBundleOfPresignedUrls(media);

  const handleConfirm = (index: number) => {
    const filenames = [data.presignedUrls[index]?.filename];
    const mediaId = media[index]?.id;

    deleteFileObjects(filenames, "photo");
    mediaId && deleteMediaRelatedToPerson(mediaId);
    onPersonUpdate?.();
  };

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {media.map((item, index) => {
        return (
          <CarouselItem key={item.id}>
            <AspectRatio
              ratio={3 / 4}
              className="bg-muted flex justify-center items-center overflow-hidden relative w-full"
            >
              <MediaCard file={item} url={data.presignedUrls[index]?.url}/>
              <DeleteDialog onConfirmHandle={() => handleConfirm(index)} />
            </AspectRatio>
          </CarouselItem>
        )
      })}
    </>
  )
}
