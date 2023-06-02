import { Route } from "react-router-dom/cjs/react-router-dom.min";
import SpellCheck from "./spellcheck/SpellCheck"


function App() {


  return (
    <>
      <Route path="/" component={SpellCheck} exact={true} />
    </>
  );
}

export default App;