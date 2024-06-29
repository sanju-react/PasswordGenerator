import React, { useState, useCallback, useEffect, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!#$%&'()*+,-./:;<=>?@[]^_{|}~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-indigo-400 p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">Password Generator</h1>
        <div className="flex items-center shadow-inner rounded-lg overflow-hidden mb-4 border-2 border-indigo-600">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-4 text-gray-700"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-indigo-600 text-white px-4 py-2 hover:bg-indigo-700 focus:outline-none"
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-x-4">
            <label className="text-gray-700 font-medium">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer flex-grow"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center gap-x-4">
            <input
              type="checkbox"
              checked={numberAllowed}
              id="numberInput"
              className="cursor-pointer"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput" className="text-gray-700 font-medium">
              Include Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-4">
            <input
              type="checkbox"
              checked={charAllowed}
              id="characterInput"
              className="cursor-pointer"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput" className="text-gray-700 font-medium">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
