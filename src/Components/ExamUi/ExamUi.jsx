import "./ExamUi.css";
import timerimage from "../../assets/3d-stopwatch.png";
import React, { useEffect, useState } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";

const ExamUi = () => {
  const [time, setTime] = useState(600); // 600 seconds = 10 minutes
  const [loadTest, setLoadTest] = useState(15);
  let navigate = useNavigate();

  const [timerRunning, setTimerRunning] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [progress, setProgress] = useState(10);
  const [index, setIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);

  let location = useLocation();
  const { text } = location.state;

  let questionlist = questions[index];

  // generating ai content

  const generateContent = async () => {
    const genAI = new GoogleGenerativeAI(
      "AIzaSyBDcztJCBdi3TOHjCO70mAswhXdVIDp6xE"
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt =
      text +
      `generate 10 mcq question in javascript json format"+
       {
      sr_no: 1,
      name: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "",
    },
    answer should contain correct option entire text
    `;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    try {
      // Clean up the response text
      const cleanedResponseText = responseText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const jsonData = JSON.parse(cleanedResponseText);
      setQuestions(jsonData);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionlist.sr_no]: option,
    }));

    if (option === questionlist.answer) {
      if (selectedOptions[questionlist.sr_no] !== questionlist.answer) {
        setScore((prevScore) => prevScore + 1);
      }
    } else {
      if (selectedOptions[questionlist.sr_no] === questionlist.answer) {
        setScore((prevScore) => prevScore - 1);
      }
    }
  };

  const handleQuestion = (param) => {
    setIndex(param - 1);
  };

  const handleNext = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
      setProgress(progress + 10);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
      setProgress(progress - 10);
    }
  };

  useEffect(() => {
    generateContent();
  }, []);

  useEffect(() => {
    if (loadTest > 0) {
      const loadTimer = setInterval(() => {
        setLoadTest((prevLoadTest) =>
          prevLoadTest > 0 ? prevLoadTest - 1 : 0
        );
      }, 1000);

      return () => clearInterval(loadTimer); // Cleanup the interval on component unmount
    }
  }, [loadTest]);

  useEffect(() => {
    if (loadTest === 0) {
      setTimerRunning(true);

      if (!timerRunning) {
        return;
      }

      const timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      return () => clearInterval(timer); // Cleanup the interval on component unmount
    }
  }, [loadTest, timerRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  useEffect(() => {
    if (time === 0) {
      handleStopTimer();
      setTestEnded(true);
    }
  }, [time]);

  const handleStopTimer = () => {
    alert("Exam ends....");
    setTimerRunning(false);
    setTestEnded(true);
    // console.log(selectedOptions);
    // document.querySelector(".exam-layout").style.display = "none";
    // document.querySelector(".exam-ends").style.display = "flex";
  };

  // console.log(text);
  return (
    <>
      {loadTest > 0 ? (
        <div className="loading-test">
          <Spinner animation="border" variant="dark" size="lg" />
          <h2>Hang On! Test is Loading...</h2>
        </div>
      ) : (
        <>
          <div className="exam-layout">
            <div className="exam-inner-layout">
              <h2
                style={{
                  textAlign: "center",
                  fontFamily: "Oswald",
                  letterSpacing: 1.5,
                  padding: 10,
                  fontSize: 35,
                }}
              >
                Sample Quiz
              </h2>

              <div className="question-info-container">
                <h5
                  style={{
                    fontFamily: "arial",
                    fontWeight: "bold",
                    padding: 10,
                  }}
                >
                  Question {index + 1}/{questions.length}
                </h5>

                <div className="time-container">
                  <img
                    src={timerimage}
                    alt=""
                    style={{
                      height: 40,
                      width: 44,
                      paddingRight: 5,
                    }}
                  />
                  <div
                    className="time"
                    style={{
                      fontFamily: "verdana",
                      fontWeight: "bold",
                      padding: 5,
                      color: time < 60 ? "red" : "blue",
                    }}
                  >
                    {formatTime(time)} min
                  </div>
                </div>
              </div>
              <ProgressBar animated now={progress} className="progress" />
              <div className="question-text">
                <p
                  style={{
                    fontFamily: "arial",

                    padding: 10,
                  }}
                >
                  {questionlist.question}
                </p>
              </div>

              <div className="options-container">
                <li
                  className={`options ${
                    selectedOptions[questionlist.sr_no] === questionlist.option1
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleOptionSelect(questionlist.option1)}
                >
                  <span className="optionSequence">A</span>
                  {questionlist.option1}
                </li>
                <li
                  className={`options ${
                    selectedOptions[questionlist.sr_no] === questionlist.option2
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleOptionSelect(questionlist.option2)}
                >
                  <span className="optionSequence">B</span>
                  {questionlist.option2}
                </li>

                <li
                  className={`options ${
                    selectedOptions[questionlist.sr_no] === questionlist.option3
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleOptionSelect(questionlist.option3)}
                >
                  <span className="optionSequence">C</span>
                  {questionlist.option3}
                </li>

                <li
                  className={`options ${
                    selectedOptions[questionlist.sr_no] === questionlist.option4
                      ? "selected"
                      : ""
                  }`}
                  onClick={() => handleOptionSelect(questionlist.option4)}
                >
                  <span className="optionSequence">D</span>
                  {questionlist.option4}
                </li>
              </div>

              <div className="control-buttons">
                <div>
                  <Button variant="primary" onClick={handlePrev}>
                    Previous
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    className="mx-2"
                  >
                    Next
                  </Button>
                </div>

                <div className="submit-btn">
                  <Button variant="danger" onClick={handleStopTimer}>
                    End Exam
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {testEnded &&
            navigate("/result", {
              state: { score, questions, selectedOptions },
              replace: true,
            })}
        </>
      )}
    </>
  );
};
export default ExamUi;
