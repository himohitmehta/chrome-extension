import { useEffect, useRef, useState } from "react"

import DownloadIcon from "~components/icons/download"
import RegenerateIcon from "~components/icons/regenerate"
import SendIcon from "~components/icons/send"

const UserInputModal = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState([])

  const handleGenerateMessageButton = (e) => {
    e.preventDefault()
    setMessages([{ isUser: true, text: prompt }])
    setTimeout(() => {
      setMessages((prev) => {
        return [
          ...prev,
          {
            isUser: false,
            text: "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
          }
        ]
      })
    }, 1500)
    setPrompt("")
  }

  const handleInsertTextButton = () => {
    let inputField = document.querySelector(".msg-form__contenteditable")
    let pTag = inputField.querySelector("p")
    const placeholder = document.getElementsByClassName("msg-form__placeholder")
    const submitButton = document.getElementsByClassName(
      "msg-form__send-button"
    )
    if (placeholder.length > 0) {
      placeholder[0].remove()
    }
    if (submitButton.length > 0) {
      submitButton[0].removeAttribute("disabled")
    }

    let newText = messages[messages.length - 1].text
    pTag.textContent = newText
    onClose()
    setMessages([])
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed flex items-center justify-center w-screen h-screen overflow-hidden bg-gray-800/50"
          onClick={onClose}>
          <div
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
            className="overflow-hidden h-max w-1/3 bg-[#F9FAFB] opacity-100 p-6 rounded-lg">
            <div className="w-full mb-6 space-y-6">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`w-full flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] rounded-lg p-4 ${message.isUser ? "bg-gray-200" : "bg-blue-100"}`}>
                    <p className="text-2xl text-gray-500">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleGenerateMessageButton} className="space-y-6">
              <input
                type="text"
                placeholder="Your prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full px-4 py-1 text-2xl font-semibold text-gray-600 border border-gray-200 rounded-lg min-h-16 focus:outline-none focus:ring-1 focus:border-2 focus:border-gray-300"
              />
              <div className="flex items-center justify-end gap-6">
                {messages.length > 0 ? (
                  <>
                    <button
                      type="button"
                      onClick={handleInsertTextButton}
                      className="flex items-center gap-2 px-6 py-3 text-white border-2 border-gray-500 rounded-lg">
                      <DownloadIcon
                      // size={16}
                      // strokeWidth={1}
                      // className="w-6 h-6 text-gray-500"
                      />
                      <span className="text-2xl font-semibold text-gray-500">
                        Insert
                      </span>
                    </button>
                    <button
                      disabled
                      className="flex items-center gap-2 px-6 py-3 text-white bg-blue-500 rounded-lg">
                      <RegenerateIcon
                      // size={16}
                      // strokeWidth={1}
                      // className="w-6 h-6"
                      />
                      <span className="text-2xl font-semibold">Regenerate</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 text-white bg-blue-500 rounded-lg">
                    <SendIcon
                    // size={16}
                    //  strokeWidth={1}
                    //  className="w-6 h-6"
                    />
                    <span className="text-2xl font-semibold">Generate</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
export default UserInputModal
