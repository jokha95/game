import { connect } from "react-redux";
import { setName } from "./redux-app/actions";
import AppPresenter from "./Apply";
function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return {
    addName: (name) => {
      m;
      dispatch(setName(name));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppPresenter);
