button = document.querySelectorAll(".info-button");
deleteB = document.querySelectorAll(".danger-button");

let todo = {};

button.forEach((but) => {
  function replaceElement(i) {
    let newElement = document.createElement("input");
    let newElement2 = document.createElement("input");
    newElement.classList.add(`edit${i}`);
    newElement2.classList.add(`editDes${i}`);
    let oldElement = document.querySelector(`.todo-${i}`);
    let val1 = oldElement.innerHTML;
    let oldElement2 = document.querySelector(`.todoDes-${i}`);
    let val2 = oldElement2.innerHTML;
    if (todo[i]) {
      delete todo[i];
    } else {
      todo[i] = [val1, val2, false, oldElement, oldElement2];
    }
    newElement.value = val1;
    newElement2.value = val2;
    oldElement.replaceWith(newElement);
    oldElement2.replaceWith(newElement2);
  }

  const returnBack = async (i) => {
    let inp1 = document.querySelector(`.edit${i}`),
      inp2 = document.querySelector(`.editDes${i}`);
    let val1 = inp1.value,
      val2 = inp2.value;
    const previousData = todo[i][0];
    const previousDesc = todo[i][1];
    let td1 = document.createElement("td");
    td1.innerText = val1;
    td1.classList.add("todo-" + i);
    td1.setAttribute("id", "todo");
    let td2 = document.createElement("td");
    td2.innerText = val2;
    td2.classList.add("todoDes-" + i);
    inp1.replaceWith(td1);
    inp2.replaceWith(td2);
    let csrftoken = getCookie("csrftoken");
    let response = await fetch("http://127.0.0.1:8000/data", {
      method: "POST",
      body: JSON.stringify({
        name: previousData,
        description: previousDesc,
        newData: val1,
        newDataDes: val2,
      }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    });
    console.log(await response.json());
  };

  but.addEventListener("click", (e) => {
    let ind = but.getAttribute("data-inc");
    if (Object.keys(todo).length == 0) {
      but.innerText = "Apply changes";
      return replaceElement(ind);
    }
    for (let i in todo) {
      if (todo[ind]) {
        if (!todo[ind][2]) {
          returnBack(ind);
          but.innerText = "Modify";
          delete todo[ind];
          break;
        }
      } else {
        replaceElement(ind);
        but.innerText = "Apply changes";
        break;
      }
    }
  });
});
deleteB.forEach((b) => {
  b.addEventListener("click", async (e) => {
    const index = b.getAttribute("data-button");
    const row = document.querySelector(".row-" + index);
    const todoName = document.querySelector(".todo-" + index).innerText;
    const todoDesc = document.querySelector(`.todoDes-${index}`).innerText;
    const div = document.querySelector(".myTable"); // Select the <div> containing the rows
    const table = document.querySelector(".parentTable");
    row.remove();
    if (div.querySelectorAll("tr").length == 0) {
      table.remove();
    }
    let csrftoken = getCookie("csrftoken");
    const response = await fetch("http://127.0.0.1:8000/delete", {
      method: "POST",
      body: JSON.stringify({ name: todoName, description: todoDesc }),
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
    });
  });
});

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
