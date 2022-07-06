```
# gcloudの認証・ログイン
$ gcloud auth login

# 利用するprojectのセット
$ gcloud config set project cloudquizapp-355114

# 設定を確認
$ gcloud config list
```
### Dockerリポジトリを作成
```
gcloud artifacts repositories create docker-ropo --repository-format=docker --location=asia-northeast1 --description="Docker repository"
```
### gcloud 認証ヘルパー（推奨）
可能であれば、この方法を使用することを強くおすすめします。
この方法では、プロジェクト リソースに安全で短期間のアクセス権が付与されます。

$ gcloud auth configure-docker asia-northeast1-docker.pkg.dev
Adding credentials for: asia-northeast1-docker.pkg.dev
After update, the following will be written to your Docker config file located at [/Users/zskysy/.docker/config.json]:
 {
  "credHelpers": {
    "asia-northeast1-docker.pkg.dev": "gcloud"
  }
}

Do you want to continue (Y/n)?  Y

Docker configuration file updated.

これによりDocker構成が更新されます。Google CloudプロジェクトのArtifact Registryに接続して、イメージのpushとpullができるようになります。

$ gcloud auth configure-docker us-central1-docker.pkg.dev,asia-northeast1-docker.pkg.dev
WARNING: Your config file at [/Users/zskysy/.docker/config.json] contains these credential helper entries:

{
  "credHelpers": {
    "asia-northeast1-docker.pkg.dev": "gcloud"
  }
}
Adding credentials for: us-central1-docker.pkg.dev,asia-northeast1-docker.pkg.dev
After update, the following will be written to your Docker config file located at [/Users/zskysy/.docker/config.json]:
 {
  "credHelpers": {
    "asia-northeast1-docker.pkg.dev": "gcloud",
    "us-central1-docker.pkg.dev": "gcloud"
  }
}

Do you want to continue (Y/n)?  Y

Docker configuration file updated.
(base) MacBook:Downloads zskysy$ docker pull us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0
1.0: Pulling from google-samples/containers/gke/hello-app
59bf1c3509f3: Pull complete 
da75187f77d8: Pull complete 
Digest: sha256:88b205d7995332e10e836514fbfd59ecaf8976fc15060cd66e85cdcebe7fb356
Status: Downloaded newer image for us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0
us-docker.pkg.dev/google-samples/containers/gke/hello-app:1.0


## Dokernize
```
FROM node:current-alpine3.16 AS builder

WORKDIR /usr/local/app

COPY . .

RUN yarn --frozen-lockfile && yarn build

FROM nginx:1.20-alpine

COPY --from=builder /usr/local/app/build /usr/share/nginx/html

CMD [ "nginx", "-g", "daemon off;" ]
```

#### イメージのビルド
```
docker build --tag zskysy/cloud-quiz-app:latest --no-cache .
```

#### 生成されたイメージを確認
```
docker images --filter "dangling=false" --format "table {{ .Repository }}:{{ .Tag }} {{ .Size }}" | head -n 2

REPOSITORY:TAG SIZE
zskysy/cloud-quiz-app:latest 27.4MB
```
#### イメージからコンテナを起動
```
docker run --name cloud-quiz-app --rm --publish 3000:80 zskysy/cloud-quiz-app:latest
```
`localhost:3000 `を開く

 ^C でターミナルのプロセスを終了

#### Dockerイメージにリポジトリ名をタグ付け
```
docker tag zskysy/cloud-quiz-app:latest asia-northeast1-docker.pkg.dev/cloudquizapp-355114/docker-repo/cloud-quiz-app:tag1

# イメージ・タグ付けを確認
docker images
```
#### イメージをArtifact Registryにpushする
```
docker push asia-northeast1-docker.pkg.dev/cloudquizapp-355114/docker-repo/cloud-quiz-app:tag1
```

