import gql from 'graphql-tag';

export const residentQuery = gql`
  query locations( $page: Int, $planet: String ) {
    locations(page: $page, filter:{name:$planet }) {
      info {
        prev
        next
        count
        pages
      }
      results {
        dimension
        residents{
          id
          name
          status
          species
          gender
          type
          image
          location{
            name
            dimension
          }
        }
      }
    }
  }
`;
