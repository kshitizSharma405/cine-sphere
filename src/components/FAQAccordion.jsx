import React, { useState } from "react";

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is CineSphere?",
      answer: "CineSphere is a movie platform for film enthusiasts!",
    },
    {
      question: "How can I register?",
      answer:
        "Click on the Register button and fill out the form with your details.",
    },
    {
      question: "Where does the data come from?",
      answer: "We use the OMDb API to fetch movie data.",
    },
    {
      question: "Can I like and rate movies?",
      answer: "Yes, you can like, comment, and rate movies on our platform.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="mt-10 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">FAQs</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-3 border-b pb-2">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full text-left text-lg font-semibold text-indigo-600 focus:outline-none"
          >
            {faq.question}
          </button>
          <div
            className={`${
              activeIndex === index
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            } overflow-hidden transition-all duration-300 ease-in-out`}
          >
            {activeIndex === index && (
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
