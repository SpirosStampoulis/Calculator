import { CALC } from '../actions/constants';
import helper from '../model/helper';

function _formatOutput({ output, result }) {
  if (helper.isInteger(result)) {
    output = result.toString();
  } else {
    output = helper.pointToComma(result.toFixed(2));
  }

  return output;
}

function _calculate({ history, expression }) {
  return history.reduce(function (a, b) {
    expression = helper.commaToPoint(a);

    return b = eval(eval(expression) + helper.commaToPoint(b));
  });
}

function calc(state = [], action) {
  const history = [...state];
  const { displayValue } = action.data;
  let expression = '';
  let result = 0;
  let output = '';

  switch (action.type) {
    case CALC:
      if (helper.hasValue(history)) {
        if (history.length === 1) {
          expression = helper.commaToPoint(history[0]);
          result = eval(expression);
        } else {
          result = _calculate({ history, expression });
        }

        output = _formatOutput({ output, result });
      } else {
        output = displayValue;
      }

      if (output === 'Infinity' || helper.isNaN(output)) {
        output = '0';
      }

      return output;
  }
  return state;
}

export default calc;
