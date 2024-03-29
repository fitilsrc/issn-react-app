import { useQuery } from "@apollo/client";
import { GET_BUNDLE_OF_PRESIGNED_URLS_QUERY } from "../graphql";
import { FileType } from "../types";

/**
 * Generate bundle of presigned urls
 * @param files
 * @returns { presignedUrls, refetchUrls, error, loading }
 */
export function useGetBundleOfPresignedUrls(files: FileType[]) {
  const filenames = files.map(file => file.filename);
  const {
    data,
    refetch: refetchUrls,
    error,
    loading,
  } = useQuery(GET_BUNDLE_OF_PRESIGNED_URLS_QUERY, {
    variables: { filenames },
  });

  return { data, refetchUrls, error, loading }
}
