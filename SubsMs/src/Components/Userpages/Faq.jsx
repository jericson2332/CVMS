import React, { useState } from "react";
import bannerImg from "../../assets/FAQ-banner.jpg";
import { Link } from "react-router-dom"; // Make sure you're using React Router

const faqs = [
  {
    question: "How do I apply for a subscription plan?",
    answer: "Click the 'Apply Now' button in the navigation bar and fill out the form.",
  },
  {
    question: "What documents are required?",
    answer: [
      {
        text: "Valid government-issued ID",
        link: "/requirements",
      },
      {
        text: "Recent proof of billing (e.g., electricity/water/internet bill)",
        link: "/requirements",
      },
      {
        text: "Completed application form",
        link: "/requirements",
      },
    ],
    isList: true,
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

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* Banner */}
      <div className="bg-blue-600 pb-1.5" />
      <div
        className="w-full h-[500px] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        {/* Background overlay with no pointer events */}
        <div className="absolute inset-0 bg-black/60 z-0 "></div>

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="text-md md:text-lg mt-2">Find answers to common customer queries</p>
        </div>
      </div>

      {/* FAQ Cards */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>

              {openIndex === index ? (
                faq.isList ? (
                  <ul className="list-disc list-inside mb-3">
                    {faq.answer.map((item, idx) => (
                      <li key={idx}>
                        <Link
                          to={item.link}
                          className="text-blue-600 hover:underline"
                        >
                          {item.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mb-3">{faq.answer}</p>
                )
              ) : (
                <p className="text-gray-500 mb-3">Click to see more...</p>
              )}

              <button
                onClick={() => toggleFaq(index)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
              >
                {openIndex === index ? "Show Less" : "Read More"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Faq;
