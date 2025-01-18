"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

/**
 * Refresh token error boundary. This component is used to catch refresh token errors and sign the user out.
 */
const RefreshTokenError = () => {
  useEffect(() => {
    signOut();
  }, []);

  return null;
};

export default RefreshTokenError;
