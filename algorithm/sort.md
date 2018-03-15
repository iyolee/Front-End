# 排序算法
![排序算法复杂度](http://i.niupic.com/images/2018/03/15/mMfFxl.jpg
)
### 归并排序
该算法是经典的分治策略，它将问题分成一些小的问题然后递归求解，而治的阶段则将分的阶段解得的各个答案修补到一起。分治算法的思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。
``` js
function mergeSortRec(array) {
  const len = array.length;
  if (len === 1) {
    return array;
  }

  const mid = Math.floor(len / 2);
  const left = array.slice(0, mid);
  const right = array.slice(mid);

  return merge(mergeSortRec(left), mergeSortRec(right));
}

function merge(left, right) {
  let lt = 0;
  let rt = 0;
  const result = [];

  while (lt < left.length && rt < right.length) {
    if (left[lt] < right[rt]) {
      result.push(left[lt++]);
    } else {
      result.push(right[rt++]);
    }
  }

  while (lt < left.length) {
    result.push(left[lt++]);
  }

  while (rt < right.length) {
    result.push(right[rt++]);
  }

  return result;
}
```

### 快速排序
1. 首先，从数组中选择中间一项作为主元。
2. 其他数字跟主元比较，比主元小的放在其左边，大的放到其右边
3. 经过一次循环之后，主元左边为小于主元的，右边为大于主元的
4. 将左边和右边的数再递归上面的过程

``` js
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr.splice(pivotIndex, 1)[0];

  const left = [];
  const right = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left).concat([pivot], quickSort(right));
}
```

### 冒泡排序
冒泡排序比较任何两个相邻的项，如果第一个比第二个大，则交换它们。元素项向上移动至正确的顺序，就好像气泡升至表面一样。

``` js
function bubbleSort(arr) {
  const length = arr.length;
  
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
```

### 选择排序
选择排序是一种原址比较排序算法。选择排序大致思路是找到数据结构中最小值并将其放置在第一位，接着找到第二小的值并将其防灾第二位，以此类推。
``` js
function selectionSort(arr) {
  const len = arr.length;
  let indexMin;
  for(let i = 0; i < len - 1; i++) {
    indexMin = i;
    for (let j = i; j < len; j++) {
      if (arr[indexMin] > arr[j]) {
        indexMin = j;
      }
    }
    if (i !== indexMin) {
      [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
    }
  }
  return arr;
}
```

### 插入排序
插入排序每次排一个数组项，以此方式构建最后的排序数组。假定第一项已经排序了，接着，它和第二项进行比较，第二项是应该待在原定位还是插入到第一项之前呢？这样，头两项就已正确排序，接着和第三项比较（它是该插入到第一、第二还是第三位置呢？），以此类推。
``` js
function insertionSort(arr) {
  const len = arr.length;
  let temp;
  let j;
  for (let i = 1; i < len; i++) {
    temp = arr[i];
    j = i;
    while(j > 0 && arr[j - 1] > temp) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = temp;
  }
  return arr;
}
```

### 堆排序
堆排序就是把最大堆堆顶的最大数取出，将剩余的堆继续调整为最大堆，再次将堆顶的最大数取出，这个过程持续到剩余数只有一个时结束。在堆中定义以下几种操作：
- 最大堆调整（Max-Heapify）：将堆的末端子节点作调整，使得子节点永远小于父节点
- 创建最大堆（Build-Max-Heap）：将堆所有数据重新排序，使其成为最大堆
- 堆排序（Heap-Sort）：移除位在第一个数据的根节点，并做最大堆调整的递归运算

``` JavaScript
Array.prototype.heapSort = function () {
  const arr = this.slice(0);
  function swap(i, j) {
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
  }

  function maxHeapify(start, end) {
    let dad = start;
    let son = dad * 2 + 1;
    if (son >= end) {
      return;
    }
    // 先比较两个子节点大小，选择最大的
    if (son + 1 < end && arr[son] < arr[son + 1]) {
      son++;
    }
    // 如果父节点小于子节点时，父子节点相互交换
    // 交换后，子节点继续和孙节点比较
    if (arr[dad] <= arr[son]) {
      swap(dad, son);
      maxHeapify(son, end);
    }
  }

  const len = arr.length;
  // 初始化， i从最后一个父节点开始调整
  for (let i = Math.floor(len / 2) - 1; i > 0; i--) {
    maxHeapify(i, len);
  }
  for (let j = len - 1; j > 0; j--) {
    swap(0, j);
    maxHeapify(0, j);
  }
  return arr;
};
```

### 希尔排序
希尔排序的名称来源于它的发明者Donald Shell，原理：  
> 通过比较相距一定间隔的元素来工作，各趟比较所用的距离随着算法的进行而减小，直到只比较相邻元素的最后一趟排序为止。

由于这个原因，希尔排序有时也叫做缩小增量排序。
``` JavaScript
function shellSort(arr) {
  let increment, i, j, temp;
  for (increment = arr.length >> 1; increment > 0; increment >>= 1) {
    for (i = increment; i < arr.length; i++) {
      temp = arr[i];
      for (j = i - increment; j >= 0; j -= increment) {
        if (arr[j] > temp) {
          arr[j + increment] = arr[j];
          arr[j] = temp;
        } 
      }
    }
  }
  return arr;
}
```
- 已知的最好步长序列是由Sedgewick提出的(1, 5, 19, 41, 109,...)，用这样步长序列的希尔排序比插入排序要快，甚至在小数组中比快速排序和堆排序还快，但是在涉及大量数据时希尔排序还是比快速排序慢。
- 另一个在大数组中表现优异的步长序列是（斐波那契数列除去0和1将剩余的数以黄金分区比的两倍的幂进行运算得到的数列）：(1, 9, 34, 182, 836, 4025, 19001, 90358, 428481, 2034035, 9651787, 45806244, 217378076, 1031612713,…)