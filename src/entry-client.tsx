/* eslint-disable no-var */
import { startClient } from "rakkasjs/client";


startClient({
  hooks: {
    beforeStart() {
      // Do something before starting the client
    },

    wrapApp(app) {
      return app;
    },

    extendPageContext(pageContext) {
      // if (!pageContext.locals.pb) {
      //   pageContext.locals.pb = new TypedPocketBase<Schema>(
      //     import.meta.env.RAKKAS_PB_URL,
      //   );
      //   pageContext.locals.pb?.authStore.onChange(() => {
      //     pageContext.requestContext?.setCookie?.(
      //       "set-cookie",
      //       pageContext.locals.pb?.authStore.exportToCookie(),
      //     );
      //   });
      // }
    },
  },
});
