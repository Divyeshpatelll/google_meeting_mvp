import { errorResponse } from '../utils/response';

export function withErrorHandler(handler) {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error) {
      console.error('API Error:', error);
      
      if (error.message === 'No access token found') {
        return errorResponse('Unauthorized. Please sign in.', 401);
      }

      if (error.code === 403) {
        return errorResponse('Access denied. Please check your permissions.', 403);
      }

      if (error.code === 404) {
        return errorResponse('Resource not found.', 404);
      }

      return errorResponse(
        'An unexpected error occurred. Please try again later.',
        500
      );
    }
  };
} 