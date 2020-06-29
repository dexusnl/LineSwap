$(document).ready(function() {
  $('textarea').keydown(function(e) {
    if (event.ctrlKey) {
      switch (event.keyCode) {
        case 38:
          console.log(getSelectedLine(this, this.selectionStart, 1));
          break;
        case 40:
          console.log(getSelectedLine(this, this.selectionStart, 0));
          break;
      }
    }
  });

  function getSelectedLine(el, position, direction) {
    let ret = "",
      text = el.value;
    let thisStart = text.substring(0, position).lastIndexOf("\n")
    let thisEnd = text.substring(position).indexOf("\n") + position;

    let prevStart = text.substring(0, thisStart).lastIndexOf("\n");
    let nextEnd = text.substring(thisEnd + 1).indexOf("\n") + thisEnd;

    //   if (thisStart === prevStart) {
    //     console.log("Eerste regel.", prevStart, thisStart, position, thisEnd, nextEnd);
    //   } else if (thisEnd > nextEnd) {
    //     console.log("Laatste regel.", prevStart, thisStart, position, thisEnd, nextEnd)
    //   } else {
    //     console.log("swap", prevStart, thisStart, position, thisEnd, nextEnd);
    //   }
    prevStart = prevStart < 0 ? 0 : prevStart;
    if (direction) { // Up
      ret += splitStr(text, 0, prevStart) + "\n|";
      ret += splitStr(text, thisStart, thisEnd) + "\n|";
      ret += splitStr(text, prevStart, thisStart) + "\n|";
      ret += splitStr(text, thisEnd);
    } else { // Down
      if (thisStart < 1) ret += splitStr(text, 0, thisStart) + "\n|";
      ret += splitStr(text, thisEnd, nextEnd) + "\n|";
      ret += splitStr(text, thisStart, thisEnd) + "\n|";
      ret += splitStr(text, nextEnd+1);
    }
		console.log((direction?"Up":"Down"), prevStart, thisStart, position, thisEnd, nextEnd);
    console.log(ret);
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
