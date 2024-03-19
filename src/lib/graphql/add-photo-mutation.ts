import { gql } from "@apollo/client";

export const ADD_PERSON_PHOTO_MUTATION = gql`
  mutation AddPersonPhoto(
    $createdBy: String
    $filename: String
    $bucket: String
    $personId: Float!
  ) {
    addPersonPhoto(
      photoInput: {
        createdBy: $createdBy
        filename: $filename
        bucket: $bucket
        personId: $personId
      }
    ) {
      id
      filename
      bucket
    }
  }
`
