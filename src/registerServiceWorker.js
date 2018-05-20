let registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./sw.js')
      .then(function(registration) {
        console.log(
          'Hooray. Registration successful, scope is:',
          registration.scope
        );
      })
      .catch(function(error) {
        console.log(
          'Whoops. Service worker registration failed, error:',
          error
        );
      });
  }
};

export default registerServiceWorker;
