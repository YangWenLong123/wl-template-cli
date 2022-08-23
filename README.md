# wl-template-cli

## Description

  基于vue2.6的项目模版，方便项目快速的接入，已配置下面功能

- axios请求封装
- api全局挂载
- 全局组件自动挂载
- 单点登录封装(需要按需调整)
- 环境变量配置
- 代码格式配置
- 全局过滤器
- 全局方法
- 状态管理
- 路由配置
- 静态文件配置
- ant-design-vue UI组件库配置
- 打包配置
- ...

进入页面后，在url后拼接参数?code=param,可模拟公共平台进入。 resource.js配置了测试参数，router文件中配置了测试路由，可根据实际情况进行调整...

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build:test
npm run build:uat
npm run build:prod
```

### Run your unit tests

```
npm run test:unit
```

### Lints and fixes files

```
npm run lint
```

### prettier and fixes files

```
npm run prettier
```

### changelog and fixes files

```
npm run changelog
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
