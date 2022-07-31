import { styled } from '@stitches/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatTime } from './utils';

const Container = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '20px',
  padding: '1rem',
});

const Repo = styled('div', {
  border: '1px solid #30363d',
  height: '200px',
  boxShadow: 'rgb(81 80 80 / 8%) 0px 6px 0px',
  borderRadius: '5px',
  cursor: 'pointer',
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '&:hover': {
    background: '#1f2531',
  },
  '& p': {
    marginTop: '0.5rem',
    color: '$primaryText',
  },
});

const RepoNameContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
});

const StatusIndicator = styled('div', {
  width: '10px',
  height: '10px',
  background: '#51e2c1',
  filter: 'blur(1px)',
  borderRadius: '50%',
});

const Repos = () => {
  const navigate = useNavigate();
  const {
    data = [],
    isLoading,
    isFetched,
  } = useQuery<
    {
      repo_id: number;
      repo_name: string;
      repo_description: string;
      repo_created_at: string;
      repo_updated_at: string;
    }[]
  >(
    ['repos'],
    async () => {
      return await (
        await axios.get('https://kodikas.xperiments.dev/repos')
      ).data.repos;
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Container>
      {isLoading && <h1>Loading</h1>}
      {isFetched &&
        data.map(
          ({ repo_id, repo_name, repo_description, repo_updated_at }) => {
            return (
              <Repo
                onClick={() => navigate(`/prs/?repo_name=${repo_name}`)}
                key={repo_id}
              >
                <RepoNameContainer>
                  <div>
                    <h2>{repo_name}</h2>
                    <p>{repo_description}</p>
                  </div>
                  <StatusIndicator />
                </RepoNameContainer>
                <div>
                  <p> Updated {formatTime(repo_updated_at)} </p>{' '}
                </div>
              </Repo>
            );
          }
        )}
    </Container>
  );
};

export default Repos;
