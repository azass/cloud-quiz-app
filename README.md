This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## Cognito

[Amazon Cognitoの認証情報を取得してみる～API Gateway＋Lambda編～](https://www.tdi.co.jp/miso/amazon-cognito-api-gateway)
[cognitoでログイン/セッション管理](https://tarepan.hatenablog.com/entry/cognito_UserPools_session_management)
[サインイン後に ID プールを使用して AWS サービスへアクセスする](https://docs.aws.amazon.com/ja_jp/cognito/latest/developerguide/amazon-cognito-integrating-user-pools-with-identity-pools.html)

## タブ選択
````
const dispatch = useAppDispatch()
...
dispatch(setTab(tabs[1]))
````
## 横一列
flex justify-start

## 左メニューから用語を選択
EditTerm > select()
-> EditState > edittingTerms
TermSaveButton > saveTerms()
  edittingTerms -> db

Term Editor を開く
-> Tag に紐づく Terms を db から取得


npm install react-markdown