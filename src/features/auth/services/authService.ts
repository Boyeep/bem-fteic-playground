// authService
// Contains authentication-related API calls (login, signup, verify email).
// Centralizes all auth HTTP requests.

import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from "@/features/auth/types";
import { api } from "@/lib/api";

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("/login", credentials);
    return data;
  },

  signup: async (payload: SignupRequest): Promise<SignupResponse> => {
    const { data } = await api.post<SignupResponse>("/signup", payload);
    return data;
  },

  verifyEmail: async (
    payload: VerifyEmailRequest,
  ): Promise<VerifyEmailResponse> => {
    const { data } = await api.post<VerifyEmailResponse>(
      "/confirm-email",
      payload,
    );
    return data;
  },
};
