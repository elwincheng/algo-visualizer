
document.addEventListener('DOMContentLoaded', ()=>{

	let arr = [];
	let userInput = 0;
	let globalSize = 20;

	let left = 0, right = 19;
	for (let i = 0; i < 20; i++){
		arr.push(i);
	}

	let arrElement = document.querySelector(".array");
	for (let i = 0; i < 20; i++){
		let boxNum = document.createElement('div');
		boxNum.className = "boxNum";
		boxNum.textContent = i;
		arrElement.appendChild(boxNum);
	}

	/*
	document.querySelector('.arrow').animate([
		{transform: 'translateX(1000px)'}

	],
	{
		duration: 1000,
		fill: 'forwards'
	}
	);
	*/
	const animationSettings = {
		duration: 1000,
		fill: 'forwards'
	}
	/*
	let arrow = document.querySelector('.arrow');;
	arrow.animate(createAnimation(1000), animationSettings);
	*/

	let sizeSlider = document.querySelector('.sizeSlider');
	let input = document.querySelector('.input');
	let start = document.querySelector('.start');
	let size = document.querySelector('.size');
	let setSize = document.querySelector('.setSize');
	let linearSearchButton = document.querySelector('.linearSearch');
	let bounds = document.querySelector('.bounds');
	let randomizeButton = document.querySelector('.randomizeButton')

	sizeSlider.addEventListener('input', onChangeSlider)
	let boxNums = document.querySelectorAll('.boxNum');

	function onChangeSlider(){
		for (let i = 0; i < boxNums.length; i++){
			//console.log(sizeSlider.value)
			console.log(boxNums[i].style.width);
			boxNums[i].style.minWidth = `${sizeSlider.value * 10}px`;
			boxNums[i].style.minHeight = `${sizeSlider.value * 10}px`;
		}	
	}

	console.log(sizeSlider.value)

	let boundsArray = [];


	start.addEventListener('click', search)
	setSize.addEventListener('click', setArr);
	randomizeButton.addEventListener('click', randomize);

	let boxNumArr = arrElement.children;

	function setArr(){
		let arrSize = parseInt(size.value);
		globalSize = arrSize;
		right = arrSize-1;
		r = arrSize-1;
		arrElement.innerHTML = '';
		for (let i = 0; i < arrSize; i++){
			let boxNum = document.createElement('div');
			boxNum.className = "boxNum";
			boxNum.textContent = i;
			arrElement.appendChild(boxNum);
		}
	}

	function createAnimation(dist){
		return [
				{ transform: `translateX(${dist}px)` }
			]
	};

	function clearFormat(){
		for (let i = 0; i <= right; i++){
			boxNumArr[i].className = "boxNum";
		}
	}
	let l = left, r = right;
	function search(){
		userInput = input.value;
		if (isNaN(userInput)){
			alert('Input must be a number')
			return;
		}
		/*
		if (userInput < left || userInput > right){
			alert('Number must be greater than 0 and less than ' + r)
			return;
		}
		*/
		clearFormat();
		bounds.textContent = '';
		if (linearSearchButton.checked){
			linearSearch();
			return;
		}
		binarySearch();

	}

	function randomize(){
		arrElement.innerHTML = '';
		let randomArray = Array(globalSize).fill().map(() => Math.round(Math.random() * 1000));
		randomArray.sort((a,b) => a-b);	
		for (let i = 0; i < globalSize; i++){
			let boxNum = document.createElement('div');
			boxNum.className = "boxNum";
			boxNum.textContent = randomArray[i];
			arrElement.appendChild(boxNum);
		}
		
	}

	function linearSearch(){
		let num = parseInt(userInput);
		for (let i = 0; i <= right; i++){
			setColor(i);
			if (num == i){
				return;
			}
		}
	}

	function setColor(i){
		setTimeout(function() {
			boxNumArr[i].className = "boxNum selected";
		}, i * 1000)

	}

	function binarySearch(){
		let num = parseInt(userInput);
		clearFormat();

		let m = Math.floor((l+r)/2);
		let boundsObject = {
			left: l,
			right: r,
			middle: m
		}
		let midValue = boxNumArr[m].textContent;
		let leftValue = boxNumArr[l].textContent;
		let rightValue = boxNumArr[r].textContent;
		boundsArray.push(boundsObject);
		boxNumArr[l].className = "boxNum left";
		boxNumArr[r].className = "boxNum right";
		boxNumArr[m].className = "boxNum selected";
		let txt = document.createElement('p');
		txt.textContent = `${l} ${m} ${r}`;
		bounds.appendChild(txt)
		if (l > r){
			l = left;
			r = right;	
			alert('element not found');
			return;
		}
		if (num == midValue){
			l = left;
			r = right;
			return;
		}
		else if (num < midValue){
			/*
			setTimeout(setColor, 1000, r, 'grey')
			setTimeout(setColor, 1000, m, 'grey')
			//boxNumArr[r].className = "boxNum grey";
			for (let i = m; i <= right; i++){
				setTimeout(setColor, 500*i, i, 'grey')
			}
			*/
			r = m - 1;
		} else {
			//boxNumArr[l].className = "boxNum grey";
			l = m + 1;
			/*
			setTimeout(setColor, 1000, l, 'grey')
			setTimeout(setColor, 1000, m, 'grey')
			for (let i = m; i >= 0; i--){
				setTimeout(setColor, 100*i, i, 'grey')
			}
			*/
		} 
			/*
			for (let i = 0; i < boundsArray.length; i++){
				let txt = document.createElement('p')
				txt.textContent = `${boundsArray[i].left} ${boundsArray[i].middle} ${boundsArray[i].right}`;
				bounds.appendChild(txt)
			}
			boundsArray = [];
			*/

		setTimeout(binarySearch, 1000)
	}

	function setColor(index, color){
		boxNumArr[index].className = "boxNum " + color;
	}

})
