import tw from "twin.macro";
import CreditorForm from "./components/Creditor/CreditorForm";

const AppContainer = tw.div`
w-full
max-w-full
flex
flex-col
items-center
justify-center
pt-6
pb-10
pl-10
pr-10`;

function App() {
  return (
    <AppContainer>
      <h1 className="tracking-wide font-serif text-2xl p-2 bg-slate-200 rounded-lg">
        StratFS - Full Stack Test - Jonathan Sanchez
      </h1>
      <CreditorForm />
    </AppContainer>
  );
}

export default App;
