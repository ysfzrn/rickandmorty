import gql from 'graphql-tag';

export const episodeQuery = gql`
  query episodes( $page: Int) {
    episodes(page: $page) {
      info{
        count
        pages
        next
        prev
      }
      results{
        id
        name
        air_date
        episode
      }
    }
  }
`;
