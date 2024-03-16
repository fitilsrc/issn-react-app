import { useLazyQuery } from "@apollo/client";
import { GET_PRESIGNED_UPLOAD_URLS_QUERY } from "../graphql";
import { useToast } from "@/components/ui/use-toast";
import { PresignedUploadUrlType } from "../types";

export function useFileObject() {
  const { toast } = useToast();

  const [getPresignedUploadUrlQuery, { data: presignedUploadUrls, error: presignedUploadUrlsError }] = useLazyQuery(GET_PRESIGNED_UPLOAD_URLS_QUERY);

  const getPresignedUploadUrl = async (filenames: string[]): Promise<Array<PresignedUploadUrlType>> => {
    await getPresignedUploadUrlQuery({ variables: { filenames } });

    if (presignedUploadUrlsError) {
      toast({
        variant: "destructive",
        title: presignedUploadUrlsError.name,
        description: presignedUploadUrlsError.message,
      });
    }

    return presignedUploadUrls;
  }

  const getPresignedUrl = async (): Promise<string> => {

    // to do get presigned url for existing file

    return "";
  }

  const uploadFile = async (fileList: FileList) => {
    console.log('[log] incoming file list', fileList);
    const presignedUrls = await getPresignedUploadUrl([...fileList].map(file => file.name));

    for (const file of fileList) {
      const url = presignedUrls.find( item => item.filename === file.name)?.url;

      if (url) {
        const result = await fetch( url, {
          method: "POST",
          headers: {
            "Content-Type": file.type
          },
          body: file
        })
        const { storageId } = await result.json();
      }
    }

    console.log('[log] presigned url', presignedUrls)
    return presignedUrls;
  }

  return { getPresignedUploadUrl, getPresignedUrl, uploadFile }
}
