export const GRAPHQL_API = "https://753z9h0t.api.sanity.io/v2023-08-01/graphql/production/default";

export const GET_POST_QUERY = `
query {
    allPost(sort: {
      _updatedAt: DESC
    }) {title,slug {current}, mainImage {asset{url}}}
}`;