import { QueryType } from "../enum/QueryTypes.enum";

export interface FetchIssuesOrPrVariables {
  owner: string;
  name: string;
  states?: any;
}

export interface FetchCommentsVariables {
  ID: string;
}

export interface UseFetchReqObj {
  queryType: QueryType;
  variables: FetchIssuesOrPrVariables | FetchCommentsVariables;
  skip: boolean;
}
