export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export const createApiResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});
