'use strict';

const { GraphQLClient, gql } = require('graphql-request');

const ENDPOINT = 'https://api.github.com/graphql';
const API_KEY = process.env.GITHUB_API_KEY;

const client = new GraphQLClient(ENDPOINT, {
  headers: {
    Authorization: `bearer ${API_KEY}`,
  },
});

const contributionsByYearQuery = gql`
  query ContributionsByYear($date: DateTime){
    viewer {
      contributionsCollection(
        from: $date
      ) {
        totalCommitContributions
        totalIssueContributions
        totalPullRequestContributions
        totalPullRequestReviewContributions
        totalRepositoryContributions
        joinedGitHubContribution {
          occurredAt
        }
      }
    }
  }
`;

const respositoriesQuery = gql`
  query Repositories($endCursor: String){
    viewer {
      repositories(
        first: 100
        after: $endCursor
      ) {
        totalCount
        nodes {
          languages(
            first: 100
          ) {
            nodes {
              name
              color
            }
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

module.exports = {
  client,
  contributionsByYearQuery,
  respositoriesQuery
};
