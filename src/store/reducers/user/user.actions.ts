import IUser from "../../../interfaces/user";
import UserActionTypes from "./user.action-types";

interface LoginUserAction {
  type: typeof UserActionTypes.LOGIN;
  payload: IUser;
}

interface LogoutUserAction {
  type: typeof UserActionTypes.LOGOUT;
}

export const loginUser = (payload: IUser): LoginUserAction => ({
  type: UserActionTypes.LOGIN,
  payload,
});

export const logoutUser = (): LogoutUserAction => ({
  type: UserActionTypes.LOGOUT,
});

export type UserActions = LoginUserAction | LogoutUserAction;
