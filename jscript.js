var elements = [], translates = [];

function create_elements() {
	elements = [];
	translates = [];
	document.getElementById("sort_space").innerHTML = "";
	var number_of_elements = parseInt(document.getElementById("number_of_elements").value);
	for (let i = 0; i < number_of_elements; i++) {
		let x = Math.floor(Math.random() * 81 + 10)
		elements.push(x);
		translates.push(0);
	}
	for (let i = 0; i < number_of_elements; i++) {
		var element = document.createElement('div');
		element.className = "element";
		element.style.height = `${2 * elements[i]}px`;
		element.style.width = `${600 / (number_of_elements + 10)}px`;
		element.setAttribute("id", `element${i}`);
		document.getElementById("sort_space").appendChild(element);
	}
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const swap = async function (nodeA, nodeB, j) {
	translates[j] += 600 / elements.length;
	translates[j+1] -= 600 / elements.length;
	nodeA.style.transform = `translateX(${translates[j]}px)`;
	nodeB.style.transform = `translateX(${translates[j+1]}px)`;
	await sleep(500);
	let temp = translates[j];
	translates[j] = translates[j+1];
	translates[j+1] = temp;
};

async function sort_elements() {
	for (let i = 0; i < elements.length; i++) {
		for (let j = 0; j < elements.length - 1; j++) {
			if (elements[j] > elements[j+1]) {
				let temp = elements[j];
				elements[j] = elements[j+1];
				elements[j+1] = temp;

				left_element = document.getElementById(`element${j}`);
				right_element = document.getElementById(`element${j+1}`);
				
				await swap(left_element, right_element, j);

				left_element.setAttribute("id", `element${j+1}`);
				right_element.setAttribute("id", `element${j}`);
			}
		}
	}
}
