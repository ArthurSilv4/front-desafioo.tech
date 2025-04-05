import { UseMutationResult } from "react-query";

export type ChallengeResponse = {
  id: string;
  title: string;
  description: string;
  dificulty: string;
  category: string;
  author: string;
  links?: string[];
  starts: number;
};

export type StartChallengeResponse = {
  message: string;
  dto: {
    name: string;
    email: string;
    challenge: ChallengeResponse;
  };
};

export type StartsChallengeRequest = {
  id: string;
  name: string;
  email: string;
};

export type CreateChallengeRequest = {
  title: string;
  description: string;
  dificulty: string;
  category: string[];
  links?: string[];
};

export type EditChallengeRequest = {
  title?: string;
  description?: string;
  dificulty?: string;
  category?: string[];
  links?: string[];
};

export type ChallengeContextType = {
  useFetchChallenge: () => {
    data: ChallengeResponse[] | undefined;
    isLoading: boolean;
  };

  useFetchChallengeUser: () => {
    data: ChallengeResponse[] | undefined;
    isLoading: boolean;
  };

  useFetchChallengeById: (id: string) => {
    data: ChallengeResponse | undefined;
    isLoading: boolean;
  };

  useFetchAuthorsChallenges: () => {
    data: [] | undefined;
    isLoading: boolean;
  };

  useStartChallenge: UseMutationResult<
    StartChallengeResponse,
    Error,
    StartsChallengeRequest
  >;

  useCreateChallenge: UseMutationResult<
    ChallengeResponse,
    Error,
    CreateChallengeRequest
  >;

  useEditChallenge: UseMutationResult<
    ChallengeResponse,
    Error,
    { id: string } & EditChallengeRequest
  >;

  useDeleteChallenge: UseMutationResult<
    ChallengeResponse,
    Error,
    { id: string }
  >;
};
