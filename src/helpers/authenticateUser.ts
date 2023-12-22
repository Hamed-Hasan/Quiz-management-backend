// authentication middleware
import { Request, Response, NextFunction } from 'express';
import { jwtHelpers } from './jwtHelpers';

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Invalid or missing token');
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwtHelpers.verifyToken(token, 'quiz-app');

    // Log the userId for debugging
    console.log('Authenticated User ID:', decodedToken.userId);

    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
