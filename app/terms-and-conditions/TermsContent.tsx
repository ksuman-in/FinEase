import { GroupRole } from "@prisma/client";

interface TermsContentProps {
  role: GroupRole;
}

export default function TermsContent({ role }: TermsContentProps) {
  const isBorrower = role === GroupRole.BORROWER;

  return (
    <div className="space-y-6 text-slate-700 leading-relaxed text-sm">
      <header className="border-b border-slate-100 pb-4">
        <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">
          {isBorrower
            ? "Borrower Credit Agreement"
            : "Member Participation Terms"}
        </h3>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Last Updated: May 2026
        </p>
      </header>

      <div className="space-y-4">
        {isBorrower ? (
          <>
            <section>
              <h4 className="font-bold text-slate-900">
                1. Interest Obligation
              </h4>
              <p>
                The Borrower agrees to a fixed interest rate of **18% per
                annum**, calculated on the outstanding principal balance. This
                rate is non-negotiable within this vault context.
              </p>
            </section>
            <section>
              <h4 className="font-bold text-slate-900">
                2. Repayment Schedule
              </h4>
              <p>
                All dues must be cleared by the **5th of every calendar month**.
                Delays exceeding 48 hours will result in an automated Late
                Status flag visible to the Group Owner.
              </p>
            </section>
            <section>
              <h4 className="font-bold text-slate-900">
                3. Default & Recovery
              </h4>
              <p>
                Non-payment for 60 consecutive days constitutes a default. The
                platform reserves the right to suspend access to all other
                vaults and initiate internal recovery protocols.
              </p>
            </section>
          </>
        ) : (
          <>
            <section>
              <h4 className="font-bold text-slate-900">
                1. Capital Deployment
              </h4>
              <p>
                Members acknowledge that their monthly contributions are pooled
                and utilized to provide credit facilities for whitelisted
                Borrowers within this specific 10-member group.
              </p>
            </section>
            <section>
              <h4 className="font-bold text-slate-900">2. Target Yield</h4>
              <p>
                The **12% annual growth** target is performance-based. Actual
                returns depend on the consistent repayment of loans by Borrowers
                within the vault.
              </p>
            </section>
            <section>
              <h4 className="font-bold text-slate-900">
                3. Liquidity & Lock-in
              </h4>
              <p>
                To maintain vault stability, a **6-month seasoning period**
                applies to all capital. Early withdrawal requests are subject to
                approval and may incur a liquidity fee.
              </p>
            </section>
          </>
        )}

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4">
          <section>
            <h4 className="font-bold text-slate-900 mb-1">
              General Governance
            </h4>
            <p className="text-xs">
              Users are responsible for the accuracy of provided identity
              details (Aadhaar/PAN). Discrepancies may lead to immediate
              suspension from the platform.
            </p>
          </section>
          <section>
            <h4 className="font-bold text-rose-600 mb-1">
              Misconduct Penalties
            </h4>
            <p className="text-xs text-slate-700">
              Exiting the community with malicious intent or causing deliberate
              financial loss violates this agreement. Such behavior triggers
              immediate legal recovery protocols, credit bureau reporting, and
              permanent platform bans.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
