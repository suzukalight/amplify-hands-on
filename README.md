## 概要
このレポジトリーはAWS Amplifyで爆速開発をするためのハンズオンです。
基本的なServerlessバックエンドの構築からGraphQLのAPIに接続するところまでやります。

## 順序
- AWS アカウント設定 (IAM)
- `git clone https://github.com/so99ynoodles/amplify-hands-on.git`
- `npm i -g @aws-amplify/cli` or `yarn add global @aws-amplify/cli`
- `amplify init`
- `amplify push`
- App Sync コンソールでGraphQL Mutation
- Amplify.configure
- API.graphql
- Type

## 次やるなら
- S3 Storage
- Authentication: Scratch or `aws-amplify-react` 
- Cognito User Poolを使ったロール設定（Authority)
