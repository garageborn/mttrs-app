const makeCancelable = (promise) => {
  let hasCanceled = false

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then((val) =>
      hasCanceled ? reject({canceled: true}) : resolve(val)
    )
    promise.catch((error) =>
      hasCanceled ? reject({canceled: true}) : reject(error)
    )
  })

  return {
    promise: wrappedPromise,
    cancel () { hasCanceled = true },
    get canceled () { return hasCanceled }
  }
}

export default makeCancelable
