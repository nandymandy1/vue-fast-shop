import gql from "graphql-tag";

export const ProductsQuery = gql`
  query Products {
    products {
      price
      name
      slug
      stage
      id
      variants {
        ... on ProductSizeColorVariant {
          id
          name
          color
        }
        ... on ProductSizeVariant {
          id
          name
          stage
        }
        ... on ProductColorVariant {
          id
          name
          color
        }
      }
      images {
        url
        width
        height
      }
    }
  }
`;

export const ProductEditQuery = gql`
  query Product($id: ID!) {
    products(where: { id: $id }) {
      price
      name
      slug
      stage
      id
      variants {
        ... on ProductSizeColorVariant {
          id
          name
          color
        }
        ... on ProductSizeVariant {
          id
          name
          stage
        }
        ... on ProductColorVariant {
          id
          name
          color
        }
      }
      description
      images {
        id
        url
        width
        height
      }
    }
  }
`;

export const ProductQuery = gql`
  query Product($slug: String!) {
    products(where: { slug: $slug }) {
      price
      name
      slug
      stage
      id
      variants {
        ... on ProductSizeColorVariant {
          id
          name
          color
        }
        ... on ProductSizeVariant {
          id
          name
          stage
        }
        ... on ProductColorVariant {
          id
          name
          color
        }
      }
      description
      images {
        url
        width
        height
        id
      }
      reviews {
        email
        headline
        content
        rating
      }
    }
  }
`;

export const UpdateProductMutation = gql`
  mutation UpdateProduct(
    $id: ID!
    $name: String
    $description: String
    $price: Int!
    $image: AssetUpdateManyInlineInput
  ) {
    updateProduct(
      where: { id: $id }
      data: {
        name: $name
        price: $price
        images: $image
        description: $description
      }
    ) {
      id
      name
      description
      price
      images {
        id
        url
        height
        width
      }
    }
  }
`;

export const PublishAfterUpdate = gql`
  mutation PublishProduct($id: ID!) {
    publishProduct(where: { id: $id }) {
      id
    }
  }
`;

export const DeleteProductMutation = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(where: { id: $id }) {
      id
    }
  }
`;

export const CreateProductMutation = gql`
  mutation CreateProduct(
    $price: Int!
    $name: String!
    $slug: String!
    $description: String!
    $image: AssetCreateManyInlineInput
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        images: $image
        slug: $slug
      }
    ) {
      id
      name
      description
      price
      slug
      images {
        id
        url
        height
        width
      }
    }
  }
`;
