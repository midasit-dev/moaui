import React from 'react';
const evaluateFormula = (expression: string): string | number => {
  expression = expression.replace(/=/, '').trim();
  const variableRegex = /[a-zA-Z_]\w*/g;
  let variables = [ ...new Set(expression.match(variableRegex)) ];
  let values: any = {};
  variables.forEach(variable => {
    let element = document.getElementById(variable);
    if (element) {
      let absoluteElement = element.querySelector('div');
      let text = absoluteElement ? absoluteElement.innerText.trim() : '';
      let value = parseFloat(text);
      if (isNaN(value)) {
        console.warn(`Invalid number for '${variable}': '${text}'`)
        value = 0; //default Value!
      }
      values[variable] = value;
    } else {
      console.warn(`Element not found for '${variable}'`)
      values[variable] = 0; //default Value!
    }
  });
  for (let variable of variables) {
    expression = expression.replace(new RegExp(`\\b${variable}\\b`, 'g'), values[variable]);
  }
  try {
    let result = eval(expression);
    return result;
  } catch (e) {
    console.error('Error evaluating expression:', e);
    return '';
  }
};
const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div id={`ROW-1`} style={{ display: 'flex' }}>
        <div
          id={`A1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI1`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-2`} style={{ display: 'flex' }}>
        <div
          id={`A2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            11.A 상부슬래브
          </div>
        </div>
        <div
          id={`C2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI2`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '27px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-3`} style={{ display: 'flex' }}>
        <div
          id={`A3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
             11.A.1 상부슬래브 
          </div>
        </div>
        <div
          id={`C3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI3`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-4`} style={{ display: 'flex' }}>
        <div
          id={`A4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            (1)
          </div>
        </div>
        <div
          id={`C4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            휨 검토
          </div>
        </div>
        <div
          id={`E4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI4`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-5`} style={{ display: 'flex' }}>
        <div
          id={`A5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            borderLeft: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`D5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            fck
          </div>
        </div>
        <div
          id={`E5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`fck`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            30
          </div>
        </div>
        <div
          id={`G5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`H5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`I5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            MPa
          </div>
        </div>
        <div
          id={`J5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            fy
          </div>
        </div>
        <div
          id={`L5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`M5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            400
          </div>
        </div>
        <div
          id={`N5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`O5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`P5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            MPa
          </div>
        </div>
        <div
          id={`Q5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`R5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            dt&apos;
          </div>
        </div>
        <div
          id={`S5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`U5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`V5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            100.0
          </div>
        </div>
        <div
          id={`W5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`X5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            mm
          </div>
        </div>
        <div
          id={`Y5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            d&apos;
          </div>
        </div>
        <div
          id={`AA5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`AB5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`AC5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`AD5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            150
          </div>
        </div>
        <div
          id={`AE5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`AF5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            mm
          </div>
        </div>
        <div
          id={`AG5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            borderRight: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`AH5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI5`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-6`} style={{ display: 'flex' }}>
        <div
          id={`A6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderLeft: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`D6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            Mu
          </div>
        </div>
        <div
          id={`E6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`F6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
            3654.23
          </div>
        </div>
        <div
          id={`G6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
             
          </div>
        </div>
        <div
          id={`H6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
             
          </div>
        </div>
        <div
          id={`I6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            kN.m
          </div>
        </div>
        <div
          id={`J6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            Vu
          </div>
        </div>
        <div
          id={`L6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`M6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
            1205.94
          </div>
        </div>
        <div
          id={`N6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
             
          </div>
        </div>
        <div
          id={`O6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
             
          </div>
        </div>
        <div
          id={`P6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            kN
          </div>
        </div>
        <div
          id={`Q6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            Mo
          </div>
        </div>
        <div
          id={`S6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`U6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
            2191.62
          </div>
        </div>
        <div
          id={`V6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
             
          </div>
        </div>
        <div
          id={`W6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
             
          </div>
        </div>
        <div
          id={`X6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            kN.m
          </div>
        </div>
        <div
          id={`Y6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            d (휨)
          </div>
        </div>
        <div
          id={`AA6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`AC6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`AD6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            1250.0
          </div>
        </div>
        <div
          id={`AE6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`AF6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            mm
          </div>
        </div>
        <div
          id={`AG6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRight: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`AH6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI6`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-7`} style={{ display: 'flex' }}>
        <div
          id={`A7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderLeft: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`D7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            B
          </div>
        </div>
        <div
          id={`E7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`F7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            1000.0
          </div>
        </div>
        <div
          id={`G7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`H7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`I7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            mm
          </div>
        </div>
        <div
          id={`J7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            H
          </div>
        </div>
        <div
          id={`L7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`M7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            1400.0
          </div>
        </div>
        <div
          id={`N7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`O7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`P7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            mm
          </div>
        </div>
        <div
          id={`Q7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            헌치
          </div>
        </div>
        <div
          id={`S7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`U7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            900.0
          </div>
        </div>
        <div
          id={`V7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`W7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`X7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            mm
          </div>
        </div>
        <div
          id={`Y7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            d (전단)
          </div>
        </div>
        <div
          id={`AA7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`AC7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`AD7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            950.0
          </div>
        </div>
        <div
          id={`AE7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`AF7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            mm
          </div>
        </div>
        <div
          id={`AG7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRight: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`AH7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI7`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-8`} style={{ display: 'flex' }}>
        <div
          id={`A8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            borderLeft: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`D8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            φf
          </div>
        </div>
        <div
          id={`E8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`F8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.8500
          </div>
        </div>
        <div
          id={`G8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`H8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`I8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`J8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`K8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            φv
          </div>
        </div>
        <div
          id={`L8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`M8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.750
          </div>
        </div>
        <div
          id={`N8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`O8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`P8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`Q8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`R8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            주철근
          </div>
        </div>
        <div
          id={`S8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            2.0
          </div>
        </div>
        <div
          id={`U8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            단 배치
          </div>
        </div>
        <div
          id={`V8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`W8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`X8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`Y8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`Z8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            dt
          </div>
        </div>
        <div
          id={`AA8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`AB8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`AC8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`AD8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            1250.0
          </div>
        </div>
        <div
          id={`AE8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`AF8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            mm
          </div>
        </div>
        <div
          id={`AG8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRight: '1px solid black',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             
          </div>
        </div>
        <div
          id={`AH8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI8`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-9`} style={{ display: 'flex' }}>
        <div
          id={`A9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(255, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(255, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(255, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(255, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(255, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(255, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(255, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI9`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-10`} style={{ display: 'flex' }}>
        <div
          id={`A10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            borderLeft: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            Use As =
          </div>
        </div>
        <div
          id={`E10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            1단
          </div>
        </div>
        <div
          id={`H10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            1CYCLE
          </div>
        </div>
        <div
          id={`J10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            H
          </div>
        </div>
        <div
          id={`L10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            29
          </div>
        </div>
        <div
          id={`M10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            @
          </div>
        </div>
        <div
          id={`N10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            250.0
          </div>
        </div>
        <div
          id={`O10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            , 2CYCLE
          </div>
        </div>
        <div
          id={`Q10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            H
          </div>
        </div>
        <div
          id={`T10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            29
          </div>
        </div>
        <div
          id={`U10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            @
          </div>
        </div>
        <div
          id={`V10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            250.0
          </div>
        </div>
        <div
          id={`W10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`Y10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            5139.20
          </div>
        </div>
        <div
          id={`Z10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            mm2
          </div>
        </div>
        <div
          id={`AC10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderTop: '1px solid black',
            borderRight: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI10`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-11`} style={{ display: 'flex' }}>
        <div
          id={`A11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderLeft: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            2단
          </div>
        </div>
        <div
          id={`H11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            1CYCLE
          </div>
        </div>
        <div
          id={`J11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            H
          </div>
        </div>
        <div
          id={`L11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            29
          </div>
        </div>
        <div
          id={`M11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            @
          </div>
        </div>
        <div
          id={`N11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            250.0
          </div>
        </div>
        <div
          id={`O11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            , 2CYCLE
          </div>
        </div>
        <div
          id={`Q11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            H
          </div>
        </div>
        <div
          id={`T11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            29
          </div>
        </div>
        <div
          id={`U11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            @
          </div>
        </div>
        <div
          id={`V11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            250.0
          </div>
        </div>
        <div
          id={`W11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`Y11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            5139.20
          </div>
        </div>
        <div
          id={`Z11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            mm2
          </div>
        </div>
        <div
          id={`AC11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRight: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI11`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-12`} style={{ display: 'flex' }}>
        <div
          id={`A12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderLeft: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            3단
          </div>
        </div>
        <div
          id={`H12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            1CYCLE
          </div>
        </div>
        <div
          id={`J12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            H
          </div>
        </div>
        <div
          id={`L12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0
          </div>
        </div>
        <div
          id={`M12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            @
          </div>
        </div>
        <div
          id={`N12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.0
          </div>
        </div>
        <div
          id={`O12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            , 2CYCLE
          </div>
        </div>
        <div
          id={`Q12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            H
          </div>
        </div>
        <div
          id={`T12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            0
          </div>
        </div>
        <div
          id={`U12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            @
          </div>
        </div>
        <div
          id={`V12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            0.0
          </div>
        </div>
        <div
          id={`W12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`Y12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.00
          </div>
        </div>
        <div
          id={`Z12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            mm2
          </div>
        </div>
        <div
          id={`AC12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRight: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI12`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-13`} style={{ display: 'flex' }}>
        <div
          id={`A13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            borderLeft: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            TOTAL
          </div>
        </div>
        <div
          id={`M13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`O13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            10278.40
          </div>
        </div>
        <div
          id={`P13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            mm2
          </div>
        </div>
        <div
          id={`S13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            [
          </div>
        </div>
        <div
          id={`U13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            p
          </div>
        </div>
        <div
          id={`V13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`W13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.008223
          </div>
        </div>
        <div
          id={`X13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            ]
          </div>
        </div>
        <div
          id={`AA13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRight: '1px solid black',
            borderBottom: '1px solid black',
            backgroundColor: 'rgba(204, 255, 255, 1)',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI13`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-14`} style={{ display: 'flex' }}>
        <div
          id={`A14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI14`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-15`} style={{ display: 'flex' }}>
        <div
          id={`A15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            ▶
          </div>
        </div>
        <div
          id={`D15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            주철근이 항복한다고 가정하면,
          </div>
        </div>
        <div
          id={`E15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            T
          </div>
        </div>
        <div
          id={`R15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`S15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            As fy
          </div>
        </div>
        <div
          id={`T15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`V15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            4111360.00
          </div>
        </div>
        <div
          id={`W15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            N
          </div>
        </div>
        <div
          id={`AA15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI15`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-16`} style={{ display: 'flex' }}>
        <div
          id={`A16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            C
          </div>
        </div>
        <div
          id={`E16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`F16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.85 fck  a b
          </div>
        </div>
        <div
          id={`G16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`K16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            25500.00
          </div>
        </div>
        <div
          id={`L16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            a
          </div>
        </div>
        <div
          id={`O16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            C = T
          </div>
        </div>
        <div
          id={`R16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            ;
          </div>
        </div>
        <div
          id={`T16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            a
          </div>
        </div>
        <div
          id={`U16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`V16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            161.23
          </div>
        </div>
        <div
          id={`W16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            mm
          </div>
        </div>
        <div
          id={`AA16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI16`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-17`} style={{ display: 'flex' }}>
        <div
          id={`A17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            c
          </div>
        </div>
        <div
          id={`E17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`F17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            a / β1
          </div>
        </div>
        <div
          id={`G17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`M17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            161.2
          </div>
        </div>
        <div
          id={`N17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            /
          </div>
        </div>
        <div
          id={`Q17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.8360
          </div>
        </div>
        <div
          id={`R17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`T17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            192.9
          </div>
        </div>
        <div
          id={`U17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            mm
          </div>
        </div>
        <div
          id={`X17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI17`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-18`} style={{ display: 'flex' }}>
        <div
          id={`A18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            εt
          </div>
        </div>
        <div
          id={`E18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`F18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.0033 (dt-c) / c
          </div>
        </div>
        <div
          id={`G18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`M18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
          data-formula="=fck+F6"
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(255, 0, 0, 1)',
						}}
					>
            {evaluateFormula('=fck+F6')}
          </div>
        </div>
        <div
          id={`N18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(255, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(255, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            ×
          </div>
        </div>
        <div
          id={`Q18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            (
          </div>
        </div>
        <div
          id={`R18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            1250.0
          </div>
        </div>
        <div
          id={`S18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            -
          </div>
        </div>
        <div
          id={`V18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            192.9
          </div>
        </div>
        <div
          id={`W18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            )
          </div>
        </div>
        <div
          id={`Z18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            /
          </div>
        </div>
        <div
          id={`AA18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            192.9
          </div>
        </div>
        <div
          id={`AB18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI18`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-19`} style={{ display: 'flex' }}>
        <div
          id={`A19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`M19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.018089
          </div>
        </div>
        <div
          id={`N19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            &amp;gt;
          </div>
        </div>
        <div
          id={`R19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.002
          </div>
        </div>
        <div
          id={`U19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            ⇒
          </div>
        </div>
        <div
          id={`Y19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
             가정만족 (주철근 항복)
          </div>
        </div>
        <div
          id={`Z19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI19`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-20`} style={{ display: 'flex' }}>
        <div
          id={`A20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            &amp;gt;
          </div>
        </div>
        <div
          id={`R20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.005
          </div>
        </div>
        <div
          id={`U20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            ⇒
          </div>
        </div>
        <div
          id={`Y20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
             인장지배 단면
          </div>
        </div>
        <div
          id={`Z20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI20`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-21`} style={{ display: 'flex' }}>
        <div
          id={`A21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            φf
          </div>
        </div>
        <div
          id={`E21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`F21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            φc
          </div>
        </div>
        <div
          id={`G21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            +
          </div>
        </div>
        <div
          id={`H21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            ( φt - φc )
          </div>
        </div>
        <div
          id={`I21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            ( εt - εy )
          </div>
        </div>
        <div
          id={`M21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`P21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.65
          </div>
        </div>
        <div
          id={`Q21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            +
          </div>
        </div>
        <div
          id={`S21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            (
          </div>
        </div>
        <div
          id={`T21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.8500
          </div>
        </div>
        <div
          id={`U21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            -
          </div>
        </div>
        <div
          id={`W21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.65
          </div>
        </div>
        <div
          id={`X21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            )
          </div>
        </div>
        <div
          id={`Z21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            (
          </div>
        </div>
        <div
          id={`AA21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.018089
          </div>
        </div>
        <div
          id={`AB21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            -
          </div>
        </div>
        <div
          id={`AE21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.002
          </div>
        </div>
        <div
          id={`AF21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            )
          </div>
        </div>
        <div
          id={`AH21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI21`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-22`} style={{ display: 'flex' }}>
        <div
          id={`A22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            ( 0.005 - εy )
          </div>
        </div>
        <div
          id={`I22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            (
          </div>
        </div>
        <div
          id={`T22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.0050
          </div>
        </div>
        <div
          id={`U22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            -
          </div>
        </div>
        <div
          id={`W22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.002
          </div>
        </div>
        <div
          id={`X22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            )
          </div>
        </div>
        <div
          id={`Z22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI22`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-23`} style={{ display: 'flex' }}>
        <div
          id={`A23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`M23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            1.7226
          </div>
        </div>
        <div
          id={`N23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            &amp;gt;
          </div>
        </div>
        <div
          id={`R23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.85
          </div>
        </div>
        <div
          id={`U23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            ⇒
          </div>
        </div>
        <div
          id={`Y23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            φf
          </div>
        </div>
        <div
          id={`Z23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`AA23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            0.8500
          </div>
        </div>
        <div
          id={`AB23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI23`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-24`} style={{ display: 'flex' }}>
        <div
          id={`A24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            ▶
          </div>
        </div>
        <div
          id={`C24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            필요철근량 산정
          </div>
        </div>
        <div
          id={`D24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI24`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-25`} style={{ display: 'flex' }}>
        <div
          id={`A25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            Mu / Φ = As x fy  x (d - β x c)              ----------------   ①
          </div>
        </div>
        <div
          id={`D25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI25`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-26`} style={{ display: 'flex' }}>
        <div
          id={`A26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
                    c = As x fy  / (α x 0.85 x fck  x b)  ----------------   ②
          </div>
        </div>
        <div
          id={`D26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI26`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-27`} style={{ display: 'flex' }}>
        <div
          id={`A27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            식②를 식①에 대입하여 이차방정식으로 As를 구한다
          </div>
        </div>
        <div
          id={`D27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI27`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-28`} style={{ display: 'flex' }}>
        <div
          id={`A28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            As
          </div>
        </div>
        <div
          id={`K28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`L28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            9120.07546
          </div>
        </div>
        <div
          id={`M28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            mm2
          </div>
        </div>
        <div
          id={`Q28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            &amp;lt;
          </div>
        </div>
        <div
          id={`S28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            Use As
          </div>
        </div>
        <div
          id={`V28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`X28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            10278.4
          </div>
        </div>
        <div
          id={`Y28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            mm2
          </div>
        </div>
        <div
          id={`AC28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            ∴
          </div>
        </div>
        <div
          id={`AE28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            O.K
          </div>
        </div>
        <div
          id={`AF28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI28`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-29`} style={{ display: 'flex' }}>
        <div
          id={`A29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI29`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-30`} style={{ display: 'flex' }}>
        <div
          id={`A30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            ▶
          </div>
        </div>
        <div
          id={`C30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            휨 검토
          </div>
        </div>
        <div
          id={`D30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI30`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-31`} style={{ display: 'flex' }}>
        <div
          id={`A31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            Md
          </div>
        </div>
        <div
          id={`D31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`E31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            φf T ( d - a / 2 )
          </div>
        </div>
        <div
          id={`F31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`L31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.8500
          </div>
        </div>
        <div
          id={`M31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            ×
          </div>
        </div>
        <div
          id={`O31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            4111360.00
          </div>
        </div>
        <div
          id={`P31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            ×
          </div>
        </div>
        <div
          id={`T31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            (
          </div>
        </div>
        <div
          id={`U31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            1250.0
          </div>
        </div>
        <div
          id={`V31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            -
          </div>
        </div>
        <div
          id={`X31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            161.23
          </div>
        </div>
        <div
          id={`Y31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            /
          </div>
        </div>
        <div
          id={`AA31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            2
          </div>
        </div>
        <div
          id={`AB31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            )
          </div>
        </div>
        <div
          id={`AC31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            /
          </div>
        </div>
        <div
          id={`AD31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            10 E+6
          </div>
        </div>
        <div
          id={`AE31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI31`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-32`} style={{ display: 'flex' }}>
        <div
          id={`A32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`E32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            4086.598649
          </div>
        </div>
        <div
          id={`F32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            kN.m
          </div>
        </div>
        <div
          id={`J32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            &amp;gt;
          </div>
        </div>
        <div
          id={`L32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            Mu
          </div>
        </div>
        <div
          id={`N32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`O32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            3654.230000
          </div>
        </div>
        <div
          id={`P32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            kN.m
          </div>
        </div>
        <div
          id={`T32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            ∴
          </div>
        </div>
        <div
          id={`W32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            O.K
          </div>
        </div>
        <div
          id={`X32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            [S.F
          </div>
        </div>
        <div
          id={`AA32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`AC32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            1.11832000000000
          </div>
        </div>
        <div
          id={`AD32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            ]
          </div>
        </div>
        <div
          id={`AG32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI32`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-33`} style={{ display: 'flex' }}>
        <div
          id={`A33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI33`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-34`} style={{ display: 'flex' }}>
        <div
          id={`A34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            ▶
          </div>
        </div>
        <div
          id={`C34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            최소 철근량 검토
          </div>
        </div>
        <div
          id={`D34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 255, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI34`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-35`} style={{ display: 'flex' }}>
        <div
          id={`A35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            Ig
          </div>
        </div>
        <div
          id={`D35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`F35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            bh³ / 12
          </div>
        </div>
        <div
          id={`G35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`K35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            1000.0
          </div>
        </div>
        <div
          id={`L35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            ×
          </div>
        </div>
        <div
          id={`O35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            1400.0
          </div>
        </div>
        <div
          id={`P35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
              verticalAlign: 'superscript',
						}}
					>
            3
          </div>
        </div>
        <div
          id={`S35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            /
          </div>
        </div>
        <div
          id={`T35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            12
          </div>
        </div>
        <div
          id={`U35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`Y35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            228666666667.0
          </div>
        </div>
        <div
          id={`Z35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            mm4
          </div>
        </div>
        <div
          id={`AF35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI35`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-36`} style={{ display: 'flex' }}>
        <div
          id={`A36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            fr
          </div>
        </div>
        <div
          id={`D36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`F36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            0.63λ√(fck)
          </div>
        </div>
        <div
          id={`G36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`K36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.630
          </div>
        </div>
        <div
          id={`L36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            ×
          </div>
        </div>
        <div
          id={`O36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            1.0
          </div>
        </div>
        <div
          id={`P36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            ×
          </div>
        </div>
        <div
          id={`S36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            √
          </div>
        </div>
        <div
          id={`T36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            30.0
          </div>
        </div>
        <div
          id={`U36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`Y36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            3.4510
          </div>
        </div>
        <div
          id={`Z36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI36`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-37`} style={{ display: 'flex' }}>
        <div
          id={`A37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            Mcr
          </div>
        </div>
        <div
          id={`D37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`F37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
             fr x Ig / yt
          </div>
        </div>
        <div
          id={`G37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`K37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            3.4510
          </div>
        </div>
        <div
          id={`L37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            ×
          </div>
        </div>
        <div
          id={`O37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            228666666667.0
          </div>
        </div>
        <div
          id={`P37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            /
          </div>
        </div>
        <div
          id={`V37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            700
          </div>
        </div>
        <div
          id={`W37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`Z37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            1127.3267
          </div>
        </div>
        <div
          id={`AA37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            kN.m
          </div>
        </div>
        <div
          id={`AD37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI37`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-38`} style={{ display: 'flex' }}>
        <div
          id={`A38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            1.2Mcr
          </div>
        </div>
        <div
          id={`D38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`F38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            1.2
          </div>
        </div>
        <div
          id={`G38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            ×
          </div>
        </div>
        <div
          id={`I38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            1127.3267
          </div>
        </div>
        <div
          id={`J38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`M38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            1352.7920
          </div>
        </div>
        <div
          id={`N38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            kN.m
          </div>
        </div>
        <div
          id={`Q38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            &amp;lt;
          </div>
        </div>
        <div
          id={`S38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
             4/3 Mu
          </div>
        </div>
        <div
          id={`T38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             =
          </div>
        </div>
        <div
          id={`W38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            4872.3067
          </div>
        </div>
        <div
          id={`X38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            kN.m
          </div>
        </div>
        <div
          id={`AA38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI38`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-39`} style={{ display: 'flex' }}>
        <div
          id={`A39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            ΦMn
          </div>
        </div>
        <div
          id={`D39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`F39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            4086.5986
          </div>
        </div>
        <div
          id={`G39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            kN.m
          </div>
        </div>
        <div
          id={`K39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            ≥
          </div>
        </div>
        <div
          id={`M39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            1.2Mcr
          </div>
        </div>
        <div
          id={`N39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
             =
          </div>
        </div>
        <div
          id={`Q39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            1352.7920
          </div>
        </div>
        <div
          id={`R39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            kN.m
          </div>
        </div>
        <div
          id={`U39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            최소철근량 만족
          </div>
        </div>
        <div
          id={`X39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            ∴
          </div>
        </div>
        <div
          id={`AC39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            O.K
          </div>
        </div>
        <div
          id={`AD39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI39`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-40`} style={{ display: 'flex' }}>
        <div
          id={`A40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI40`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-41`} style={{ display: 'flex' }}>
        <div
          id={`A41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            ▶
          </div>
        </div>
        <div
          id={`C41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            최대 철근비 검토
          </div>
        </div>
        <div
          id={`D41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`F41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`G41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`K41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`M41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI41`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-42`} style={{ display: 'flex' }}>
        <div
          id={`A42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            ρmax
          </div>
        </div>
        <div
          id={`D42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`F42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.7260
          </div>
        </div>
        <div
          id={`G42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            x  Pb = 
          </div>
        </div>
        <div
          id={`I42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`J42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.7260
          </div>
        </div>
        <div
          id={`K42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            x α x 0.85 x (fck / fy) x (εcu x Es) / (εcu x Es + fy)
          </div>
        </div>
        <div
          id={`M42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`N42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`R42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`W42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`X42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI42`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
      <div id={`ROW-43`} style={{ display: 'flex' }}>
        <div
          id={`A43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '79px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`B43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '30px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`C43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`D43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`E43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`F43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.0231
          </div>
        </div>
        <div
          id={`G43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`H43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`I43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '38px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            &amp;gt;
          </div>
        </div>
        <div
          id={`J43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            ρuse
          </div>
        </div>
        <div
          id={`K43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              color: 'rgba(0, 0, 0, 1)',
						}}
					>
            
          </div>
        </div>
        <div
          id={`L43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            =
          </div>
        </div>
        <div
          id={`M43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            0.0082
          </div>
        </div>
        <div
          id={`N43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`O43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`P43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Q43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            철근비 만족
          </div>
        </div>
        <div
          id={`R43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`S43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`T43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`U43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`V43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '28px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            ∴
          </div>
        </div>
        <div
          id={`W43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            O.K
          </div>
        </div>
        <div
          id={`X43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Y43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`Z43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AA43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AB43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AC43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
              fontWeight: 'bold',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AD43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AE43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AF43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AG43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AH43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '21px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '맑은 고딕',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
        <div
          id={`AI43`}
          style={{ /* default */ position: 'relative',
            /* cell style */
            width: '62px',
            height: '24px',
            boxSizing: 'border-box',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            backgroundColor: 'inherit',
          }}
				 >
          <div
            style={{ /* default */ position: 'absolute', top: 0, left: 0, zIndex: 1, whiteSpace: 'nowrap',
            /* font style */
              fontFamily: '굴림',
              fontSize: '13.5px',
						}}
					>
            
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
