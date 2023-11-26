git pull

git add .
git commit
git push

yarn start

S3hosting
yarn build
./build => S3


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
flex justify-start items-center

## 左メニューから用語を選択
EditTerm > select()
-> EditState > edittingTerms
TermSaveButton > saveTerms()
  edittingTerms -> db

Term Editor を開く
-> Tag に紐づく Terms を db から取得




npm install react-markdown

QuizEditor
QuizSelectTab
QSearchQuery
TagSelectPanel

QuizEditor
  QuizSelectTab
    QuizSelectFrame
      QuizListFrame
    QSearchQuery
      TagSelectPanel

EditQuestion

TermDescription⇒EditBlockContent
            editElemsState.map((editElem, index) => (
              <EditBlockContent

              {tags
                .filter((tag) => {
                  return filter(tag)
                })
                .map((tag) => (


TermEditFrame
EditTerms



term.changed
'new'   EditTerm
        TermAddButton
'update'  useTerm.enter
'delete'  useTerm.remove
null    useMutateTerms.save
