import { useState } from "react";
import styled from "styled-components";
// import { getAnswerFromOpenAI, getRooms } from "../_lib/data-service";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { getRooms } from "../../services/apiRooms";
import { getAnswerFromOpenAI } from "../../services/apiChatbot";

const ChatbotContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 50;
  transition: all 0.3s ease-in-out;
  border: 1px solid var(--color-grey-300);
  border-radius: 8px;
  background-color: var(--color-grey-0);
  color: var(--color-grey-900);
  /* overflow: scroll; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${({ expanded }) => (expanded ? "42rem" : "24rem")};
  height: ${({ expanded }) => (expanded ? "46rem" : "4.6rem")};
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 3rem;
  color: var(--color-grey-900);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  &:hover {
    color: var(--color-blue-700);
  }
`;

const ChatHistory = styled.div`
  flex: 1;
  padding: 1.4rem 1.2rem;
  overflow-y: auto;
  margin-top: 3rem;
`;

const ChatBubble = styled.div`
  margin-bottom: 1rem;
  text-align: ${({ sender }) => (sender === "user" ? "right" : "left")};

  p {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 1.5rem;
    max-width: 34rem;
    text-align: left;
    background-color: ${({ sender }) =>
      sender === "user" ? "var(--color-blue-700)" : "var(--color-grey-100)"};
    color: ${({ sender }) =>
      sender === "user" ? "var(--color-grey-0)" : "var(--color-grey-900)"};
    transition: background 0.3s ease-in-out;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const InputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid var(--color-grey-50);
  display: flex;
  position: relative;
  bottom: 0;
  width: 100%;
`;

const TextInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
  border-radius: 8px;
  outline: none;
  color: var(--color-grey-900);

  &:focus {
    border-color: var(--color-blue-700);
  }
`;

const SendButton = styled.button`
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-grey-900);
  color: var(--color-grey-50);
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: var(--color-blue-700);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function Chatbot() {
  const [question, setQuestion] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { sender: "user", message: question },
    ]);

    try {
      const roomsData = await getRooms();
      if (roomsData) {
        const answer = await getAnswerFromOpenAI(roomsData, question);
        const formattedAnswer = formatAnswer(answer);
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { sender: "bot", message: formattedAnswer },
        ]);
      } else {
        setChatHistory((prevHistory) => [
          ...prevHistory,
          { sender: "bot", message: "Không tìm thấy thông tin về phòng." },
        ]);
      }
    } catch (error) {
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: "bot", message: "Có lỗi xảy ra. Vui lòng thử lại sau." },
      ]);
    }

    setLoading(false);
    setQuestion("");
  };

  const formatAnswer = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      .replace(/\n/g, "<br />");
  };

  return (
    <ChatbotContainer expanded={expanded}>
      <ToggleButton onClick={() => setExpanded(!expanded)}>
        {expanded ? (
          "−"
        ) : (
          <>
            <HiQuestionMarkCircle size={24} /> Hỏi đáp với Chatbot
          </>
        )}
      </ToggleButton>

      {expanded && (
        <>
          <ChatHistory>
            {chatHistory.map((chat, index) => (
              <ChatBubble key={index} sender={chat.sender}>
                <p dangerouslySetInnerHTML={{ __html: chat.message }}></p>
              </ChatBubble>
            ))}
          </ChatHistory>

          <InputContainer>
            <TextInput
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Mời bạn nhập câu hỏi..."
            />
            <SendButton onClick={handleAskQuestion} disabled={loading}>
              {loading ? "Đang trả lời..." : "Hỏi"}
            </SendButton>
          </InputContainer>
        </>
      )}
    </ChatbotContainer>
  );
}
