import { Quicksand } from 'next/font/google'
import {CreateCompletionRequest} from "openai";
import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const quicksand = Quicksand({ subsets: ['latin'] })

interface ChatCompletionRequest extends CreateCompletionRequest {
  messages: {
    role: string;
    content: string;
  }[];
}

type MessageObjectType = {
  message: string;
  direction?: "incoming" | "outgoing";
  sender: "ChatGPT" | "user";
}

const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "Act like a pirate for the entire duration of our conversation",
};

const App = () => {
  const [messages, setMessages] = useState<MessageObjectType[]>([
    {
      message: "Hello, I'm ChatGPT! Ask me anything!",
      direction: "incoming",
      sender: "ChatGPT",
      // sentTime: "just now",
    },
  ]);
  const [systemMsg, setSystemMsg] = useState<{role: 'system', content: string}>({
    //  Explain things like you're talking to a software professional with 5 years of experience.
    role: "system",
    content:
      "Act like a pirate for the entire duration of our conversation",
  })
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message: string) => {
    const newMessage: MessageObjectType = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages: MessageObjectType[]) {
    // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    const apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act.
    const apiRequestBody: ChatCompletionRequest = {
      model: "gpt-3.5-turbo",
      messages: [
        systemMsg, // The system message DEFINES the logic of our chatGPT
        ...apiMessages, // The messages from our chat with ChatGPT
      ],
    };

    // await fetch("https://api.openai.com/v1/chat/completions", {
    //   method: "POST",
    //   headers: {
    //     Authorization: "Bearer " + API_KEY,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(apiRequestBody),
    // })

    await fetch("/api/chat", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data: Response) => {
        return data.json();
      })
      .then((data) => {
        console.log(data)
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content as string,
            sender: "ChatGPT",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <div className="w-screen h-screen p-[40px]">
      <div className="relative h-full w-full">
        <button type="button" onClick={()=>setSystemMsg({role: 'system', content: "talk like a teacher"})}>Change prompt</button>
        <MainContainer className="pt-[20px] rounded-md" >
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                isTyping ? (
                  <TypingIndicator content="ChatGPT is typing" />
                ) : null
              }
            >
              {messages.map((message, i) => {
                return <Message key={i} model={message} className={`${quicksand.className}`}/>;
              })}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}

export default App;
