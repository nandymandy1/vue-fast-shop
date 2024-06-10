import gql from "graphql-tag";

export const CreatePayment = gql`
  mutation CreatePayment(
    $address: String!
    $amount: Int!
    $transactionId: String!
    $name: String!
    $products: ProductCreateManyInlineInput
    $phone: String!
    $email: String!
  ) {
    createPayment(
      data: {
        address: $address
        amount: $amount
        transaction_id: $transactionId
        user: $name
        products: $products
        phone: $phone
        email: $email
      }
    ) {
      address
      amount
      id
      transaction_id
      user
      products {
        id
        name
        price
      }
    }
  }
`;

export const PublishAfterUpdate = gql`
  mutation PublishPayment($id: ID!) {
    publishPayment(where: { id: $id }) {
      id
    }
  }
`;
