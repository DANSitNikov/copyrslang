// export const getWords = (level, page) => fetch(`https://newrslangapi.herokuapp.com/words/?group=${level - 1}&page=${page}`)
//   .then((response) => response.json())
//   .catch((error) => console.log(error));

export const getFakeWords = (level, page, count) => {
  const numbers = [];
  for (let i = 0; i < count; i += 1) {
    const number = Math.floor(Math.random() * 30);
    if (number === page || numbers.includes(number)) {
      i -= 1;
    } else {
      numbers.push(number);
    }
  }

  const promises = [];
  for (let i = 0; i < count; i += 1) {
    promises.push(
      fetch(`https://newrslangapi.herokuapp.com/words/?group=${level - 1}&page=${numbers[i]}`)
        .then((response) => response.json()),
    );
  }

  return Promise.all([...promises]);
};

export const getWords = (level, page, count) => {
  const numbers = [];
  for (let i = 0; i < count; i += 1) {
    const number = Math.floor(Math.random() * 30);
    if (numbers.includes(number)) {
      i -= 1;
    } else {
      numbers.push(number);
    }
  }

  const promises = [];
  for (let i = 0; i < count; i += 1) {
    promises.push(
      fetch(`https://newrslangapi.herokuapp.com/words/?group=${level - 1}&page=${numbers[i]}`)
        .then((response) => response.json()),
    );
  }

  return Promise.all([...promises]);
};
