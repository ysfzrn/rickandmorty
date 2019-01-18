import gql from 'graphql-tag';

export const locationQuery = gql`
  query locations( $page: Int) {
    locations(page: $page) {
      info {
        prev
        next
        count
        pages
      }
      results {
        id
        name
        dimension
        type
      }
    }
  }
`;
