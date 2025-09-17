# SSO Login Resolver Implementation Guide

This document provides guidance for implementing the backend resolver for the SSO login functionality.

## GraphQL Resolver Implementation

The backend needs to implement a resolver for the `ssoLogin` mutation. Here's a pseudocode implementation:

```typescript
// In your GraphQL resolver
const ssoLoginResolver = async (_, { input }, context) => {
  const { ssoToken } = input;
  
  try {
    // 1. Validate the SSO token with the SSO server
    const ssoServerUrl = process.env.SSO_SERVER_URL;
    const response = await fetch(`${ssoServerUrl}/api/validate-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: ssoToken }),
    });
    
    if (!response.ok) {
      throw new Error('Invalid SSO token');
    }
    
    // 2. Extract user information from the SSO response
    const userData = await response.json();
    const { email, name } = userData;
    
    // 3. Check if the user exists in your database
    let user = await UserModel.findOne({ email });
    
    // 4. If user doesn't exist, create a new one with JOB_SEEKER role
    if (!user) {
      const randomPassword = generateRandomPassword(); // Implement this function
      
      user = await UserModel.create({
        email,
        name,
        password: await hashPassword(randomPassword), // Implement this function
        role: 'JOB_SEEKER',
      });
    }
    
    // 5. Generate JWT token for the user
    const accessToken = generateJwtToken(user); // Implement this function
    
    // 6. Return the token and user roles
    return {
      accessToken,
      roles: user.roles || ['JOB_SEEKER'],
    };
  } catch (error) {
    console.error('SSO login error:', error);
    throw new Error('Authentication failed');
  }
};

// Helper function to generate a random password
const generateRandomPassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let password = 'r@ndom';
  
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  
  return password + 'pa$$word';
};
```

## GraphQL Schema Definition

Make sure your GraphQL schema includes the following type definitions:

```graphql
input SsoLoginInput {
  ssoToken: String!
}

type LoginResponseDto {
  accessToken: String!
  roles: [String!]!
}

extend type Mutation {
  ssoLogin(input: SsoLoginInput!): LoginResponseDto!
}
```

## Security Considerations

1. Always validate the SSO token with the SSO server before trusting it
2. Use HTTPS for all communications with the SSO server
3. Store passwords securely using proper hashing algorithms (e.g., bcrypt)
4. Implement proper error handling and logging
5. Consider implementing token expiration and refresh mechanisms

## Testing

Test the SSO login flow with the following scenarios:

1. Valid SSO token for a new user (should create a new account)
2. Valid SSO token for an existing user (should log in the user)
3. Invalid SSO token (should return an error)
4. Expired SSO token (should return an error)
