function batch (fn) {
  return function(items, ...args){
    if(items.length && items.length >= 0){
      return Array.from(items).map(item => fn.apply(this, [item, ...args]));
    }else{
      return fn.apply(this, [items, ...args]);
    }
  }
}