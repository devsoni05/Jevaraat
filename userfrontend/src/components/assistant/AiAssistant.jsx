import { useEffect, useRef, useState } from "react";
import "./AiAssistant.css";

const API_BASE_URL = "https://jevaraat.onrender.com";

function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Tell me what you are looking for, like a ring budget, gold purity, appointment query, or product suggestion.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const chatRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion && selectedFiles.length === 0) {
      return;
    }

    const attachedFiles = [...selectedFiles];
    const attachmentNames = attachedFiles.map((file) => file.name);

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        role: "user",
        text: trimmedQuestion || "Uploaded attachment(s)",
        attachments: attachmentNames,
      },
    ]);
    setQuestion("");
    setSelectedFiles([]);
    setErrorMessage("");
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const inventoryResponse = await fetch(`${API_BASE_URL}/inventory`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      if (!inventoryResponse.ok) {
        throw new Error(
          inventoryResponse.status === 401
            ? "Please sign in to load inventory"
            : "Unable to load inventory",
        );
      }

      const inventory = await inventoryResponse.json();
      const formData = new FormData();

      formData.append("query", trimmedQuestion);
      formData.append("inventory", JSON.stringify(inventory));
      attachedFiles.forEach((file) => {
        formData.append("attachments", file);
      });

      const aiResponse = await fetch(`${API_BASE_URL}/ai/assistant`, {
        method: "POST",
        body: formData,
      });

      const aiData = await aiResponse.json();

      if (!aiResponse.ok) {
        throw new Error(aiData.message || "Unable to get AI response");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          text: aiData.answer || "I could not generate an answer right now.",
        },
      ]);
    } catch (err) {
      setErrorMessage(err.message);
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          text: "Sorry, I could not answer that right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) {
      return;
    }

    setSelectedFiles((currentFiles) => [...currentFiles, ...files].slice(0, 5));
    event.target.value = "";
  };

  const handleRemoveFile = (fileIndex) => {
    setSelectedFiles((currentFiles) =>
      currentFiles.filter((_, index) => index !== fileIndex),
    );
  };

  const formatFileSize = (size) => {
    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${Math.round(size / 1024)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="ai-assistant">
      {isOpen && (
        <div className="ai-assistant-panel shadow-lg">
          <div className="ai-assistant-header">
            <div>
              <p className="ai-assistant-label">JEVARAAT AI</p>
              <h5>Ask your question</h5>
            </div>
            <button
              type="button"
              className="btn-close"
              aria-label="Close AI assistant"
              onClick={() => setIsOpen(false)}
            ></button>
          </div>

          <div className="ai-assistant-body">
            <div className="ai-assistant-chat" ref={chatRef}>
              {messages.map((message, index) => (
                <div
                  className={`ai-assistant-message ai-assistant-message-${message.role}`}
                  key={`${message.role}-${index}`}
                >
                  {message.role === "assistant" && (
                    <i className="fa-solid fa-wand-magic-sparkles"></i>
                  )}
                  <div className="ai-assistant-message-content">
                    <span>{message.text}</span>
                    {message.attachments?.length > 0 && (
                      <div className="ai-assistant-message-files">
                        {message.attachments.map((fileName, fileIndex) => (
                          <span
                            className="ai-assistant-message-file"
                            key={`${fileName}-${fileIndex}`}
                          >
                            <i className="fa-regular fa-file"></i>
                            {fileName}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="ai-assistant-message ai-assistant-message-assistant">
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  <span>Analyzing...</span>
                </div>
              )}

              {errorMessage && (
                <div className="ai-assistant-error">{errorMessage}</div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="ai-assistant-form">
              <div>
                <label className="form-label" htmlFor="aiAssistantQuestion">
                  Describe your question
                </label>
                <textarea
                  id="aiAssistantQuestion"
                  className="form-control"
                  rows="4"
                  value={question}
                  disabled={isLoading}
                  placeholder="Example: Suggest a necklace for a wedding under Rs. 50000"
                  onChange={(event) => setQuestion(event.target.value)}
                ></textarea>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                className="d-none"
                multiple
                accept="image/*,.pdf,.txt,.doc,.docx,.csv,.xls,.xlsx"
                onChange={handleFileChange}
              />
              {selectedFiles.length > 0 && (
                <div className="ai-assistant-selected-files">
                  {selectedFiles.map((file, index) => (
                    <span
                      className="ai-assistant-file-chip"
                      key={`${file.name}-${index}`}
                    >
                      <i className="fa-regular fa-file"></i>
                      <span>
                        {file.name} ({formatFileSize(file.size)})
                      </span>
                      <button
                        type="button"
                        aria-label={`Remove ${file.name}`}
                        onClick={() => handleRemoveFile(index)}
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="ai-assistant-form-actions">
                <button
                  type="button"
                  className="ai-assistant-attach-button"
                  aria-label="Attach files or photos"
                  title="Attach files or photos"
                  disabled={isLoading || selectedFiles.length >= 5}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <i className="fa-solid fa-paperclip"></i>
                </button>
                <button
                  type="submit"
                  className="btn btn-dark flex-grow-1"
                  disabled={isLoading}
                >
                  <i className="fa-solid fa-paper-plane me-2"></i>
                  {isLoading ? "Sending..." : "Send"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <button
        type="button"
        className="ai-assistant-button btn btn-dark shadow"
        aria-expanded={isOpen}
        aria-label="Open AI assistant"
        onClick={() => setIsOpen((current) => !current)}
      >
        <i className="fa-solid fa-robot"></i>
        <span>AI Assistant</span>
      </button>
    </div>
  );
}

export default AiAssistant;
