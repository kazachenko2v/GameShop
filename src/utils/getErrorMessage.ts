export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    switch (error.message) {
      case "Firebase: Error (auth/user-not-found).":
        return "User not found";
      case "Firebase: Error (auth/invalid-email).":
        return "Invalid email";
      case "Firebase: Error (auth/email-already-in-use).":
        return "Email already in use";
    }
  }
  return String(error);
};
