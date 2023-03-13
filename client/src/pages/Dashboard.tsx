import React, { useEffect, useState } from 'react';
import TinderCard from 'react-tinder-card';
import axios from 'axios';
import { useCookies } from 'react-cookie';

import { ChatContainer } from '../components';

export const Dashboard = () => {
  const [user, setUser] = useState<{ gender_interest: string; matches: [] }>();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [lastDirection, setLastDirection] = useState();
  const [genderedUsers, setGenderedUsers] = useState<[]>();

  const userId = cookies.UserId;

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/user', {
        params: { userId },
      });
      setUser(response.data);
    } catch (err) {
      throw new Error(`Error encountered getUser GET: ${err}`);
    }
  };

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/gendered-users', {
        params: { gender: user?.gender_interest },
      });
      setGenderedUsers(response.data);
    } catch (err) {
      throw new Error(`Error encountered getGenderedUsers GET: ${err}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getUser();
    };
    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await getGenderedUsers();
      }
    };
    fetchData().catch(console.error);
  }, [user]);

  const updatedMatches = async (matchedUserId: string) => {
    try {
      await axios.put('http://localhost:5000/add-match', {
        userId,
        matchedUserId,
      });
    } catch (err) {
      throw new Error(`Error encountered updatedMatches PUT: ${err}`);
    }
  };

  const swiped = async (direction: any, swipedUserId: string) => {
    if (direction === 'right') {
      await updatedMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name: string) => {
    console.log(name + ' left the screen!');
  };

  const matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId);

  // @ts-ignore
  const filteredGenderedUsers = genderedUsers?.filter(genderedUser => !matchedUserIds?.includes(genderedUser.user_id));

  return (
    <>
      {user && (
        <div className={'dashboard'}>
          <ChatContainer user={user} />
          <div className={'swipe-container'}>
            <div className={'card-container'}>
              {filteredGenderedUsers?.map((genderedUser: { first_name: string; url: string; user_id: string }) => (
                <TinderCard
                  className={'swipe'}
                  key={genderedUser.user_id}
                  onSwipe={dir => swiped(dir, genderedUser.user_id)}
                  onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
                >
                  <div style={{ backgroundImage: 'url(' + genderedUser.url + ')' }} className={'card'}>
                    <h3>{genderedUser.first_name}</h3>
                  </div>
                </TinderCard>
              ))}
              <div className={'swipe-info'}>{lastDirection ? <p>You swiped {lastDirection} </p> : <p />}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
