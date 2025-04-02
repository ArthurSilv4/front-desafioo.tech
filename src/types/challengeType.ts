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
  useStartChallenge: {
    mutate: (variables: StartsChallengeRequest) => void;
    isLoading: boolean;
  };
  isSuccess: boolean;
  resetSuccess: () => void;
  useCreateChallenge: {
    mutate: (variables: CreateChallengeRequest) => void;
    isLoading: boolean;
  };

  useEditChallenge: {
    mutate: (variables: { id: string } & EditChallengeRequest) => void;
    isLoading: boolean;
  };

  useDeleteChallenge: {
    mutate: (variables: { id: string }) => void;
    isLoading: boolean;
  };
};
