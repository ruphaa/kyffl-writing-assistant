import React, {useState} from 'react';
import Writing from './components/Writing'
import Hygiene from './components/HygieneCheck'
import Title from './components/Title'
import SearchPhotos from './components/SearchPhotos';
import { ContentContext } from './context/Content'

function App() {
  const initialContent = localStorage.getItem('content') || 'Hello World'
  const [content, setContent] = useState(initialContent)

  const switchTheme = () => {
    const body = document.querySelector("body");
    let currentTheme = body.dataset.theme;
    if (currentTheme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  const setTheme = (theme) => {
    const body = document.querySelector("body");
    localStorage.setItem("theme", theme);
    body.dataset.theme = theme;
  };

  const setGoal = () => {
    console.log("Let's set a goal")
  }

  return (
     <ContentContext.Provider value={{ content, setContent }}>
      <section class="main">
        <header>
          <div className="brand">The Writing Assistant</div>
          <div className="menu">
            <button className="theme-toggle" id="dark-mode" onClick={switchTheme}></button>
            <button className="set-goal" onClick={setGoal}>Set goal</button>
          </div>
        </header>
        <div className="container">
          <Title />
          <div className="blog-container">
            <div className="writing">
              {/* <SearchPhotos /> */}
              <Writing />
            </div>
            <div className="hygiene">
              <Hygiene />
            </div>
          </div>
        </div>
      </section>
    </ContentContext.Provider>
  );
}

export default App;
