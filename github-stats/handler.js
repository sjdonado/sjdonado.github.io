'use strict';

const { fetchContributions, fetchRepositories } = require('./fetcher');
const { writeData } = require('./services/firebase');

module.exports.run = async (event, context) => {
  try {
    const contributions = await fetchContributions();
    const repositories = await fetchRepositories();
    const data = {
      contributions,
      repositories,
      updatedAt: new Date().toISOString(),
    };
    await writeData('githubStats', data);
  } catch (err) {
    console.log(err);
  }
};
