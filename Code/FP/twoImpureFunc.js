//HTML结构
/**
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
  <li>7</li>
  <li>8</li>
  <li>9</li>
</ul>
*/

//两个非纯函数
function setColor (el, color) {
  el.style.color = color;
}
  
function setColors (els, color) {
  els.forEach(el => setColor(el, color));
}
  
let items1 = document.querySelectorAll('ul > li:nth-child(2n + 1)');
let items2 = document.querySelectorAll('ul > li:nth-child(3n + 1)');
  
setColors(items2, 'green');
setColors(items1, 'red');