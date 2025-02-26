import ExamResponse from "./Components/ExamResponse/ExamResponse";
import ExamUi from "./Components/ExamUi/ExamUi";
import HomeComponent from "./Components/HomeComponent/HomeComponent";
import Navbar from "./Components/NavbarComponent/NavbarComponent";
import ResultStatus from "./Components/ResultStatus/ResultStatus";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      {/* <Navbar />
      <HomeComponent /> */}
      {/* <ExamUi /> */}
      {/* <ResultStatus /> */}

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HomeComponent />
              </>
            }
          />

          <Route path="/exam" element={<ExamUi />} />
          <Route path="/result" element={<ResultStatus />} />
          <Route path="/response" element={<ExamResponse />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
