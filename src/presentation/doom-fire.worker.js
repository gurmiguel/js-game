

self?.addEventListener?.('message', e => {
  const {uid, state} = e.data;

  calculateFirePropagation(state);

  self.postMessage({ uid, state });
});
