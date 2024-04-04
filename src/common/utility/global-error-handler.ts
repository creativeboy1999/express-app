import { Request, Response } from 'express';
import { BaseException } from '../errors/common.error';
import { telegramBot } from '../telegram/telegram-bot';
import { StatusCodes } from './status-codes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err, request: Request, response: Response, next) => {
  telegramBot.sendMessage(
    `
      error while request to server. Unhandled exception
      \nip: ${request.ip}
      \nrequest url: ${request.url}
      \nrequest originalUrl: ${request.originalUrl}
      \nrequest baseUrl: ${request.baseUrl}
      \nrequest method: ${request.method}
      \nrequest path: ${request.path}
      \nuserId: ${request.user?.id}
      \n🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢
      request headers: <pre><code class="language-json">${JSON.stringify(
        request.headers,
        null,
        2,
      )}</code></pre>
      \n🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢
      request body: <pre><code class="language-json">${JSON.stringify(
        request.body,
        null,
        2,
      )}</code></pre>
      \n🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢
      exception message: <pre><code class="language-json">${err.message}</code></pre>
      \n🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢
      exception name: <pre><code class="language-json">${err.name}</code></pre>
      \n🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢
      exception: <pre><code class="language-json">${JSON.stringify(err, null, 2)}</code></pre>
    `,
  );

  console.error(
    '================================ GLOBAL ERROR HANDLER =================================\n',
    err,
  );
  if (err.code && err.time) {
    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }

  return response.status(StatusCodes.INTERNAL_SERVER_ERROR).send(BaseException.UnknownError(err));
};
