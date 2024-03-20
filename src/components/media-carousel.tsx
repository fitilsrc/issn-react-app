import { useEffect, useState } from "react";
import { FileType } from "@/lib/types";
import { FileUploadDialog, ImageView, VideoView } from ".";
import { AspectRatio } from "./ui/aspect-ratio";
import { useFileObject } from "@/lib/hooks/useFileObject";
import { DeleteDialog } from "./delete-dialog";

const views = {
  image: ImageView,
  video: VideoView,
};

type mime = "image" | "video";

interface MediaCarouselProps {
  media: FileType[];
  onPersonUpdate?: () => void;
}

export const MediaCarousel = ({
  media,
  onPersonUpdate,
}: MediaCarouselProps) => {
  const {
    getBundleOfPresignedUrls,
    presignedUrls,
    deleteFileObjects,
    deleteMediaRelatedToPerson,
  } = useFileObject();
  const [current, setCurrent] = useState(media.length - 1);

  useEffect(() => {
    getBundleOfPresignedUrls(media);
    setCurrent(media.length - 1);
  }, [media]);

  const viewtype = !media[current]?.mime
    ? null
    : media[current].mime?.split("/")[0];
  const CurrentView = views[viewtype as mime];

  const handleConfirm = () => {
    const filenames = [presignedUrls[current]?.filename];
    const mediaId = media[current]?.id;

    deleteFileObjects(filenames, "photo");
    mediaId && deleteMediaRelatedToPerson(mediaId);
    onPersonUpdate?.();
  };

  return (
    <AspectRatio
      ratio={3 / 4}
      className="bg-muted flex justify-center items-center overflow-hidden relative"
    >
      {!viewtype ? (
        <FileUploadDialog onPersonUpdate={onPersonUpdate} />
      ) : (
        <>
          <CurrentView url={presignedUrls[current]?.url} />
          <DeleteDialog onConfirmHandle={handleConfirm} />
        </>
      )}
    </AspectRatio>
  );
};
