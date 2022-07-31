import { styled } from '@stitches/react';
import React from 'react';

import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { formatTime } from './utils';

const Container = styled('div', {
  margin: '0 auto',
  border: '1px solid #30363d',
  width: '70%',
  borderRadius: '7px',
  marginTop: '2rem',
});

const PRItem = styled('div', {
  width: '100%',
  padding: '1rem',
  cursor: 'pointer',
  borderBottom: '1px solid #30363d',
  '&:last-child': {
    borderBottom: 'none',
  },
  '&:hover': {
    background: '#1f2531',
  },
  '& h3': {
    color: 'WhiteSmoke',
  },

  '& p': {
    fontFamily: 'JetBrains Mono',
    marginTop: 7,
    color: '#8b949e',
  },
});

const PullRequest = () => {
  const navigate = useNavigate();
  let repoName = useSearchParams()[0].get('repo_name');
  const {
    data: prsData = [],
    isLoading,
    isFetched,
  } = useQuery<
    {
      latest_commit_id: string;
      pr_title: string;
      pr_number: number;
      pr_json_data: {
        user: {
          login: string;
        };
        created_at: string;
      };
    }[]
  >(
    ['prs', repoName],
    async () => {
      return await (
        await axios.get(
          `https://kodikas.xperiments.dev/prs/?repo_name=${repoName}`
        )
      ).data.repos;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  console.log(prsData, 'PRS DATA');

  return (
    <Container>
      {isLoading && <h3>Loading...</h3>}

      {isFetched &&
        prsData.map((pr) => {
          return (
            <PRItem
              onClick={() =>
                navigate(`/?latest_commit_id=${pr.latest_commit_id}`)
              }
            >
              <h3>{pr.pr_title}</h3>{' '}
              <p>
                #{pr.pr_number} opened {formatTime(pr.pr_json_data.created_at)}{' '}
                by {pr.pr_json_data.user.login}
              </p>
            </PRItem>
          );
        })}
    </Container>
  );
};

export default PullRequest;
