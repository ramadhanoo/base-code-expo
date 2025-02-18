import { TError } from "../network/types";

export type AuthState = {
  loading: boolean;
  userToken: UserToken | undefined | null;
  error: TError | null | undefined;
  success: boolean;
};

export type UserToken = {
  id?: number;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  image?: string;
  accessToken?: string;
  refreshToken?: string;
};
