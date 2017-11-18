// log出五个5
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}

// 将上面的修改成log出0 1 2 3 4
// 使用三种不同方法供参考

// 方法一
for (var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(() => {
      console.log(i);
    }, 0);
  })(i);
}

// 方法二
for (var i = 0; i < 5; i++) {
  let j = i;
  setTimeout(() => {
    console.log(j);
  }, 0);
}

// 方法三
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}