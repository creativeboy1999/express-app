import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import '../common/utility/patch-with-catcher';
import { addMethodToResponse } from '../common/utility/add-response-method';
import { globalErrorHandler } from '../common/utility/global-error-handler';
import routes from './routes';
import { rateLimit } from 'express-rate-limit';
import { BaseException } from '../common/errors/common.error';
import { ERROR_CODES } from '../common/constant';
import { logsServiceInstance } from './logs/service';

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});

// Apply the rate limiting middleware to all requests.
const app = express()
  .use(cors())
  .use(logsServiceInstance.middleware)
  .use(limiter)
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(addMethodToResponse)
  .use(routes)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .use('*', function (req, res, next) {
    res.status(404).json(BaseException.NotFound(ERROR_CODES.BASE, 'Route'));
  })
  .use(globalErrorHandler);

export default app;
