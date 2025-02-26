import "./ExamResponse.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "react-bootstrap";
const ExamResponse = () => {
  let location = useLocation();

  const { questions } = location.state;
  const { selectedOptions } = location.state;
  const { score } = location.state;
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [goHome, setGoHome] = useState(false);

  // console.log(questions);
  // console.log(selectedOptions);

  const handleGoHome = () => {
    setGoHome(true);
  };

  //
  // [{}, {}, {}];

  return (
    <>
      <div className="ex-response-layout">
        <h2 style={{ textAlign: "center" }} className="my-2">
          Your Score: {score}
        </h2>
        {questions.map((element) => (
          <div className="ex-response-container">
            <div className="res-que-container">{element.question}</div>
            <div className="res-ans-container">
              <li
                className={`${
                  element.option1 === element.answer
                    ? "correct-view"
                    : "normal-view"
                }
                  ${
                    element.answer !== selectedOptions[element.sr_no] &&
                    element.option1 === selectedOptions[element.sr_no]
                      ? "wrong-view"
                      : ""
                  }`}
              >
                <span>{element.option1}</span>
              </li>
              <li
                className={`${
                  element.option2 === element.answer
                    ? "correct-view"
                    : "normal-view"
                }
                  ${
                    element.answer !== selectedOptions[element.sr_no] &&
                    element.option2 === selectedOptions[element.sr_no]
                      ? "wrong-view"
                      : ""
                  }`}
              >
                <span>{element.option2}</span>
              </li>
              <li
                className={`${
                  element.option3 === element.answer
                    ? "correct-view"
                    : "normal-view"
                }
                  ${
                    element.answer !== selectedOptions[element.sr_no] &&
                    element.option3 === selectedOptions[element.sr_no]
                      ? "wrong-view"
                      : ""
                  }`}
              >
                <span>{element.option3}</span>
              </li>
              <li
                className={`${
                  element.option4 === element.answer
                    ? "correct-view"
                    : "normal-view"
                }
                  ${
                    element.answer !== selectedOptions[element.sr_no] &&
                    element.option4 === selectedOptions[element.sr_no]
                      ? "wrong-view"
                      : ""
                  }`}
              >
                <span>{element.option4}</span>
              </li>
            </div>
          </div>
        ))}

        <div className="w-100 d-flex justify-content-center py-4">
          <Button variant="success" onClick={handleGoHome}>
            Return Home
          </Button>
        </div>
      </div>

      {goHome && navigate("/", { replace: true })}
    </>
  );
};
export default ExamResponse;
