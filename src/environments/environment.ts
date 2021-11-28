// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  useEmulators: true,
  appVerificationDisabledForTesting: true,
  firebaseConfig: {
    apiKey: "AIzaSyAXIaX1Y2g_jnIrvrewlVvmhR4iwpejxEc",
    authDomain: "turma-de-elite-app.firebaseapp.com",
    projectId: "turma-de-elite-app",
    storageBucket: "turma-de-elite-app.appspot.com",
    messagingSenderId: "880821018652",
    appId: "1:880821018652:web:385c61e521cd29494affd9",
    measurementId: "G-MC15TED66F"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
