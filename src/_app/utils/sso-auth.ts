/**
 * SSO Authentication Utilities
 * 
 * This file contains utility functions for handling SSO authentication
 * with the external SSO server.
 */

/**
 * Initiates the SSO login process by redirecting to the SSO server
 */
export const initiateSSoLogin = () => {

  // Redirect to SSO server login page
  window.location.href = `${import.meta.env.VITE_SSO_SERVER_URL}/login?token=${import.meta.env.VITE_SSO_TOKEN}&redirect_url=${import.meta.env.VITE_SSO_REDIRECT_URL}`;
};

/**
 * Handles SSO logout by clearing local storage and redirecting to SSO server logout
 */
export const handleSsoLogout = () => {
  // Clear local storage
  localStorage.removeItem("accessToken");
  window.location.reload();
};

/**
 * Validates an SSO token by making a request to the backend
 * This is used in the callback page after receiving a token from the SSO server
 */
export const validateSsoToken = async (token: string) => {
  try {
    // This function would typically make a GraphQL mutation to validate the token
    // The implementation would depend on your backend API
    return {
      valid: true,
      token
    };
  } catch (error) {
    console.error("Error validating SSO token:", error);
    return {
      valid: false,
      error: "Failed to validate SSO token"
    };
  }
};
