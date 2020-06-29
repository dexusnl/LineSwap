$(document).ready(function() {
	$('textarea').keydown(function(e) {
		if (event.ctrlKey) {
			switch (event.keyCode) {
				case 38:
					return swapLine(this, 1);
					break;
				case 40:
					return swapLine(this, 0);
					break;
			}
		}
	});

	function swapLine(el, direction) {
		let newRange;
		let position = el.selectionStart;
		let oldRangeSize = el.selectionEnd - position;
		let ret = "", text = el.value;

		let thisStart = text.substring(0, position).lastIndexOf("\n")
		let thisEnd = text.substring(position).indexOf("\n") + position;

		let prevStart = text.substring(0, thisStart).lastIndexOf("\n");
		let nextEnd = text.substring(thisEnd + 1).indexOf("\n") + thisEnd + 1;

		thisEnd = thisEnd < position ? text.length : thisEnd;
		nextEnd = nextEnd <= thisEnd ? text.length : nextEnd;
		thisStart = thisStart < 0 ? 0 : thisStart;
		prevStart = prevStart < 0 ? 0 : prevStart;

		if (direction) { // Up
			if (thisStart === prevStart) {
				console.log("Eerste regel.", prevStart, thisStart, position, thisEnd, nextEnd, text.length);
				return true;
			} else {
				if (prevStart > 0) ret += splitStr(text, 0, prevStart) + "\n"; else position--;
				ret += splitStr(text, thisStart, thisEnd);
				ret += "\n" + splitStr(text, prevStart, thisStart);
				if (thisEnd != text.length) ret += "\n" + splitStr(text, thisEnd);
				newRange = position - thisStart + prevStart;
			}
		} else { // Down
			if (thisEnd === nextEnd) {
				console.log("Laatste regel.", prevStart, thisStart, position, thisEnd, nextEnd, text.length)
				return true;
			} else {
				if (thisStart > 0) ret += splitStr(text, 0, thisStart) + "\n"; else position++;
				ret += splitStr(text, thisEnd, nextEnd);
				ret += "\n" + splitStr(text, thisStart, thisEnd);
				if (nextEnd != text.length) ret += "\n" + splitStr(text, nextEnd);
				newRange = position - thisStart + thisEnd;
			}
		}
		el.value = ret;
		el.focus();
		el.selectionStart = newRange;
		el.selectionEnd = newRange + oldRangeSize;
		return false;
	}

	function splitStr(text, start, end) {
		let regex = new RegExp('^\n+|\n+$', 'g'),
			ret;
		if (end) {
			ret = text.substring(start, end);
		} else {
			ret = text.substring(start);
		}
		return ret.replace(regex, '');
	}
});
