let Country = require("country-state-city").Country;
let State = require("country-state-city").State;

function getSubdivisionCodeWithoutCountry(regionName) {
  const us_states = State.getStatesOfCountry("US");
  const ca_states = State.getStatesOfCountry("CA");
  const merged_state = [...us_states, ...ca_states];
  const state_obj = merged_state.find(
    (s) => s.name.toLowerCase() === regionName.toLowerCase()
  );
  if (state_obj) {
    return state_obj;
  } else {
    return false;
  }

}

module.exports = getSubdivisionCodeWithoutCountry;
