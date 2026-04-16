import { auth } from "./auth";

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;

export interface MemberProfile extends User {
  totalContribution: number;
  activeLoanCount: number;
  status: "active" | "overdue" | "inactive";
}
