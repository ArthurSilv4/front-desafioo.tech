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

export type AuthorInformationsResponse = {
  name: string;
  description: string;
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

