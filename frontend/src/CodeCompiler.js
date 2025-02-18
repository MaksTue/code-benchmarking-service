import { useState } from "react";
import axios from "axios";

export default function CodeCompiler() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const handleRunCode = async () => {
    try {
      const response = await axios.post("http://localhost:3001/run", { code });
      setOutput(response.data.output || response.data.error);
    } catch (error) {
      setOutput("Error executing code");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Online C++ Compiler</h1>
      <textarea
        className="w-full p-2 border rounded mt-2"
        rows="10"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your C++ code here..."
      />
      <button
        className="mt-2 p-2 bg-blue-500 text-white rounded"
        onClick={handleRunCode}
      >
        Run Code
      </button>
      <pre className="mt-4 p-2 border rounded bg-gray-100">{output}</pre>
    </div>
  );
}
