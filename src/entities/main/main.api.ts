import { https } from '~/shared/lib';
import { challengeResponseSchema } from './main.schema';
import { ChallengeResponseSchema } from './main.type';

export const getChallenge = () =>
  https.get<ChallengeResponseSchema>('/challenge').then((response) => {
    const parseResult = challengeResponseSchema.safeParse(response.data);

    if (parseResult.success === false) {
      throw parseResult.error;
    }

    return response.data;
  });
