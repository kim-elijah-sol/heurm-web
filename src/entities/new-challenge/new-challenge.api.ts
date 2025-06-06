import { https } from '~/shared/lib';
import { postChallengeResponseSchema } from './new-challenge.schema';
import {
  PostChallengeRequestSchema,
  PostChallengeResponseSchema,
} from './new-challenge.type';

export const postChallenge = (body: PostChallengeRequestSchema) =>
  https
    .post<PostChallengeResponseSchema>('/challenge', body)
    .then((response) => {
      const parseResult = postChallengeResponseSchema.safeParse(response.data);

      if (parseResult.success === false) {
        throw parseResult.error;
      }

      return response.data;
    });
