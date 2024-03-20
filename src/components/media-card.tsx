import { FileType } from "@/lib/types"
import { ImageView, VideoView } from ".";

const views = {
  image: ImageView,
  video: VideoView,
};

type mime = "image" | "video";

type MediaCardProps = {
  file: FileType;
  url: string;
}

export const MediaCard = ({ file, url }: MediaCardProps) => {
  const viewType = !file.mime
    ? "image"
    : file.mime?.split("/")[0];
  const MediaView = views[viewType as mime];

  return (
    <MediaView url={url} />
  )
}
