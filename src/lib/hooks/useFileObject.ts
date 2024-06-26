import { useMutation } from "@apollo/client";
import { useToast } from "@/components/ui/use-toast";
import { FileType } from "../types";
import {
  ADD_BUNDLE_MEDIA_TO_PERSON_MUTATION,
  ADD_PERSON_PHOTO_MUTATION,
  DELETE_FILE_OBJECTS_MUTATION,
  DELETE_MEDIA_RELATED_TO_PERSON_MUTATION,
  GET_PRESIGNED_UPLOAD_URLS_MUTATION,
} from "../graphql";
import { useIssnContext } from "./useIssnContext";

export function useFileObject() {
  const { toast } = useToast();
  const { state } = useIssnContext();

  const [generateUploadUrls] = useMutation(GET_PRESIGNED_UPLOAD_URLS_MUTATION);
  const [addPersonPhotoMutation] = useMutation(ADD_PERSON_PHOTO_MUTATION);
  const [deleteFileObjectsMutation] = useMutation(DELETE_FILE_OBJECTS_MUTATION);
  const [deleteMediaRelatedToPersonMutation] = useMutation(DELETE_MEDIA_RELATED_TO_PERSON_MUTATION);
  const [addBundleMediaToPersonMutation] = useMutation(ADD_BUNDLE_MEDIA_TO_PERSON_MUTATION);

  /**
   * Add photo relation to person entity
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
   * Adds an array of media files for a person entity
   * @param files
   */
  const addBundleMediaToPerson = async (files: FileType[]) => {
    const preparedFiles = files.map(file => ({
      ...file,
      createdBy: state.user?.name,
    }))
    addBundleMediaToPersonMutation({
      variables: {
        media: preparedFiles
      }
    })
  }

  /**
   * Delete file from s3 server
   * @param filename
   */
  const deleteFileObjects = async (filenames: string[], bucket: string) => {
    await deleteFileObjectsMutation({
      variables: {
        filenames,
        bucket
      }
    });
  }

  /**
   * Delete media object related to person entity
   * @param mediaId
   */
  const deleteMediaRelatedToPerson = async (mediaId: number) => {
    await deleteMediaRelatedToPersonMutation({
      variables: {
        mediaId: parseInt(mediaId.toString())
      }
    })
  }

  /**
   * Upload bundle of files to s3 server
   * @param fileList
   * @returns Promise<string[]>
   */
  const uploadFile = async (fileList: FileList): Promise<string[]> => {
    const filenames = [...fileList].map(file => `${self.crypto.randomUUID()}_${file.name}`);
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

    let index = 0;
    for (const file of fileList) {
      const url = data.generateUploadUrls[index].url;
      if (url) {
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": file.type
          },
          body: file,
        })
      }
      index += 1;
    }

    return filenames;
  }

  return {
    uploadFile,
    deleteFileObjects,
    deleteMediaRelatedToPerson,
    addPersonPhoto,
    addBundleMediaToPerson,
  }
}
