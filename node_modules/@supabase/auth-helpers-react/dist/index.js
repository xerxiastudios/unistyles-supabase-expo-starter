"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.tsx
var src_exports = {};
__export(src_exports, {
  SessionContextProvider: () => SessionContextProvider,
  useSession: () => useSession,
  useSessionContext: () => useSessionContext,
  useSupabaseClient: () => useSupabaseClient,
  useUser: () => useUser
});
module.exports = __toCommonJS(src_exports);

// src/components/SessionContext.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var SessionContext = (0, import_react.createContext)({
  isLoading: true,
  session: null,
  error: null,
  supabaseClient: {}
});
var SessionContextProvider = ({
  supabaseClient,
  initialSession = null,
  children
}) => {
  const [session, setSession] = (0, import_react.useState)(initialSession);
  const [isLoading, setIsLoading] = (0, import_react.useState)(!initialSession);
  const [error, setError] = (0, import_react.useState)();
  (0, import_react.useEffect)(() => {
    if (!session && initialSession) {
      setSession(initialSession);
    }
  }, [session, initialSession]);
  (0, import_react.useEffect)(() => {
    let mounted = true;
    function getSession() {
      return __async(this, null, function* () {
        const {
          data: { session: session2 },
          error: error2
        } = yield supabaseClient.auth.getSession();
        if (mounted) {
          if (error2) {
            setError(error2);
            setIsLoading(false);
            return;
          }
          setSession(session2);
          setIsLoading(false);
        }
      });
    }
    getSession();
    return () => {
      mounted = false;
    };
  }, []);
  (0, import_react.useEffect)(() => {
    const {
      data: { subscription }
    } = supabaseClient.auth.onAuthStateChange((event, session2) => {
      if (session2 && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "USER_UPDATED")) {
        setSession(session2);
      }
      if (event === "SIGNED_OUT") {
        setSession(null);
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  const value = (0, import_react.useMemo)(() => {
    if (isLoading) {
      return {
        isLoading: true,
        session: null,
        error: null,
        supabaseClient
      };
    }
    if (error) {
      return {
        isLoading: false,
        session: null,
        error,
        supabaseClient
      };
    }
    return {
      isLoading: false,
      session,
      error: null,
      supabaseClient
    };
  }, [isLoading, session, error]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SessionContext.Provider, { value, children });
};
var useSessionContext = () => {
  const context = (0, import_react.useContext)(SessionContext);
  if (context === void 0) {
    throw new Error(`useSessionContext must be used within a SessionContextProvider.`);
  }
  return context;
};
function useSupabaseClient() {
  const context = (0, import_react.useContext)(SessionContext);
  if (context === void 0) {
    throw new Error(`useSupabaseClient must be used within a SessionContextProvider.`);
  }
  return context.supabaseClient;
}
var useSession = () => {
  const context = (0, import_react.useContext)(SessionContext);
  if (context === void 0) {
    throw new Error(`useSession must be used within a SessionContextProvider.`);
  }
  return context.session;
};
var useUser = () => {
  var _a, _b;
  const context = (0, import_react.useContext)(SessionContext);
  if (context === void 0) {
    throw new Error(`useUser must be used within a SessionContextProvider.`);
  }
  return (_b = (_a = context.session) == null ? void 0 : _a.user) != null ? _b : null;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SessionContextProvider,
  useSession,
  useSessionContext,
  useSupabaseClient,
  useUser
});
//# sourceMappingURL=index.js.map