import { useLocation } from "react-router";

function WithRouter (Child) {
    return function WithRouter (props) {
         const location = useLocation();
         return <Child {...props} location={location} />;
   }
}

export default WithRouter