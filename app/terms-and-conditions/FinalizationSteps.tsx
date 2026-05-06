import { CheckCircle, FileText, Mail, Printer } from "lucide-react";

export default function FinalizationSteps() {
  const steps = [
    {
      title: "Complete Digital Form",
      desc: "Fill in your Aadhaar, PAN, and Bank details accurately.",
      icon: <FileText />,
    },
    {
      title: "Apply Digital Signature",
      desc: "Sign the agreement on your screen to generate the legal PDF.",
      icon: <CheckCircle />,
    },
    {
      title: "Print & Self-Attest",
      desc: "Print the PDF and sign it physically. Attach copies of ID proofs.",
      icon: <Printer />,
    },
    {
      title: "Send to Bengaluru",
      desc: "Courier the physical bundle to our office in Bengaluru.",
      icon: <Mail />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-12">
      {steps.map((step, i) => (
        <div
          key={i}
          className="p-6 bg-white/40 border border-white rounded-3xl shadow-sm"
        >
          <div className="text-blue-600 mb-4">{step.icon}</div>
          <h4 className="font-black text-xs uppercase mb-2">Step {i + 1}</h4>
          <p className="text-sm text-slate-600">{step.desc}</p>
        </div>
      ))}
    </div>
  );
}
