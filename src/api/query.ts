import { gql } from "@apollo/client"

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      status
      message
      token
    }
  }
`
export const GET_TOKEN_DETAILS = gql`
  query GetTokenDetails($token: String!) {
    getTokenDetails(token: $token) {
      status
      data {
        id
        username
        email
        role {
          role
          permissions {
            label
            access {
              add
              view
              edit
              delete
            }
          }
        }
      }
    }
  }
`
export const LOGOUT = gql`
  query Logout {
    logout {
      status
      message
    }
  }
`
export const TOKEN_VALIDATION = gql`
  query TokenValidate($token: String!) {
    tokenValidate(token: $token) {
      status
      message
    }
  }
`
export const FORGET_PASSWORD = gql`
  query Query($email: String!) {
    forgetPassword(email: $email) {
      status
      message
    }
  }
`
export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password) {
      status
      message
    }
  }
`
export const CREATE_SUBADMIN = gql`
  mutation CreateSubadmin($input: createSubadminInput) {
    createSubadmin(Input: $input) {
      status
      message
      data {
        _id
        firstName
        lastName
        email
        type
        gender
        phoneNo
        country
        address
        role {
          role
          permissions {
            label
            access {
              add
              view
              edit
              delete
            }
          }
        }
      }
    }
  }
`
