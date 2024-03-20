import { gql } from "@apollo/client";

export const ADD_PERSON_PHOTO_MUTATION = gql`
  mutation AddPersonPhoto(
    $createdBy: String
    $filename: String
    $bucket: String
    $mime: String
    $personId: Float!
  ) {
    addPersonPhoto(
      photoInput: {
        createdBy: $createdBy
        filename: $filename
        bucket: $bucket
        mime: $mime
        personId: $personId
      }
    ) {
      id
      filename
      bucket
    }
  }
`
