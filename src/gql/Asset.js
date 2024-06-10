import gql from "graphql-tag";

export const PublishAsset = gql`
  mutation PublishAsset($id: ID!) {
    publishAsset(where: { id: $id }) {
      id
      url
    }
  }
`;
