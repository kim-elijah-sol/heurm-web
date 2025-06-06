import { https } from '~/shared/lib';
import { getChallengeResponseSchema } from './main.schema';
import { GetChallengeResponseSchema } from './main.type';

export const getChallenge = () =>
  https.get<GetChallengeResponseSchema>('/challenge').then((response) => {
    const parseResult = getChallengeResponseSchema.safeParse(response.data);

    if (parseResult.success === false) {
      throw parseResult.error;
    }

    return response.data;
  });
