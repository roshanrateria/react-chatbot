import { createChatBotMessage }  from "react-chatbot-kit";
const config = {
    botName: "Test Bot",
    initialMessages:[
        createChatBotMessage("Hello, I am a chatbot")
    ]
};
export default config;