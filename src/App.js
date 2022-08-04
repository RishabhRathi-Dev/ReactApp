import logo from './logo.svg';
import './App.css';
import React, { useEffect ,useState } from "react";
import ReactDOM from "react-dom";
import qs from 'qs';
import { createBrowserHistory } from "history";

// Keeping tab on changes in color and applyin it to future generation

// Rosy
// bubble : #D98CDE
// Background : #CB6767

function App() {

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [isThemes, setIsThemes] = useState(false);

  const [isStartingMessageDone, setStartingMessageDone] = useState(false);

  var Messages = [];

  var msgText = "";

  function SaveSetting(Backgroud, Bubble) {
    localStorage.setItem("Bg", Backgroud)
    localStorage.setItem("bb", Bubble)
  }

  function GetBg() {
    return localStorage.getItem("Bg");
  }

  function Getbb() {
    return localStorage.getItem("bb");
  }

  function AddUserMessage(text) {
    var msgbox = document.getElementById('messageBox');
    var Bubble = document.createElement("div")
    Bubble.classList.add("UserBubble")

    var Message = document.createElement("p")
    Message.classList.add("UserMessage")
    Message.innerText = text

    var holder = document.createElement("div")
    holder.classList.add("UserMessageHolder")

    console.log(Message[Messages.length - 1])
    console.log(msgText)

    var OtherMessage = document.getElementsByClassName("UserBubble")

    for (let index = 0; index < OtherMessage.length; index++) {
      const element = OtherMessage[index];
      element.classList.remove("UserBubble")
      element.classList.add("UserBubble-Normal")
      
    }

    Bubble.appendChild(Message)
    holder.appendChild(Bubble)
    msgbox.appendChild(holder)
    
    document.getElementById("MessageInputBox").value = ""

  };

  function AddReplyMessage(msg) {
    var msgbox = document.getElementById('messageBox');
    var Bubble = document.createElement("div")
    Bubble.classList.add("BotBubble")

    var Message = document.createElement("p")
    Message.classList.add("BotMessage")
    Message.innerText = msg

    var holder = document.createElement("div")
    holder.classList.add("BotMessageHolder")

    console.log(Message[Messages.length - 1])
    console.log(msgText)

    var OtherMessage = document.getElementsByClassName("BotBubble")
    
    for (let index = 0; index < OtherMessage.length; index++) {
      const element = OtherMessage[index];
      element.classList.remove("BotBubble")
      element.classList.add("BotBubble-Normal")
      
    }

    Bubble.appendChild(Message)
    holder.appendChild(Bubble)
    msgbox.appendChild(holder)

  };

  function ApplyTheme(Backgroud, Bubble) {

    console.log(Backgroud)

    console.log(Bubble)

    document.body.style.background = Backgroud;

    document.body.style.setProperty('--Bubble', Bubble);
    document.body.style.setProperty('--Background', Backgroud);

    SaveSetting(Backgroud, Bubble)

  };

  function LastTheme() {
    ApplyTheme(GetBg(), Getbb())
  }

  useEffect(() => {
    ApplyTheme(GetBg(), Getbb())
  })

  function InferInputs() {
    var a = document.getElementById("CustomGradiantColor1").value
    var b = document.getElementById("CustomGradiantColor2").value

    ApplyTheme(a, b)
  }

  const LoginButtonClicked = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  }

  const ThemesOpened = (event) => {
    event.preventDefault();
    if (!isThemes){
      setIsThemes(true)
    } else {
      setIsThemes(false)
    }
  }

  const MessageTextUpdate = (event) => {
    msgText = event.target.value;
  }

  const MessageEntered = (event) => {
    event.preventDefault();
    Messages.push(msgText);
    AddUserMessage(Messages[Messages.length - 1]);
  }

  const StartingMessages = (event) => {

    document.getElementById("StartingInstruction").remove();

    if (!isStartingMessageDone){
      AddReplyMessage("Hi there!👋")
      AddReplyMessage("I'm Wysa - an AI chatbot built by therepists.")
      AddReplyMessage("I'm here to understand your concerns and connect you with the best resources available to support you.")
      AddReplyMessage("Can I help?")
      setStartingMessageDone(true)
    }
  }

  const loginPage = (
    <div className="form">
      <form onSubmit={LoginButtonClicked}>
        <div className="InputField">
          <label className='UsernameLabel'>Username :</label>
          <input type="text" name="username" required />
          
        </div>
        <div className="InputField">
          <label className='PasswordLabel'>Password  :</label>
          <input type="password" name="pswrd" required />
          
        </div>
        <div className="LoginButtonField">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  const themesSection = (
    <div className='ThemesOptions'>
      
      <div id='predefined'>
        <input type={"button"} value={"Dark"} onClick={() => ApplyTheme("#192734", "White")}></input>
        <input type={"button"} value={"Rosy"} onClick={() => ApplyTheme("#CB6767", "#D98CDE")}></input>
        <input type={"button"} value={"Default"} onClick={() => ApplyTheme("linear-gradient(239.26deg, #DDEEED 63.17%, #FDF1E0 94.92%)", "#fff")}></input>
        
      </div>

      <div className='Custom' id='custom'>
        <div className='CustomColor1'>
          <label className='CustomLabel' htmlFor='CustomGradiantColor1'>Backgroud</label>
          <input type={"color"} id="CustomGradiantColor1"></input>
        </div>

        <div className='CustomColor2'>
          <label className='CustomLabel' htmlFor="CustomGradiantColor2">Bubble</label>
          <input type={"color"} id="CustomGradiantColor2"></input>
        </div>

        <div className='SetButton'>
          <input type={'button'} id="CustomThemeSetButton" value={"Set"} onClick={() => InferInputs()}></input>
        </div>


      </div>
    </div>
  );

  const chatSection = (
    <div className='TopLevelChatSection' onClick={StartingMessages}>
      <div className='ThemeSettingSection'>
        <form>
          <input type={'button'} onClick={ThemesOpened} name="themes" value={"Themes"}></input>
        </form>

        <div className='ThemesSection'>
          {isThemes ? themesSection : <p></p>}
        </div>
      </div>

      <div className='MessageSection'>
        <div id='messageBox'></div>
          <p id="StartingInstruction">Click to Begin!</p>
        <div className='MessageEnterSection'>
          <form className='MessageEnterForm'>
            <div className="MessageInput">
              <input type={'text'}  id="MessageInputBox" name="MessageEntry" placeholder='Type your message here...' onChange={MessageTextUpdate} required></input>
            </div>
            <div className="MessageSendButton">
              <input type={'button'}  onClick={MessageEntered} id="MessageSendButton" value={"Send"}></input>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="App">

      {isSubmitted ? chatSection : loginPage}

    </div>
  );
}

export default App;
