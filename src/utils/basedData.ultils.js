export const scored = {
    excellent: 20,
    success: 15,
    moderate: 10,
    passed: 5,
};

export const basedCountDownBar = {
    border: 'none',
    backgroundColor: 'rgb(146 215 42)',
    width: '70%',
    height: '30px',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
};

export const basedCountDown = 15; //sec
export const basedtotalCountDown = 300; //sec

export const originalBar = '#7dd01d';
export const TwoThirdsBar = 'yellow';
export const oneThirdBar = 'rgb(234 68 13)';

export const basedLives = 2;

export const basedLivesArr = [];

for (let i = 0; i < basedLives; i++) {
    basedLivesArr.push(i);
}

export const basedHintsLeft = 10;

export const IconStyles = {
    // position: 'absolute',
    marginTop: '11px',
    width: '0.8em',
    height: '0.8em',
};
export const hintStyles = {
    // marginLeft: '-20px',
    width: '2em',
    height: '2em',
    color: '#e87e17',
};
export const hintStylesClicked = {
    // marginLeft: '-20px',
    width: '2em',
    height: '2em',
    color: '#Dfee6a',
};
