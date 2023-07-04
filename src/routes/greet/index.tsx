import { type RequestHandler } from '@builder.io/qwik-city';
 
export const onGet: RequestHandler = async ({ send, url }) => {
  const response = await fetch(
    new URL('http://roy_go.casa.art/', url)
  );
  send(response);
};