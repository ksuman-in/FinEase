import { auth } from "./auth";

export type Session = typeof auth.$Infer.Session;
export type User = Session["user"] & {
  isSuperAdmin: boolean;
  isVerified: boolean;
  role: "MEMBER" | "BORROWER" | "ADMIN";
};

export interface MemberProfile extends User {
  totalContribution: number;
  activeLoanCount: number;
  status: "active" | "overdue" | "inactive";
}
