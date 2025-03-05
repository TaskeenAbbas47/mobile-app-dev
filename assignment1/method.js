
console.log("===== JavaScript String Methods =====");


let text = "   Believe in yourself and the process.  ";
console.log("Original String:", text);

console.log("Length:", text.length);
console.log("UpperCase:", text.toUpperCase());
console.log("LowerCase:", text.toLowerCase());
console.log("Character at index 7:", text.charAt(7));
console.log("Index of 'is':", text.indexOf("is"));
console.log("Includes 'awesome':", text.includes("awesome"));
console.log("Starts with 'JavaScript':", text.trim().startsWith("JavaScript"));
console.log("Ends with '!':", text.endsWith("!"));
console.log("Slice(2, 16):", text.slice(2, 16));
console.log("Replace 'awesome' with 'powerful':", text.replace("awesome", "powerful"));
console.log("Split by spaces:", text.split(" "));
console.log("Padded (start):", "5".padStart(4, "0"));
console.log("Padded (end):", "5".padEnd(4, "0"));
console.log("Repeat string:", "Hello! ".repeat(3));
console.log("Match words:", text.match(/\w+/g));


//------------------------------------------------------------------------------------------------
console.log("\n===== JavaScript Array Methods =====");

let numbers = [10, 20, 30, 40, 50];
console.log("Original Array:", numbers);


numbers.push(60);
console.log("Push 60:", numbers);
numbers.pop();
console.log("Pop:", numbers);
numbers.unshift(5);
console.log("Unshift 5:", numbers);
numbers.shift();
console.log("Shift:", numbers);

console.log("Index of 30:", numbers.indexOf(30));
console.log("Includes 20:", numbers.includes(20));

console.log("Reversed:", numbers.reverse());
console.log("Sorted:", numbers.sort((a, b) => a - b));

console.log("Slice(1,3):", numbers.slice(1, 3));
numbers.splice(2, 1, 100);
console.log("Splice (replace index 2 with 100):", numbers);

console.log("Map (x2):", numbers.map(num => num * 2));
console.log("Filter (>20):", numbers.filter(num => num > 20));
console.log("Reduce (Sum):", numbers.reduce((acc, num) => acc + num, 0));

console.log("Fill with 0 (2 to 4):", numbers.fill(0, 2, 4));
console.log("Flatten:", [1, [2, 3], [4, [5, 6]]].flat(2));

console.log("To Sorted (Descending):", numbers.toSorted((a, b) => b - a));
console.log("To Spliced (replace index 2 with 99):", numbers.toSpliced(2, 1, 99));

console.log("\n===== Special Use Cases =====");

let sentence = "JavaScript is powerful";
let wordsArray = sentence.split(" ");
console.log("String to Array:", wordsArray);

console.log("Array to String:", wordsArray.join(" "));

let duplicateArray = [1, 2, 2, 3, 4, 4, 5];
let uniqueArray = [...new Set(duplicateArray)];
console.log("Remove Duplicates:", uniqueArray);

let shuffleArray = [1, 2, 3, 4, 5];
shuffleArray.sort(() => Math.random() - 0.5);
console.log("Shuffled Array:", shuffleArray);

console.log("\n===== End of JavaScript Program =====");
