const date = document.querySelector(".current-date");
let todoInput;
let errorInfo;
let addBtn;
let ulList;
let newTodo;

let popup;
let popupInfo;
let todoToEdit;
let popupInput;
let popupAddBtn;
let popupCloseBtn;

const dateNumber = document.querySelector(".current-date-number");

const day = new Date();
date.textContent = day.toLocaleString("pl", { weekday: "long" });

dateNumber.textContent = new Date().toLocaleDateString();

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	todoInput = document.querySelector(".todo-input");
	errorInfo = document.querySelector(".error-info");
	addBtn = document.querySelector(".btn-add");
	ulList = document.querySelector(".todolist ul");

	popup = document.querySelector(".popup");
	popupInfo = document.querySelector(".popup-info");
	popupInput = document.querySelector(".popup-input");
	popupAddBtn = document.querySelector(".accept");
	popupCloseBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
	addBtn.addEventListener("click", addNewTask);
	ulList.addEventListener("click", checkClick);
	popupCloseBtn.addEventListener("click", closePopup);
	popupAddBtn.addEventListener("click", changeTask);
	todoInput.addEventListener("keyup", enterKeyCheck);
	popupInput.addEventListener("keyup", popupEnter);
};

const addNewTask = () => {
	if (todoInput.value !== "" && todoInput.value.trim().length !== 0) {
		newTodo = document.createElement("li");
		newTodo.textContent = todoInput.value;
		CreateToolsArea();
		ulList.append(newTodo);
		todoInput.value = "";
		errorInfo.textContent = "";
	} else {
		errorInfo.textContent = "Musisz wpisać zadanie!";
	}
};

const CreateToolsArea = () => {
	let newDiv = document.createElement("div");
	newDiv.classList.add("tools");
	newTodo.append(newDiv);

	let Btn1 = document.createElement("button");
	Btn1.classList.add("complete");
	Btn1.innerHTML = '<i class="fas fa-check"></i>';

	let Btn2 = document.createElement("button");
	Btn2.classList.add("edit");
	Btn2.textContent = "EDYTUJ";

	let Btn3 = document.createElement("button");
	Btn3.classList.add("delete");
	Btn3.innerHTML = '<i class="fas fa-times"></i>';

	newDiv.append(Btn1, Btn2, Btn3);
};

const checkClick = (e) => {
	if (e.target.matches(".complete")) {
		e.target.closest("li").classList.toggle("completed");
		e.target.classList.toggle("completed");
	} else if (e.target.matches(".edit")) {
		editTask(e);
	} else if (e.target.matches(".delete")) {
		deleteTask(e);
	}
};

const editTask = (e) => {
	todoToEdit = e.target.closest("li");
	popupInput.value = todoToEdit.firstChild.textContent;
	popup.classList.add("active");
};

const deleteTask = (e) => {
	e.target.closest("li").remove();

	const allTasks = ulList.querySelectorAll("li");
	if (allTasks.length === 0) {
		errorInfo.textContent = "Brak zadań na liście.";
	}
};

const closePopup = () => {
	popup.classList.remove("active");
	popupInfo.textContent = "";
};

const changeTask = () => {
	if (popupInput.value !== "" && popupInput.value.trim().length !== 0) {
		todoToEdit.firstChild.textContent = popupInput.value;
		popup.classList.remove("active");
		popupInfo.textContent = "";
	} else {
		popupInfo.textContent = "Wprowadź treść zadania!";
	}
};

const popupEnter = (e) => {
	if (e.key === "Enter") {
		changeTask();
	}
};

const enterKeyCheck = (e) => {
	if (e.key === "Enter") {
		addNewTask();
	}
};
document.addEventListener("DOMContentLoaded", main);
