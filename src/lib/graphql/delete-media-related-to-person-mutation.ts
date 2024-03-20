import { gql } from "@apollo/client";

export const DELETE_MEDIA_RELATED_TO_PERSON_MUTATION = gql`
  mutation DeleteMediaObject(
    $mediaId: Float!
  ) {
    deleteMediaObject(
      mediaId: $mediaId
    ) {
      status
      message
    }
  }
`
