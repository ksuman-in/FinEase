import { auth } from "./auth";

// This extracts the exact type Better Auth uses based on your config
export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;

//For Member management lists (Admin view)
export interface MemberProfile extends User {
  totalContribution: number;
  activeLoanCount: number;
  status: "active" | "overdue" | "inactive";
}
