import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header({ searchText, setSearchText }) {
  const navigation = useNavigate();
  const [user, setUser] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const u = localStorage.getItem('user');
    setUser(u);
  }, []);

  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const recognitionInstance = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognitionInstance.continuous = true; // Set continuous to true for ongoing recognition
      recognitionInstance.interimResults = true; // Set interimResults to true for intermediate results

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript; // Get the latest result
        setSearchText(transcript);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [setSearchText]);

  const handleLogout = () => {
    localStorage.clear();
    navigation('/login');
  };

  const startSpeechToText = (e) => {
    e.preventDefault();

    if (recognition) {
      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser. Please use a modern browser.');
    }
  };

  const stopSpeechToText = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          TODO APP
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor03"
          aria-controls="navbarColor03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
                <span className="visually-hidden">(current)</span>
              </Link>
            </li>

            {user ? (
              <li className="nav-item">
                <a className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }} href="#">
                  LogOut
                </a>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
          {user && (
            <form className="d-flex">
              <input
                className="form-control me-sm-2"
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search"
              />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
              </button>

              <button
        className="btn btn-secondary my-2 my-sm-0"
        style={{ cursor: 'pointer' }}
        onClick={isListening ? stopSpeechToText : startSpeechToText}
      >
        {isListening ? <svg fill="#000000" width="16" height="16" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.5,3.73a2,2,0,0,1,2.95-.14A2,2,0,0,1,14,5V8.41a1,1,0,0,0,2,0V5A4,4,0,0,0,9,2.47,1,1,0,1,0,10.5,3.73Zm8.22,9.54.2,0a1,1,0,0,0,1-.81A7.91,7.91,0,0,0,20,11a1,1,0,0,0-2,0,5.54,5.54,0,0,1-.11,1.1A1,1,0,0,0,18.72,13.27Zm3,6.06-18-18a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L8,8.48V11a4,4,0,0,0,6,3.46l1.46,1.46A6,6,0,0,1,6,11a1,1,0,0,0-2,0,8,8,0,0,0,7,7.93V21H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2H13V18.93a7.87,7.87,0,0,0,3.85-1.59l3.4,3.4a1,1,0,0,0,1.42-1.41ZM12,13a2,2,0,0,1-2-2v-.52l2.45,2.46A1.74,1.74,0,0,1,12,13Z"/>
</svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16">
  <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5"/>
  <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3"/>
</svg>
}
      </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
