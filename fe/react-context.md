# 如何理解 Context 的工作原理

## 关键过程
### 创建（定义）
- React.createContext
  - MyContext.Provider
  - MyContext.Consumer
### 生产（传递）
- MyContext.Provider
### 消费（接收、使用）
- MyContext.Consumer
- useContext
- static contextType = context;


## 源码视角看核心流程（运行时）
> React版本为16.9.0，简化后分为3步：定义 → 生产 → 消费


### 执行 React.createContext 后发生了什么
1. 从当前运行环境中找到 `React` 的实例
2. 调用 `React` 上面挂载的 createContext 函数
3. 返回一个 Object ( context )
```js
  const context: ReactContext<T> = {
    $$typeof: REACT_CONTEXT_TYPE,
    _currentValue: defaultValue,
    Provider: (null: any),
    Consumer: (null: any),
    // ...
  };

  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context, // 重要，后面会再次使用到
  };

  context.Consumer = context;

  return context;
```
4. 实际导出的是一个机构化的 `ReactContext` 对象


### 当外层组件使用 `<MyContext.Provider value={……}/>`, 编译+运行时发生了什么
> 可以是卡片的高阶组件 HOC，也可以页面级的 App.js

1. babel 编译的时候，`plugin-transform-react-jsx` 识别到 <MyContext.Provider value={……}/> 组件标识，会转换成：
```js
React.createElement(
  MyContext.Provider,          // type 参数
  { value: "……" },          // props，其中 children 会在后面被处理
  React.createElement(Child, null)
);
```
2. React 渲染到此节点时，基于 `React.createElement` 的原始实现
```js
export function createElement(type, config, children) {
    // …… 
    // 一些前置处理
    return ReactElement(
        type,
        key,
        ref,
        self,
        source,
        ReactCurrentOwner.current,
        props,
    );
}
```
3. 赋予新的 `$$typeof`
```js
const ReactElement = function(type, key, ref, self, source, owner, props) {
  const element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE, // Symbol.for('react.element')

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner,
  };

  return element;
};
```
4. React 渲染阶段，开始 reconcile 整棵 Fiber 树时，遇到了 <MyContext.Provider value={newValue} >

- beginWork(初次)
```js
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderExpirationTime: ExpirationTime,
): Fiber | null {
    // ...
    switch (workInProgress.tag) {
        // ... 其他处理
        case ContextProvider: {
          const newValue = workInProgress.memoizedProps.value;
          pushProvider(workInProgress, newValue);
          break;
        }
    }
}
```
- pushProvider
```js
export function pushProvider<T>(providerFiber: Fiber, nextValue: T): void {
    //
    const context: ReactContext<T> = providerFiber.type._context;
    //
    context._currentValue = nextValue;
}
```

- beginWork(context 上面的 value 发生变化)
```js
function beginWork(
  current: Fiber | null,
  workInProgress: Fiber,
  renderExpirationTime: ExpirationTime,
): Fiber | null {
    // ...
    switch (workInProgress.tag) {
        // ... 其他处理
        case ContextProvider:
            return updateContextProvider(
                current,
                workInProgress,
                renderExpirationTime,
            );
    }
}
```

5. 实际上新的 value 还是挂载到了原始的 context 对象上
```js
// 定义
context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context, // 重要，后面会再次使用到
};
// 设置
providerFiber.type._context._currentValue = nextValue;
```

### 当子组件使用 `useContext()` 时，发生了什么
1. 执行 useContext 函数，返回一个值
```js
export function useContext<T>(
  Context: ReactContext<T>,
  unstable_observedBits: number | boolean | void,
) {
  const dispatcher = ReactCurrentDispatcher.current;
  // ... DEV code
  return dispatcher.useContext(Context, unstable_observedBits);
}
```
2. 不同阶段的 Dispatcher 中，useContext 均指向 readContext
```js
const HooksDispatcherOnMount: Dispatcher = {
  readContext,

  useCallback: mountCallback,
  useContext: readContext,
  // ...
};
```
3. readContext 实际做的工作非常轻量，把传入对象的 `_currentValue` 属性取出并返回
```js
export function readContext<T>(
  context: ReactContext<T>,
  observedBits: void | number | boolean,
): T {
  // ...
  // 针对可选参数 observedBits 的一些处理
  // 取值
  return isPrimaryRenderer ? context._currentValue : context._currentValue2;
}
```

## 问题分析
### 当子组件无法获取到更新后的值，可能的问题是什么？
1. Context 中的 Consumer、Provider 被篡改/复写了
   - 极少发生：常规代码，两种用法：初始定义、组件中使用
  
2. 生产方 Context.Provider 和消费方 Context.Consumer (useContext(Context)) 对应的 Context 不是同一个

- 两份拷贝：引用 context.js 时因为依赖了不同，导致同一份 createContext 分别打包进了 chunk-a.js 和 chunk-b.js 中
- createContext 和 useContext 的 React 不是同一个


## 补充阅读（编译期发生了什么）

### React.createContext
1. 找到 `import React from 'react'` 的 'react' 模块
- 如果进行了 external 配置，则这里会编译成类似：`const react_js = _externals_module; const React = react_js.default`
- 如果没有进行 external 配置，则会将整个 React 源码引入 `{source_code, exports.React=function() {}}; const React = module_name.React`