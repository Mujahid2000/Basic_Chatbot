import axios from "axios";
import { useState } from "react";
import pdfToText from "react-pdftotext";

const App = () => {
  const [message, setMessage] = useState("");
  const [aiData, setAiData] = useState([]);
  const [pdfData, setPdfData] = useState("");
  const [loading, setLoading] = useState(false)

  function handleFileUpload(event) {
    const file = event.target.files[0];
    pdfToText(file)
      .then((text) => setPdfData(text))
      .catch((error) =>
        console.error("Failed to extract text from pdf", error)
      );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAmPj2HF7F15plPv6OTk2ak37ZtCkMNtK0",
      method: "POST",
      data: {
        contents: [{ parts: [{ text: `${message || pdfData}` }] }],
      },
    }).catch((error) => {
      console.error("Error in API request:", error);
    });

    if (response && response.data) {
      // Check if response is valid
      setAiData([response.data.candidates[0].content.parts[0].text]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center ">
      <div
        style={{
          boxShadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)",
        }}
        className="  mx-auto bg-white p-6 rounded-lg border border-[#e5e7eb] w-[440px] h-[634px]"
      >
        <div className="flex flex-col space-y-1.5 pb-6">
          <h2 className="font-semibold text-lg tracking-tight">Chatbot</h2>
          <p className="text-sm text-[#6b7280] leading-3">
            Powered by Mendable and Vercel
          </p>
        </div>

        <div className="pr-4 h-[474px] overflow-auto">
          <div className="flex gap-3 my-4 text-gray-600 text-sm flex-1">
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
              <div className="rounded-full bg-gray-100 border p-1">
                <svg
                  stroke="none"
                  fill="black"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
              </div>
            </span>
            <p className="leading-relaxed">
              <span className="block font-bold text-gray-700"></span>
              {loading? 'Generating': aiData}
            </p>
          </div>
        </div>

        <div className="flex items-center pt-0">
          <form
            onSubmit={handleSubmit}
            className="flex items-center justify-center w-full space-x-2"
          >
            <input
              className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 text-gray-800 focus-visible:ring-offset-2"
              placeholder="Type your message"
              value={message || pdfData}
              name="text"
              onChange={(e) => setMessage(e.target.value)}
            />
            <label className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 cursor-pointer">
              <input
                className="hidden"
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </label>
            <button
              className="inline-flex items-center justify-center rounded-md text-sm font-medium text-white disabled:pointer-events-none disabled:opacity-50 bg-black hover:bg-gray-900 h-10 px-4 py-2"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
