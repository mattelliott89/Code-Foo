var TOTAL_DIGITS = 10, TOTAL_CHARS = 26;
var numDigits = 0, numChars = 0, numPlates = 0;

function platesByPop (){
	var pop = document.getElementById('popForm').value;
	var strDigits = "";
	var strChars = "";
	if (pop == 0){
		numDigits = 0, numChars = 0, numPlates = 0;
	}
	else{
		findPattern(pop);
	}
	document.getElementById('patternForm').value = patternOutput(); 
	document.getElementById('excessForm').value = numPlates - pop;
	document.getElementById('plateForm').value = numPlates;
}

function findPattern(pop){
	var numSlots = 1;
	var passed = -1;
	while(passed === -1){
		for(numDigits = numSlots; numDigits >= 0; numDigits--){
			numChars = numSlots - numDigits;
			numPlates = Math.pow(TOTAL_DIGITS, numDigits) * Math.pow(TOTAL_CHARS, numChars);
			if(pop <= numPlates){
				passed = numPlates;
				return 0;
			}		
		}
		passed = -1;
		numSlots++;
	}
}

function patternOutput(){
	var strDigits = "", strChars = "";
	if (numDigits >= 1 && numChars >= 1){
		strDigits = numDigits + " Digits, ";
		strChars = numChars + " Chars";
	}
	else if (numDigits >= 1){
		strDigits = numDigits + " Digits";
	}
	else if (numChars >= 1) {
		strChars = numChars + " Chars";
	}
	if (numDigits == 1 && numChars == 1){
		strDigits = numDigits + " Digit, ";
		strChars = numChars + " Char";
	}
	else if (numDigits == 1 && numChars != 0){
		strDigits = numDigits + " Digit, ";
	}
	else if (numDigits == 1)
	{
		strDigits = numDigits + " Digit";
	}
	else if (numChars == 1) {
		strChars = numChars + " Char";
	}
	if (numDigits == 0 && numChars == 0){
		strDigits = "none";
		strChars = "";
	}
	return strDigits + strChars;
}

function isNumber(key){
	var charCode = (key.which) ? key.which : event.keyCode
	if (charCode > 31 && (charCode < 48 || charCode > 57)){
		return false;
		}
	return true;
}