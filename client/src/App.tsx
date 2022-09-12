import { CriteriaChecklist } from "./modules/CriteriaChecklist";
import { DeveloperNamesForm } from "./modules/DeveloperNamesForm";

function App() {
  // TODO
  // add code when upload file button is clicked
  // create function inside utils to read file and extrapolate team's names
  // const onUploadClick = () => {};

  // TODO
  // add code when generate rosters button is clicked
  // PSEUDO CODE
  // considering the simplest scenario of having 10 engineers in total, each has to do 2 shifts within each 2-week period
  // STEP 1
  // divide 10 engineers in 2 teams (5 and 5)
  // solution 1: assign first half to morning shifts and the other to afternoon shifts for each week

  // const onRosterClick = () => {};

  return (
    <>
      <div className="bg-lightYellow">
        <header className="text-center mt-8 text-3xl font-semibold text-lightPurple ">
          Welcome to Support Wheel of Fate!
        </header>
        <div className="flex justify-center pb-8">
          <CriteriaChecklist />
        </div>
        <div className="text-center text-lg font-semibold">
          Manually add your developer team or upload a file below:
        </div>
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="flex justify-around items-center gap-16 mx-12 mt-4">
            <DeveloperNamesForm />
            <span> OR</span>
            <button className="transition-colors duration-150 bg-purple rounded-md cursor-pointer focus:shadow-outline  hover:bg-lightPurple text-center px-2 border border-purple">
              Upload File
            </button>
          </div>
          <button className="transition-colors duration-150 bg-purple rounded-md cursor-pointer focus:shadow-outline  hover:bg-lightPurple text-center px-2 border border-purple">
            Generate Rosters
          </button>
        </div>
      </div>
    </>
  );
}
export default App;
