import { https } from '~/shared/lib';
import { postChallengeResponseSchema } from './new-challenge.schema';
import type {
  PostChallengeRequestSchema,
  PostChallengeResponseSchema,
} from './new-challenge.type';

export const postChallenge = (body: PostChallengeRequestSchema) =>
  https
    .post<PostChallengeResponseSchema>('/challenge', body)
    .then(https.validateResponse(postChallengeResponseSchema));
