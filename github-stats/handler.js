'use strict';

const { fetchContributions, fetchRepositories } = require('./fetcher');
const { writeData } = require('./services/firebase');

module.exports.run = async (event, context) => {
  try {
    const contributions = await fetchContributions();
    const repositories = await fetchRepositories();
    const githubStats = {
      contributions,
      repositories,
      updatedAt: new Date().toISOString(),
    };
    await writeData('public/githubStats', githubStats);
  } catch (err) {
    console.log(err);
  }
};
