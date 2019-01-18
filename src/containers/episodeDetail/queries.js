import gql from 'graphql-tag';

export const episodeDetailQuery = gql`
  query episodes( $page: Int, $episode: String ) {
    episodes(page: $page, filter:{episode:$episode }) {
      info {
        prev
        next
        count
        pages
      }
      results{
        id
        name
        air_date
        characters{
          id
          name
          status
          species
          gender
          type
          image
          location{
            name
          }
        }
      }
    }
  }
`;
