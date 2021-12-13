'use strict';

const moment = require('moment');

const {
  client,
  contributionsByYearQuery,
  respositoriesQuery
} = require('./services/graphql');

const FIRST_COMMIT_DATE = moment('2017-04-15');
const YEARS = moment().diff(FIRST_COMMIT_DATE, 'years');

const fetchContributions = async () => {
  const response = {
    totalCommitContributions: 0,
    totalIssueContributions: 0,
    totalPullRequestContributions: 0,
    totalPullRequestReviewContributions: 0,
    totalRepositoryContributions: 0,
    joinedGitHubContribution: null,
  };

  for(let i = 0; i <= YEARS; i += 1) {
    const variables = { date: FIRST_COMMIT_DATE.clone().add(i, 'years') };
    const { viewer: { contributionsCollection } } = await client.request(contributionsByYearQuery, variables);

    const {
      totalCommitContributions,
      totalIssueContributions,
      totalPullRequestContributions,
      totalPullRequestReviewContributions,
      totalRepositoryContributions,
      joinedGitHubContribution
    } = contributionsCollection;

    response.totalCommitContributions += totalCommitContributions;
    response.totalIssueContributions += totalIssueContributions;
    response.totalPullRequestContributions += totalPullRequestContributions;
    response.totalPullRequestReviewContributions += totalPullRequestReviewContributions;
    response.totalRepositoryContributions += totalRepositoryContributions;

    if (joinedGitHubContribution) {
      response.joinedGitHubContribution = joinedGitHubContribution.occurredAt;
    }
  }

  return response;
}

const fetchRepositories = async () => {
  const response = {
    totalCount: 0,
    languages : {}
  };

  let endCursor = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const variables = { endCursor };
    const { viewer: { repositories } } = await client.request(respositoriesQuery , variables);

    const { totalCount, nodes, pageInfo } = repositories;

    response.totalCount = totalCount;

    nodes.forEach(({ languages }) => languages.nodes.forEach(({ name, color }) => {
      if (!response.languages.hasOwnProperty(name)) {
        response.languages[name] = {
          count: 0,
          color
        };
      }
      response.languages[name].count += 1;
    }));

    hasNextPage = pageInfo.hasNextPage;
    endCursor = pageInfo.endCursor;
  }

  response.languages = Object.entries(response.languages)
    .map(([key, value]) => ({ name: key, count: value.count, color: value.color }))
    .sort((firstObj, secondObj) => secondObj.count - firstObj.count);

  return response;
}

module.exports = {
  fetchContributions,
  fetchRepositories,
};
