import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = {
    general: [
      {
        question: "What is E-Shark?",
        answer: "E-Shark is an online platform that connects innovators with investors. It's inspired by Shark Tank, allowing entrepreneurs to pitch their ideas to potential investors digitally, making the funding process more accessible and efficient."
      },
      {
        question: "Is E-Shark free to use?",
        answer: "Yes! Creating an account and pitching your idea is completely free for innovators. Investors can also browse and connect with innovators at no cost. We believe in democratizing access to startup funding."
      },
      {
        question: "How does E-Shark make money?",
        answer: "Currently, E-Shark is free for all users. In the future, we may introduce premium features for advanced analytics and priority support, but the core platform will always remain accessible to everyone."
      },
      {
        question: "Is my data secure on E-Shark?",
        answer: "Absolutely! We use bank-level encryption (JWT authentication, bcrypt password hashing) to protect your data. We never share your personal information without consent, and all communications are encrypted."
      }
    ],
    innovators: [
      {
        question: "How do I create a pitch?",
        answer: "After registering as an innovator, go to your dashboard and click 'Create New Pitch'. You'll fill out a multi-step form covering your problem statement, solution, market size, revenue model, and funding needs. Our team reviews all pitches before they go live."
      },
      {
        question: "How long does pitch approval take?",
        answer: "Most pitches are reviewed within 24-48 hours. Our team ensures that all pitches meet quality standards and contain sufficient information for investors to make informed decisions."
      },
      {
        question: "Can I edit my pitch after submission?",
        answer: "Yes! You can edit your pitch anytime from your dashboard. However, if you make significant changes, it may go through review again to maintain quality standards."
      },
      {
        question: "What happens after an investor shows interest?",
        answer: "When an investor shortlists your pitch or initiates a chat, you'll get notified. You can then communicate directly through our real-time chat system todiscuss terms, schedules meetings, and negotiate deals."
      },
      {
        question: "Do I have to accept every investment offer?",
        answer: "No, you're always in control. You can chat with multiple investors, compare offers, and choose the one that best aligns with your vision and goals."
      }
    ],
    investors: [
      {
        question: "How do I find relevant pitches?",
        answer: "Use our advanced filters on the Explore Ideas page. Filter by category (Technology, Healthcare, etc.), funding stage (Idea, MVP, etc.), and funding amount. You can also search by keywords to find specific solutions."
      },
      {
        question: "Can I contact innovators directly?",
        answer: "Yes! As an investor, you can initiate chats with any innovator whose pitch interests you. Click 'Start Chat' on their pitch page to begin a conversation."
      },
      {
        question: "What is the shortlist feature?",
        answer: "Shortlisting allows you to save interesting pitches for later review. All your shortlisted ideas are accessible from your dashboard, and you can add notes to track your thoughts."
      },
      {
        question: "Are all ideas verified?",
        answer: "Yes, every pitch goes through a review process by our team. We verify that the pitch contains sufficient information and meets our quality standards before making it visible to investors."
      },
      {
        question: "How do I close a deal on E-Shark?",
        answer: "E-Shark facilitates the connection and initial discussions. Once you and the innovator agree on terms, you can proceed with legal documentation and fund transfer offline. We recommend involving legal and financial advisors for formal agreements."
      }
    ],
    technical: [
      {
        question: "What browsers are supported?",
        answer: "E-Shark works best on modern browsers like Chrome, Firefox, Safari, and Edge. We recommend using the latest version for the best experience."
      },
      {
        question: "Is there a mobile app?",
        answer: "Currently, E-Shark is a web application optimized for mobile browsers. A dedicated mobile app is in our roadmap for future development."
      },
      {
        question: "How does real-time chat work?",
        answer: "Our chat uses Socket.IO technology for instant message delivery. As long as you're connected to the internet, messages appear in real-time without page refreshes."
      },
      {
        question: "Can I upload files in my pitch?",
        answer: "File upload functionality for images and documents is being implemented. Currently, you can add detailed text descriptions of your pitch."
      }
    ]
  };

  const FAQSection = ({ title, questions, startIndex }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="space-y-4">
        {questions.map((faq, index) => {
          const globalIndex = startIndex + index;
          const isOpen = openIndex === globalIndex;

          return (
            <div key={globalIndex} className="card">
              <button
                onClick={() => toggleFAQ(globalIndex)}
                className="w-full flex items-center justify-between text-left"
              >
                <h3 className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                {isOpen ? (
                  <FaChevronUp className="text-primary-500 flex-shrink-0" />
                ) : (
                  <FaChevronDown className="text-gray-400 flex-shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="mt-4 pt-4 border-t border-gray-200 animate-slide-up">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600">
            Everything you need to know about E-Shark
          </p>
        </div>

        {/* FAQ Sections */}
        <FAQSection 
          title="General Questions" 
          questions={faqs.general}
          startIndex={0}
        />
        
        <FAQSection 
          title="For Innovators" 
          questions={faqs.innovators}
          startIndex={faqs.general.length}
        />
        
        <FAQSection 
          title="For Investors" 
          questions={faqs.investors}
          startIndex={faqs.general.length + faqs.innovators.length}
        />
        
        <FAQSection 
          title="Technical Questions" 
          questions={faqs.technical}
          startIndex={faqs.general.length + faqs.innovators.length + faqs.investors.length}
        />

        {/* Still have questions? */}
        <div className="card bg-gradient-to-r from-primary-500 to-blue-600 text-white text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-blue-100 mb-6">
            We're here to help! Reach out to our support team.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
