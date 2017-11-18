# 深入浅出理解Redux
### Redux是什么
> Redux 是 JavaScript 状态容器，提供可预测化的状态管理。
  
它认为：Web应用是一个状态机，视图与状态一一对应。从架构层面来说，通常希望UI跟数据、逻辑分离，直观体现就是：**UI = render(state)**

### 为什么要用Redux
  现在的Web应用涉及大量数据交互、异步操作等，无疑都在增加前端的复杂性，需要维护的state也越来越多。而Redux就是试图让每个state变化都是可预测，将应用中所有的action与state统一管理。

### Redux的三原则
  - **单一数据源**
    整个应用state应该只存储在唯一一个的Store中。
  - **保持状态只是只读**
    不能直接修改state，唯一能改变Store的state方法就是通过触发一个action对象完成。
  - **数据改变通过纯函数完成**
    action改变state需要通过reducers。

### Redux工作流程
  在讲Redux的工作流程之前，需了解几个Redux相关的核心概念：
  - Action：Action可以看成是应用发出的通知，表示State应该要发生变化了，Action的触发可能是用户对View层的操作也可能是服务器的响应。
  - Action Creator：如果有很多种Action，而每种Action都手写的话显得麻烦，所以用定义的Action Creator函数来生成Action。
  - Dispatch：Action发出的唯一方法。
  - Store：整个应用唯一保存数据的地方。
  - State：对Store中保存数据生成某个时点数据快照，该数据集合叫做State。
  - Reducer：Action只是描述了State应要发生变化，而Reducer做的是如何改变State。

  具体工作流程：
  用户通过View（或服务器响应）触发Action，Dispatch方法将Action Creator函数生成的Action派发到Store，Store自动调用Reducer，并向它传入当前State和Action，Reducer返回新的State，State一旦有变化，Store就会通过监听函数来更新View。
  借用一张图来描述这一过程：
  ![image](http://i.niupic.com/images/2017/09/29/YSaDHU.png)
  
  **严格的单向数据流是 Redux 架构的设计核心。**

### 几个Redux核心概念实例
  以从服务器响应文章内容为例
  Action
  ```JavaScript
  const LOAD_ARTICLES_DETAIL = 'LOAD_ARTICLES_DETAIL'
  const LOAD_ARTICLES_DETAIL_SUCCESS = 'LOAD_ARTICLES_DETAIL_SUCCESS'
  const LOAD_ARTICLES_DETAIL_ERROR = 'LOAD_ARTICLES_DETAIL_ERROR'
  ```
  Action Creator
  ```JavaScript
  export const loadArticlesDetail = () => ({
    type: LOAD_ARTICLES_DETAIL
  })
  export const loadArticlesDetailSuccess = result => ({
    type: LOAD_ARTICLES_DETAIL_SUCCESS,
    result
  })
  export const loadArticlesDetailFailure = error => ({
    type: LOAD_ARTICLES_DETAIL_ERROR,
    error
  })
  ```
  Store
  ``` JavaScript
  const store = createStore(reducers)
  ```
  Reducer
  (previousState, action) => (newState)
  ``` JavaScript
  export default (state = initalState, action) => {
  switch (action.type) {
  case LOAD_ARTICLES_DETAIL: {
    return {
      ...state,
      loading: true,
      error: false
    }
  }
  case LOAD_ARTICLES_DETAIL_SUCCESS: {
    return {
      ...state,
      loading: false,
      error: false,
      articlesDetail: action.result
    }
  }
  case LOAD_ARTICLES_DETAIL_ERROR: {
    return {
      ...state,
      loading: false,
      error: true
    }
  }
  default:
    return state
  }
 }

  ```
### 深入到Redux的源码
  Redux主要源码整体结构：
  ![image](http://i.niupic.com/images/2017/09/30/BTZ7ie.png)

  - 入口文件 index.js
```JavaScript
export {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
  compose
}
```
  这是入口文件导出的方法，也是Redux支持的方法，这些方法的实现在主工作流程文件和辅助函数文件，接下来看主工作流程。
  - 主工作流程文件 createStore.js
    createStore方法主要是生成Store，看看它做了哪些事儿：
    - getState方法返回了当前State
    - subscribe方法传入函数到监听队列和返回取消订阅函数
    - dispatch方法调用Reducer，按顺序执行listener，返回Action
  辅助源码文件：
  - applyMiddleware.js：用于增强Store
  ``` JavaScript
  export default function applyMiddleware(...middlewares) {
    return (createStore) => (reducer, preloadedState, enhancer) => {
      const store = createStore(reducer, preloadedState, enhancer)
      let dispatch = store.dispatch
      let chain = []

      const middlewareAPI = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args)
      }
      chain = middlewares.map(middleware => middleware(middlewareAPI))
      dispatch = compose(...chain)(store.dispatch)

      return {
        ...store,
        dispatch
      }
    }
  }
  ```
  从源码上看，最后是返回了一个Store和一个被更新过的dispatch方法，实现了对Store的增强。
  - bindActionCreators.js：
   ``` JavaScript
   export default function bindActionCreators(actionCreators, dispatch) {
     if (typeof actionCreators === 'function') {
       return bindActionCreator(actionCreators, dispatch)
     }
   }
   ```
   使用dispatch把action creator都包装起来，这样可以直接调用它们。
  - combineReducers.js：当应用比较大的时而拆分Reducer，但是传入Store的Reducer必须是一个函数，所以这个方法的主要功能是用来合并多个Reducer。
  - compose.js
    ``` JavaScript
    export default function compose(...funcs) {
      if (funcs.length === 0) {
        return arg => arg
      }

      if (funcs.length === 1) {
        return funcs[0]
      }

      return funcs.reduce((a, b) => (...args) => a(b(...args)))
    }
    ```
    compose这个方法，传入的一系列函数，执行的最终结果是把各个函数串联起来。
****
### 总结：
- Redux 是 JavaScript 状态容器，提供可预测化的状态管理。
- 严格的单向数据流是 Redux 架构的设计核心。
- UI = render(state)
