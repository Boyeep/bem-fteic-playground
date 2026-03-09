import { AxiosError } from "axios";
import toast from "react-hot-toast";

import { UninterceptedApiError } from "@/types/api";

export function handleError(error: unknown) {
  if (error instanceof AxiosError) {
    const err = error as AxiosError<UninterceptedApiError>;

    if (err.response?.status === 404) {
      window.location.href = "/not-found";
      return;
    }

    if (err.response?.status && err.response.status >= 500) {
      window.location.href = "/error";
      return;
    }

    const message = err.response?.data?.message;

    if (typeof message === "string") {
      toast.error(message);
    } else if (message && typeof message === "object") {
      // If the error message is an object containing arrays of strings (e.g., validation errors)
      const firstErrorKey = Object.keys(message)[0];
      if (firstErrorKey && message[firstErrorKey][0]) {
        toast.error(message[firstErrorKey][0]);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } else {
      toast.error(err.message || "An unexpected error occurred.");
    }
  } else if (error instanceof Error) {
    toast.error(error.message);
  } else if (typeof error === "string") {
    toast.error(error);
  } else {
    toast.error("An unexpected error occurred.");
  }
}
