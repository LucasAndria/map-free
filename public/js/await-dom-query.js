exports.selectorPromise = (str, time = 2000) => {
  return new Promise((resolve, reject) => {
    let doc = document.querySelector(str);

    if (doc) return resolve(doc);

    setTimeout(() => {
      doc = document.querySelector(str);
      if (doc) return resolve(doc);
      reject("Node can not be found!!");
    }, time);
  });
};
