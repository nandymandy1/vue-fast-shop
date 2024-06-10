import gql from "graphql-tag";

export const HomeBanner = gql`
  query MyQuery {
    assets {
      id
      url
    }
  }
`;
