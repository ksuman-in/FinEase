export default function PendingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-2xl font-black tracking-tight text-slate-900 uppercase">
          Access Restricted
        </h1>
        <p className="text-slate-600">
          Your account has been successfully created, but it requires **Super
          Admin verification** before you can access financial details.
        </p>
        <div className="pt-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            Status: Awaiting Review
          </span>
        </div>
      </div>
    </div>
  );
}
