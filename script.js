const input = document.querySelector(".input");
const output = document.querySelector(".output");
const con = document.querySelectorAll(".con");
const con1 = document.querySelectorAll(".con1");
const val1 = document.querySelector(".val1");
const val2 = document.querySelector(".val2");

let itemFrom1;
let itemTo1;
input.value = 1;
window.addEventListener("load", () => {
  con[0].click();
  con1[1].click();
});
con.forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault();
    for (let i = 0; i < con.length; i++) {
      con[i].classList.add("unclicked");
      con[i].classList.remove("clicked");
    }
    event.target.classList.remove("unclicked");
    event.target.classList.add("clicked");
    itemFrom1 = clickedClass1(item);
  });
});

con1.forEach((item) => {
  item.addEventListener("click", function (event) {
    event.preventDefault();
    for (let i = 0; i < con.length; i++) {
      con1[i].classList.add("unclicked1");
      con1[i].classList.remove("clicked1");
    }
    event.target.classList.remove("unclicked1");
    event.target.classList.add("clicked1");
    itemTo1 = clickedClass2(item);
  });
});

input.addEventListener("input", function (event) {
  if (event.target.value != "") {
    if (itemFrom1 && itemTo1) {
      Fetching1();
    }
  } else {
    output.value = "";
  }
});
output.addEventListener("input", function (event) {
  if (event.target.value != "") {
    if (itemFrom1 && itemTo1) {
      Fetching2();
    }
  } else {
    input.value = "";
  }
});

con.forEach((item) => {
  item.addEventListener("click", function (event) {
    if (itemFrom1 && itemTo1) {
      if (input.value != "") {
        Fetching1();
      } else {
        Fetching2();
      }
    }
  });
});

con1.forEach((item) => {
  item.addEventListener("click", function (event) {
    if (itemFrom1 && itemTo1) {
      if (input.value != "") {
        Fetching1();
      } else {
        Fetching2();
      }
    }
  });
});

function clickedClass1(el) {
  el = document.querySelector(".clicked");
  return el.innerText;
}

function clickedClass2(el) {
  el = document.querySelector(".clicked1");
  return el.innerText;
}

function Fetching1() {
  fetch(
    `https://api.exchangerate.host/latest?base=${itemFrom1}&symbols=${itemTo1}`
  )
    .then((response) => response.json())
    .then((data) => {
      let resp = input.value * data.rates[`${itemTo1}`];
      if (!isNaN(resp)) {
        output.value = resp;
        val1.innerHTML = `1 ${itemFrom1} = ${
          data.rates[`${itemTo1}`]
        } ${itemTo1}`;
        val2.innerHTML = `1 ${itemTo1} =  ${
          1 / data.rates[`${itemTo1}`]
        } ${itemFrom1}`;
      } else {
        output.value = "";
      }
    })
    .catch((err) => {
      alert("Something went wrong")
    });

  if (input.value == "") {
    output.value == "";
  }
}

function Fetching2() {
  fetch(
    `https://api.exchangerate.host/latest?base=${itemFrom1}&symbols=${itemTo1}`
  )
    .then((response1) => response1.json())
    .then((data1) => {
      let resp1 = output.value * data1.rates[`${itemTo1}`];
      if (!isNaN(resp1)) {
        input.value = resp1;
        val1.innerHTML = `1 ${itemFrom1} = ${
          data1.rates[`${itemTo1}`]
        } ${itemTo1}`;
        val2.innerHTML = `1 ${itemTo1} = ${
          1 / data1.rates[`${itemTo1}`]
        } ${itemFrom1}`;
      } else {
        input.value = "";
      }
    })

    .catch((err) => {
      alert("Something went wrong");

    });

  if (input.value == "") {
    output.value == "";
  }
}