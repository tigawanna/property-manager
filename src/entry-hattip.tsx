import { createRequestHandler } from "rakkasjs/server";
import { cookie } from "@hattip/cookie";

export default createRequestHandler({
  middleware: {
    beforePages: [],
    beforeApiRoutes: [],
    beforeNotFound: [],
    beforeAll: [cookie()],
  },

  createPageHooks(requestContext) {
    return {
      emitBeforeSsrChunk() {
        return "";
      },

      async extendPageContext(pageContext) {},

      wrapApp(app) {
        return app;
      },
    };
  },
});
