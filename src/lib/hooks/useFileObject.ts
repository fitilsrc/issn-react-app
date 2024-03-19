import { useMutation } from "@apollo/client";
import { useToast } from "@/components/ui/use-toast";
import { FileType, PresignedUrlType } from "../types";
import { ADD_PERSON_PHOTO_MUTATION, GET_BUNDLE_OF_PRESIGNED_URLS_MUTATION, GET_PRESIGNED_UPLOAD_URLS_MUTATION, GET_PRESIGNED_URL_MUTATION } from "../graphql";
import { useIssnContext } from "./useIssnContext";
import { useState } from "react";

export function useFileObject() {
  const { toast } = useToast();
  const { state } = useIssnContext();

  const [presignedUrls, setPresignedUrls] = useState<PresignedUrlType[]>([]);

  const [generateUploadUrls] = useMutation(GET_PRESIGNED_UPLOAD_URLS_MUTATION);
  const [generateFileUrl] = useMutation(GET_PRESIGNED_URL_MUTATION);
  const [addPersonPhotoMutation] = useMutation(ADD_PERSON_PHOTO_MUTATION);
  const [generateBundleOfPresignedUrlsMutation] = useMutation(GET_BUNDLE_OF_PRESIGNED_URLS_MUTATION);

  /**
   * Add photo to person entity
   * @param file
   */
  const addPersonPhoto = async (file: FileType) => {
    addPersonPhotoMutation({
      variables: {
        ...file,
        createdBy: state.user?.name,
      }
    })
  }

  /**
   * Delete file from s3 server
   * @param filename
   */
  const deleteFile = async (filename: string) => {
    // to do delete file from bucket
    console.log('[log] delete', filename)
  }

  /**
   * Upload bundle of files to s3 server
   * @param fileList
   * @returns Promise<string[]>
   */
  const uploadFile = async (fileList: FileList): Promise<string[]> => {
    const filenames = [...fileList].map(file => file.name);
    const { data, errors } = await generateUploadUrls({
      variables: { filenames }
    });

    if (errors) {
      errors.forEach(error =>
        toast({
          variant: "destructive",
          title: error.name,
          description: error.message,
        })
      )
    }

    const presignedUrls: string[] = [];
    for (const file of fileList) {
      const url = data.generateUploadUrls.find((item: PresignedUrlType) => item.filename === file.name)?.url;

      if (url) {
        const result = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": file.type
          },
          body: file,
        })
        if (result.ok) {
          const { data } = await generateFileUrl({
            variables: { filename: file.name }
          });
          presignedUrls.push(data.generateFileUrl.url);
        }
      }
    }

    return presignedUrls;
  }

  /**
   * Generate bundle of presigned urls
   * @param files
   */
  const getBundleOfPresignedUrls = async (files: FileType[]) => {
    const filenames = files.map(file => file.filename);
    await generateBundleOfPresignedUrlsMutation({
      variables: {
        filenames
      },
      onCompleted: data => setPresignedUrls(data.generateBundleOfPresignedUrls)
    })
  }

  return { uploadFile, deleteFile, addPersonPhoto, getBundleOfPresignedUrls, presignedUrls }
}
