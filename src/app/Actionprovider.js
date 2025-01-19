import OpenAI from 'openai';
const openai = new OpenAI(
    {
        apiKey: '28c84476ed224b66b81427ebc99e0689',
        baseURL: 'https://api.aimlapi.com',
        dangerouslyAllowBrowser:true
    }
);

class ActionProvider {
    constructor(
        createChatBotMessage,
        setStateFunc,
        createClientMessage,
        stateRef,
        createCustomMessage,
        ...rest
    ){
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
        this.stateRef = stateRef;
        this.createCustomMessage = createCustomMessage;
    }
    callGenAI=async (prompt)=>{
        const chatCompletion = await openai.chat.completions.create({
            model:'gpt-3.5-turbo',
            messages:[
                {
                    role:'system',
                    content:'You are a helpful assistant.'
                },
                {
                    role:'user',
                    content:prompt
                }
            ],
            temperature:0.7,
            max_tokens:50
        });
        return chatCompletion.choices[0].message.content;
    }

    timer = ms => new Promise(res => setTimeout(res, ms));
    generateResponseMessage= async (userMessage) => {
        const responseFromGPT = await this.callGenAI(userMessage);
        let message;
        let numberOfLines= responseFromGPT.split('\n').length;

        for (let i=0;i<numberOfLines;i++){
            const msg=responseFromGPT.split('\n')[i];
            if(msg.length){
                message =this.createChatBotMessage(msg);
                this.updateChatBotMessage(message);
            }
            await this.timer(1000);
        }
    }
    respond = (message) => {
        this.generateResponseMessage(message);
    }

    updateChatBotMessage=(message)=>{
        this.setState(prevState => ({
            ...prevState,messages:[...prevState.messages,message]
        }))
        
    }
}

export default ActionProvider;