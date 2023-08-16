## Description

학교 소식을 전달하고 받아보는 '학교소식 뉴스피드' 를 위한 백엔드 구현

## Spec

- nestjs, graphql, typescript
- mysql, typeorm
- class-validator, class-transformer, ts-jenum, dayjs

## [필독] 사전 조건
- [필수 구현 및 추가 구현] 에 집중하기 위해 학교 관리자 / 학생에 대한 CRUD는 구현하지 않음.
- 학생에 대한 릴레이션은 존재하지 않기 때문에 구독을 하기 위한 학생 ID는 임의로 작성.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```