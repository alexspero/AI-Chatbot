import logo from './logo.svg';
import './App.css';
import { ChatCompletionStream } from 'openai/lib/ChatCompletionStream';
// import { ChatCompletionStream } from 'openai/lib/ChatCompletionStream.mjs';

let myFirstVar = "nothing yet :(";
let mySecondVar = "nothing yet :(";

const requestData = {
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'Say this is a test!' }],
  temperature: '0.7',
};

async function testAPI1() {
  try {
    const response = await fetch('http://localhost:3001/openai-api-1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    const data = response.json();
    const content = data;
    myFirstVar += " this was the response: " + content;
    console.log("hello1");
    console.log(content);
  }
  catch (error) {
    myFirstVar += " this was the response: " + error;
    console.log("hello2");
    console.log(error);
  }
}

async function testAPI2() {
  try {
    const response = await fetch('http://localhost:3001/openai-api-2', {
      method: 'POST',
      body: 'Tell me why dogs are better than cats',
      headers: { 'Content-Type': 'text/plain' },
    });
    const runner = ChatCompletionStream.fromReadableStream(response.body);
    runner.on('content', (delta, snapshot) => {
      process.stdout.write(delta);
      mySecondVar += delta;
      console.log(mySecondVar);
    });

    console.dir(await runner.finalChatCompletion(), { depth: null });
  }
  catch (error) {
    console.log("hello2");
    console.log(error);
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>
          <button onClick={testAPI1}>Run Function 1</button>
          {myFirstVar}
        </p>
        <p>
          Some space
        </p>
        <p>
          <button onClick={testAPI2}>Run Function 2</button>
          {mySecondVar}
        </p>
      </header>
    </div>
  );
}

export default App;
