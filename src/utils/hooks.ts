import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useRepos = (latestCommitId: string) => {
  const queryData = useQuery<{
    changed_file: string;
    original_file: string;
    file_path: string;
  }>(
    ['commit'],
    async () =>
      await await (
        await axios.get(
          `https://kodikas.xperiments.dev/commit-data/?commit_id=${latestCommitId}`
        )
      ).data,
    {
      refetchOnWindowFocus: false,
    }
  );
  return queryData;
};
