import { useState } from "react";
import axios from "axios";
import AdminLogin from "./AdminLogin";
import jsPDF from "jspdf";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [adminName, setAdminName] = useState(
    localStorage.getItem("adminName") || ""
  );

  const [form, setForm] = useState({
    subject: "",
    questionText: "",
    difficulty: "",
    marks: "",
  });

  const [paper, setPaper] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addQuestion = async () => {
    if (!token) return alert("Please login first!");

    try {
      await axios.post("http://localhost:5000/questions/add", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Question Added successfully");
      setForm({ subject: "", questionText: "", difficulty: "", marks: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add question");
    }
  };

  const generateQuestion = async () => {
    if (!token) return alert("Please login first!");

    try {
      const res = await axios.get("http://localhost:5000/questions/generate", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPaper(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch questions");
    }
  };

  const deleteQuestion = async (id) => {
    if (!token) return alert("Please login first!");
    if (!window.confirm("Are you sure you want to delete this question?"))
      return;

    try {
      await axios.delete(
        `http://localhost:5000/questions/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Question deleted successfully");
      generateQuestion();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete question");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminName");
    setToken("");
    setAdminName("");
  };

  // ✅ PDF Generation
  const generatePDF = () => {
    if (paper.length === 0) return alert("No questions to export!");

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Question Paper", 105, 15, null, null, "center");

    let y = 25;
    paper.forEach((q, i) => {
      if (y > 280) { // new page
        doc.addPage();
        y = 20;
      }
      doc.setFontSize(12);
      doc.text(
        `${i + 1}. [${q.subject}] ${q.questionText} (${q.marks} marks)`,
        10,
        y
      );
      y += 10;
    });

    doc.save("question_paper.pdf");
  };

  if (!token) {
    return <AdminLogin setToken={setToken} setAdminName={setAdminName} />;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome, {adminName}</h2>
      <button onClick={logout} style={{ marginBottom: 20 }}>
        Logout
      </button>

      <h2>Add Questions</h2>
      <input
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
      />

      <input
        name="questionText"
        placeholder="Question"
        value={form.questionText}
        onChange={handleChange}
      />

      <select
        name="difficulty"
        value={form.difficulty}
        onChange={handleChange}
      >
        <option value="">Select Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <input
        name="marks"
        type="number"
        placeholder="Marks"
        value={form.marks}
        onChange={handleChange}
      />

      <button onClick={addQuestion}>Add Question</button>

      <hr />

      <h2>Generated Questions</h2>
      <button onClick={generateQuestion}>Generate Questions</button>
      <button onClick={generatePDF} style={{ marginLeft: 10 }}>
        Export PDF
      </button>

      <ul>
        {paper.map((q) => (
          <li key={q._id}>
            {q.subject} — {q.questionText} ({q.marks} marks)
            <button
              onClick={() => deleteQuestion(q._id)}
              style={{ marginLeft: 10 }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
