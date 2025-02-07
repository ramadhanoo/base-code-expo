export interface TDefaultData {
  message: string;
}

// export interface TError {
//   [key: string]: string;
// }

// export interface TResponse<S = TDefaultData, F = TError> {
//   success: boolean;
//   isClientError: boolean;
//   isServerError: false;
//   data: S;
//   error: F;
// }

export type TResponse<T> = T;

export interface TError {
  message: string;
}

// export type TResponse = any

export interface TEntryKey {
  route?: string;
  objective?: string | null;
  advice?: string | null;
  product?: string | null;
}
