import React from 'react';
import moment from 'moment';

import ContributionItem from './ContributionItem';
import LanguagesChart from './LanguagesChart';

interface Props {
  githubStats: GithubStats;
}

const GithubSection: React.FC<Props> = function GithubSection({
  githubStats,
}) {
  const { contributions, repositories, updatedAt } = githubStats;

  const mostUsedLanguages = repositories.languages.slice(0, 16);

  contributions.joinedGitHubContribution = moment(contributions.joinedGitHubContribution).format('LL');

  return (
    <>
      <section className="flex flex-col my-2">
        <a className="text-2xl underline my-2" href="#github-stats">Github stats</a>
        <div className="flex flex-wrap space-x-4 space-y-4 justify-center">
          <div className="flex flex-col items-start justify-center space-y-1">
            {Object.entries(contributions).map(([key, value]) => (
              <ContributionItem
                key={key}
                type={key}
                value={value}
              />
            ))}
          </div>
          <LanguagesChart languages={mostUsedLanguages} />
        </div>
      </section>
      <p className="text-xs w-full text-right mt-1">{`Updated at: ${moment(updatedAt).format('LLL')}`}</p>
    </>
  );
};

export default GithubSection;
