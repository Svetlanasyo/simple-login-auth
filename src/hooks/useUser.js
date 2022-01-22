import { useContext } from 'react';
import { UserContext } from '../providers/UserProvider';

// custom hook to hide the way we get info about user
export const useUser = () => {
  return useContext(UserContext);
};
