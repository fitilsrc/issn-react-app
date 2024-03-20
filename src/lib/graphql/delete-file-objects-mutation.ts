import { gql } from "@apollo/client";

export const DELETE_FILE_OBJECTS_MUTATION = gql`
  mutation DeleteFileObjects(
    $filenames: [String!]
    $bucket: String!
  ) {
    deleteFileObjects(
      fileNamesInput: {
        filenames: $filenames
        bucket: $bucket
      }
    ) {
      status
      message
    }
  }
`
