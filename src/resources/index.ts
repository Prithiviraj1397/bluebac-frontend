import {
  LazyQueryHookOptions,
  OperationVariables,
  MutationHookOptions,
  DefaultContext,
  ApolloCache,
} from "@apollo/client"

export const queryOptions: LazyQueryHookOptions<any, OperationVariables> = {
  fetchPolicy: "network-only",
  errorPolicy: "all",
}
export const mutationOptions: MutationHookOptions<any, OperationVariables, DefaultContext, ApolloCache<any>> = {
  fetchPolicy: "network-only",
  errorPolicy: "all",
}
export const permissionArray = [
  {
    label: "Quotations",
    access: {
      add: false,
      view: false,
      edit: false,
      delete: false,
    },
  },
  {
    label: "Orders",
    access: {
      add: false,
      view: false,
      edit: false,
      delete: false,
    },
  },
  {
    label: "Services",
    access: {
      add: false,
      view: false,
      edit: false,
      delete: false,
    },
  },
  {
    label: "Tickets",
    access: {
      add: false,
      view: false,
      edit: false,
      delete: false,
    },
  },
  {
    label: "Billings",
    access: {
      add: false,
      view: false,
      edit: false,
      delete: false,
    },
  },
  {
    label: "Customers",
    access: {
      add: false,
      view: false,
      edit: false,
      delete: false,
    },
  },

]
