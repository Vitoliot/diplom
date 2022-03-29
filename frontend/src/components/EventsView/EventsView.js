import React from "react";
import styles from "./EventsView.css";
import { connect } from "react-redux";
import CSSModules from "react-css-modules";
import mapDispatchToProps from "../../store/mapDispatchToProps";
import mapStateToProps from "../../store/mapStateToProps";

const EventsView = ({ errors, successes, onRemoveSuccess, onRemoveError }) => {
  let all = errors.concat(successes);

  console.log(errors)
  function compare(a, b) {
    if (a.created < b.created) {
      return -1;
    }
    if (a.created > b.created) {
      return 1;
    }
    return 0;
  }

  all.sort(compare);

  return (
    <section className="eventsSection" styleName="eventsSection">
      {all.map((e) =>
        e.type === "error" ? (
          <div
            key={e.id}
            className='eventErr'
            styleName='eventErr'
            onClick={() => {
              onRemoveError(e.id);
            }}
          >
            {e.text}
          </div>
        ) : (
          <div
            key={e.id}
            className='eventSuc'
            styleName='eventSuc'
            onClick={() => {
              onRemoveSuccess(e.id);
            }}
          >
            {e.text}
          </div>
        )
      )}
    </section>
  );
};

export default connect(
    mapStateToProps("EventsView"),
    mapDispatchToProps("EventsView"),
)(CSSModules(EventsView, styles, { allowMultiple: true }));
