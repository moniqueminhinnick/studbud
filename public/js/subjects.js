// NAVIGATION
//    side navigation functions to open and close

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}
openNav();
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

//    open and close task list
document.getElementById("addTask").onclick = function () {
  openForm();
};
document.getElementById("close").onclick = function () {
  closeForm();
};

function openForm() {
  document.getElementById("taskForm").style.display = "block";
}

function closeForm() {
  document.getElementById("taskForm").style.display = "none";
}

// ADDING SUBJECTS
let subjects = [];

let activeSubjectId = null;

function setActiveSubjectId(id) {
  activeSubjectId = id;
}

function createSubjectWithId(id) {
  return {
    name: "",
    subjectCode: "",
    assignmentMarks: [null, null, null, null],
    id,
  };
}

// btn functionality to show and hide information
function addSubjectBtn() {
  document.getElementById("subject-form").style.display = "flex";
  document.getElementById("addSubject").style.display = "none";
}

// function to dynamically add input fields
function addInputField(id) {
  let container = document.getElementById("inputs");
  let newInput = document.createElement("input");
  newInput.setAttribute("type", "text");
  newInput.setAttribute("name", "subjectName");
  newInput.classList.add("subjectName");
  newInput.setAttribute("required", "");
  newInput.id = id;
  container.appendChild(newInput);
}

// display next question in add subject form
function displayNext() {
  document.getElementById("qone").style.display = "none";
  document.getElementById("qtwo").style.display = "flex";
  let input = document.querySelector("input");
  let num = input.value;
  // Get the element where the inputs will be added to
  if (num > 0) {
    for (i = 0; i < num; i++) {
      const id = `subject-${i}`;
      const subject = createSubjectWithId(id);
      subjects.push(subject);
      addInputField(subject.id);
    }
  } else {
    alert("must fill out form before submission");
  }
}
// saves subjects names by mapping though obj finding name and assigning name to variable
function saveSubjectNames() {
  subjects = subjects.map((subject) => {
    const name = document.getElementById(subject.id).value;
    return {
      ...subject,
      name,
    };
  });
  document.getElementById("subject-form").style.display = "none";
  addSubjectCards();
  addSubjectNav();
}
// manages goals dependent on subj id
function showGoals(id) {
  let marx = document.getElementById("subjectMarks");
  if (marx.style.display == "none") {
    marx.style.display = "flex";
    marx.classList.add(`${id}`);
    console.log(id);
    goalsManager(id);
  } else {
    marx.style.display = "none";
    marx.classList.remove(`${id}`);
  }
}

// seperate the logic from the rendering
function goalsManager(subjectId) {
  console.log(subjects);
  console.log("subjectId is", subjectId);
  const subject = subjects.find((subject) => subject.id === subjectId);
  const marks = subject.assignmentMarks;

  function getAverageOfMarks() {
    const sum = marks.reduce((prev, curr) => prev + curr);
    const numMarksWhichHaveValue = marks.filter((mark) => mark !== null).length;
    return sum / numMarksWhichHaveValue;
  }

  function handleInputOfMark(position, mark) {
    marks[position] = parseInt(mark);
    const average = getAverageOfMarks();
    document.getElementById("goalTotal").innerHTML = average.toFixed(1);
  }

  // handling the input update of the mark
  let a1 = document.getElementById("a1M");
  let a2 = document.getElementById("a2M");
  let a3 = document.getElementById("a3M");
  let a4 = document.getElementById("a4M");
  let allGoals = [a1, a2, a3, a4];
  allGoals.forEach((markEl, index) => {
    // initialising the values
    markEl.value = marks[index];
    // handles changes
    markEl.onchange = (event) => handleInputOfMark(index, event.target.value);
  });
}
// manages creation of subject cards from form input
function addSubjectCards() {
  let container = document.getElementById("subjects-cards");
  subjects.forEach((subject) => {
    const { name, id } = subject;
    let subjectCard = document.createElement("div");
    subjectCard.id = `${name}`;
    subjectCard.classList.add("subjectCards");
    subjectCard.addEventListener("click", () => {
      setActiveSubjectId(id);
      showGoals(id);
    });
    subjectCard.innerHTML = `${name}`;
    container.appendChild(subjectCard);
    console.log(name);
  });
}
// adds subjects to navigation list
function addSubjectNav() {
  subjects.forEach((subject) => {
    const { name } = subject;
    let cont = document.getElementById("navSubjects");
    let newLi = document.createElement("li");
    newLi.id = `${name}nav`;
    newLi.innerHTML = `${name}`;
    cont.appendChild(newLi);
  });
}
