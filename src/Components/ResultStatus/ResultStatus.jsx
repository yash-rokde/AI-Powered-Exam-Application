import "./ResultStatus.css";
import reward from "../../assets/reward.png";
import sad from "../../assets/sad.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router";

const ResultStatus = () => {
  let location = useLocation();
  const { score } = location.state;
  const { questions } = location.state;
  const { selectedOptions } = location.state;

  const navigate = useNavigate();

  const [pass, setPass] = useState(false);
  const [fail, setFail] = useState(false);
  const [goHome, setGoHome] = useState(false);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    if (score >= 5) {
      setPass(true);
    } else {
      setFail(true);
    }
  }, [score]);

  const handleGoHome = () => {
    setGoHome(true);
  };

  const handleResponseChange = () => {
    setResponse(true);
  };

  return (
    <>
      <div className="result-layout">
        <div className="result-container">
          <div className="result-header-img">
            <div className="img-circle">
              {pass ? (
                <img src={reward} alt="" width={90} />
              ) : (
                <img src={sad} alt="" width={90} />
              )}
            </div>
          </div>

          <div className="result-status">
            {pass ? (
              <>
                <h2 style={{ color: "gold" }}>CONGRATULATIONS!</h2>
                <p style={{ color: "white" }}>
                  You have successfully cleared the exam.
                </p>
              </>
            ) : (
              <>
                <h2 style={{ color: "gold" }}>Better Luck Next Time!</h2>
                <p style={{ color: "white" }}>
                  You have not successfully cleared the exam.
                </p>
              </>
            )}

            <h4 style={{ color: "white" }}>Your Score: {score}/10</h4>

            <div className="two-btn">
              <Button variant="light" onClick={handleResponseChange}>
                View Response
              </Button>
              <Button variant="success" onClick={setGoHome}>
                Return Home
              </Button>
            </div>

            {goHome && navigate("/", { replace: true })}

            {response &&
              navigate(
                "/response",

                { state: { questions, selectedOptions, score }, replace: true }
              )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ResultStatus;
