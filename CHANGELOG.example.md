# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## 0.1.0 (2023-06-20)


### Features

* buying nft with native tokens(Matic) ([306a415](https://gitlab.com/arenavs/frontend/commit/306a4154b59b046d6638f801a12e89a948b22192))
* listing nft with native tokens(Matic)
* bid with native tokens(Matic)

### Fixes

* ethers/provider throwing ts error about use of "<"
* getServerSideProps functions not redirecting to /500 if no data was recieved

### Progress

* **markup:** buy with native modal
* **web3:** buy with native token function
* **web3:** bid with native token function
* **web3:** listing with native token function
* **utility:** HOF for wrapping modals in Promise

### Chores
* downgraded nextjs version
* added missing env-wraps for pages and effects