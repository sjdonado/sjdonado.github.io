import React from 'react';

interface Props {
  type: string;
  value: number;
}

interface ContributionsTypesDictionary {
  [key: string]: ContributionType;
}

const CONTRIBUTIONS_TYPES: ContributionsTypesDictionary = {
  totalCommitContributions: {
    icon: 'fas fa-file-code',
    name: 'Total commit contributions',
  },
  totalIssueContributions: {
    icon: 'fab fa-github-square',
    name: 'Total issue contributions',
  },
  totalPullRequestContributions: {
    icon: 'fas fa-code-branch',
    name: 'Total PR contributions',
  },
  totalPullRequestReviewContributions: {
    icon: 'fas fa-clipboard-check',
    name: 'Total PR reviews',
  },
  totalRepositoryContributions: {
    icon: 'fas fa-archive',
    name: 'Total repositories created',
  },
  joinedGitHubContribution: {
    icon: 'fas fa-user',
    name: 'Joined at',
  },
};

const ContributionItem: React.FC<Props> = function ContributionItem({
  type,
  value,
}) {
  const { icon, name } = CONTRIBUTIONS_TYPES[type];
  return (
    <div className="flex items-center justify-start space-x-2 divide-x rounded border border-gray-800 px-2">
      <div className="flex items-center space-x-2">
        <i className={`text-xl ${icon}`} />
        <p>{name}</p>
      </div>
      <span className="pl-2">{value}</span>
    </div>
  );
};

export default ContributionItem;
