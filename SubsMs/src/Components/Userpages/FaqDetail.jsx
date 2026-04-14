import { useParams, Link } from "react-router-dom";

const faqs = [
  {
    question: "How do I apply for a subscription plan?",
    answer: "Click the 'Apply Now' button in the navigation bar and fill out the form.",
  },
  {
    question: "What documents are required?",
    answer: "We need a valid government-issued ID and recent proof of billing.",
  },
  {
    question: "How long does installation take?",
    answer: "Installation is typically done within 2–5 working days.",
  },
  {
    question: "How do I pay my bill?",
    answer: "Payments can be made via GCash, bank transfer, or in person.",
  },
  {
    question: "What if I experience connectivity issues?",
    answer: "Try restarting your router. If it persists, contact support.",
  },
];

const FaqDetail = () => {
  const { id } = useParams();
  const faq = faqs[id];

  if (!faq) {
    return <div className="text-center py-10">FAQ not found.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-20 px-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">{faq.question}</h1>
      <p className="text-gray-700 text-lg">{faq.answer}</p>

      <Link to="/faq">
        <button className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          ← Back to FAQs
        </button>
      </Link>
    </div>
  );
};

export default FaqDetail;
