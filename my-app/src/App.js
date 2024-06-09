import logo from './logo.svg';
import './App.css';

let myFirstVar = "nothing yet :(";

const requestData = {
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content: 'Say this is a test!' }],
  temperature: '0.7',
};

async function testAPI() {
  try {
    const response = await fetch('http://localhost:3001/openai-api', {
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
          <button onClick={testAPI}>Run Function</button>
          {myFirstVar}
        </p>
      </header>
    </div>
  );
}

export default App;
