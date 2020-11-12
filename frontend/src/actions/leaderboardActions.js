import fetchDataGeneral from '../utilities/generalFetch';
import { leaderboardError } from './errorActions';

export const setBuildingsLeaderboard = (board) => ({
  type: 'SET_LEADERBOARD_BUILDINGS',
  payload: board,
});

export const getBuildingsLeaderboardFetch = () => {
  const endpoint = '/leaderboard/buildings';
  const method = 'GET';

  return async (dispath) => {
    try {
      const leaderboardResult = await fetchDataGeneral(endpoint, method);
      dispath(setBuildingsLeaderboard(leaderboardResult.leaderboard));
    } catch (error) {
      dispath(leaderboardError(error));
    }
  };
};
