import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

type MatchesDisplayProps = {
  matches: [
    {
      user_id: string;
    },
  ];
  profile: {
    user_id: string;
  };
  setClickedUser: (match: any) => {};
};

export const MatchesDisplay = ({ matches, setClickedUser }: MatchesDisplayProps) => {
  const [matchedProfiles, setMatchedProfiles] = useState<any>();
  const [cookies, setCookie, removeCookie] = useCookies();

  const matchedUserIds = matches.map(({ user_id }) => user_id);
  const userId = cookies.UserId;

  const getMatches = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users', {
        params: { userIds: JSON.stringify(matchedUserIds) },
      });
      setMatchedProfiles(response.data);
    } catch (err) {
      throw new Error(`Error encountered getMatches GET: ${err}`);
    }
  };

  useEffect(() => {
    getMatches();
  }, [matches]);

  const filteredMatchedProfiles = matchedProfiles?.filter(
    (matchedProfile: MatchesDisplayProps) =>
      matchedProfile.matches.filter((profile: MatchesDisplayProps['profile']) => profile.user_id == userId).length > 0,
  );

  return (
    <div className="matches-display">
      {filteredMatchedProfiles?.map(
        (match: { url: string | undefined; first_name: string | undefined }, _index: number) => (
          <div key={_index} className="match-card" onClick={() => setClickedUser(match)}>
            <div className="img-container">
              <img src={match?.url} alt={match?.first_name + ' profile'} />
            </div>
            <h3>{match?.first_name}</h3>
          </div>
        ),
      )}
    </div>
  );
};
