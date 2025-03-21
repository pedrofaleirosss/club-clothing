import IUser from "../../../interfaces/user";
import UserActionTypes from "./user.action-types";
import { UserActions } from "./user.actions";

interface InitialState {
  currentUser: IUser | null;
  isAuthenticated: boolean;
}

const initialState: InitialState = {
  currentUser: null,
  isAuthenticated: false,
};

const userReducer = (
  state = initialState,
  action: UserActions
): InitialState => {
  switch (action.type) {
    case UserActionTypes.LOGIN:
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: true,
      };
    case UserActionTypes.LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
