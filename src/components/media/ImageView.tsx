interface ImageViewProps {
  url: string;
}

export const ImageView = ({ url }: ImageViewProps) => {
  return (
    <img
      src={url}
      className="object-fill"
    />
  )
}
