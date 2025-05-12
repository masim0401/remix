import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json, redirect } from "@remix-run/node";
import { RemixServer, NavLink, useMatches, Link, Meta, Links, Outlet, Scripts, useLoaderData, useActionData, useNavigation, Form } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import cn from "classnames";
import { Fragment } from "react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Sidebar() {
  const baseStyle = "w-full px-4 py-2 rounded-xl transition-colors duration-200";
  const activeStyle = "bg-blue-800";
  const inactiveStyle = "bg-blue-500 hover:bg-blue-600";
  return /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-2 h-full", children: [
    /* @__PURE__ */ jsx("span", { className: "font-extrabold text-3xl pb-3 text-center text-blue-900", children: "Remix" }),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        className: ({ isActive }) => cn(baseStyle, isActive ? activeStyle : inactiveStyle),
        to: "/",
        children: "Dashboard"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        className: ({ isActive }) => cn(baseStyle, isActive ? activeStyle : inactiveStyle),
        to: "/users",
        children: "Users"
      }
    )
  ] });
}
const Breadcrumbs = ({ ...props }) => {
  const matches = useMatches().filter(
    ({ handle: handle2 }) => handle2 == null ? void 0 : handle2.breadcrumb
  );
  return /* @__PURE__ */ jsx(
    "ol",
    {
      itemScope: true,
      itemType: "https://schema.org/BreadcrumbList",
      className: "flex flex-wrap items-center gap-2.5 pt-0 pb-1 mb-5 border-b-2 border-b-blue-900 ",
      ...props,
      children: matches.map(({ handle: handle2, data, pathname }, i) => {
        const isLast = i === matches.length - 1;
        const content = handle2.breadcrumb(data);
        return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
          "li",
          {
            className: "contents",
            itemProp: "itemListElement",
            itemScope: true,
            itemType: "https://schema.org/ListItem",
            children: [
              i > 0 && /* @__PURE__ */ jsx("span", { className: "text-sm", children: "/" }),
              isLast ? /* @__PURE__ */ jsx("span", { itemProp: "name", className: "text-gray-800", children: content }) : /* @__PURE__ */ jsx(Link, { to: pathname, itemProp: "item", children: content }),
              /* @__PURE__ */ jsx("meta", { itemProp: "position", content: `${i + 1}` })
            ]
          }
        ) }, i);
      })
    }
  );
};
const BreadcrumbsItem = ({ children }) => {
  return /* @__PURE__ */ jsx("span", { itemProp: "name", children });
};
const handle$4 = {
  breadcrumb: () => /* @__PURE__ */ jsx(BreadcrumbsItem, { children: "Dashboard" })
};
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function App() {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx("div", { className: "h-screen p-2", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-2 h-full", children: [
        /* @__PURE__ */ jsx("div", { className: "max-h-full bg-blue-300 rounded-2xl overflow-y-auto w-40 p-1 pt-3", children: /* @__PURE__ */ jsx(Sidebar, {}) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-400 h-full rounded-2xl w-full p-4 overflow-y-auto", children: [
          /* @__PURE__ */ jsx(Breadcrumbs, {}),
          /* @__PURE__ */ jsx(Outlet, {})
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  handle: handle$4,
  links
}, Symbol.toStringTag, { value: "Module" }));
const handle$3 = {
  breadcrumb: ({ params }) => /* @__PURE__ */ jsx(BreadcrumbsItem, { children: "Detailed" })
};
async function loader$3({ params }) {
  console.log("Fetching user with ID:", params.id);
  const res = await fetch(`https://654ba4a15b38a59f28ef7233.mockapi.io/api/v1/users/${params.id}`);
  const user = await res.json();
  if (!res.ok || !(user == null ? void 0 : user.id)) {
    console.error("API error:", res.status, res.statusText);
    throw new Response("User not found", { status: 404 });
  }
  console.log("User data:", user);
  return json(user);
}
function UserDetails() {
  const user = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { className: "p-6 bg-white rounded-lg shadow-md max-w-md", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-xl font-semibold text-gray-800 mb-4", children: [
      "User #",
      user.id
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-600 w-24", children: "Name:" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-800", children: user.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-600 w-24", children: "Email:" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-800", children: user.email })
      ] })
    ] })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UserDetails,
  handle: handle$3,
  loader: loader$3
}, Symbol.toStringTag, { value: "Module" }));
const handle$2 = {
  breadcrumb: ({ params }) => /* @__PURE__ */ jsx(BreadcrumbsItem, { children: "Edit" })
};
async function loader$2({ params }) {
  console.log("Fetching user with ID:", params.id);
  const res = await fetch(`https://654ba4a15b38a59f28ef7233.mockapi.io/api/v1/users/${params.id}`);
  const user = await res.json();
  if (!res.ok || !(user == null ? void 0 : user.id)) {
    console.error("API error:", res.status, res.statusText);
    throw new Response("User not found", { status: 404 });
  }
  console.log("User data:", user);
  return json(user);
}
async function action$1({ request, params }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  if (!name || name.length < 2) {
    return json({ error: "Name must be at least 2 characters long" }, { status: 400 });
  }
  if (!email || !email.includes("@")) {
    return json({ error: "Invalid email address" }, { status: 400 });
  }
  const res = await fetch(`https://654ba4a15b38a59f28ef7233.mockapi.io/api/v1/users/${params.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email })
  });
  if (!res.ok) {
    console.error("API error:", res.status, res.statusText);
    return json({ error: "Failed to update user" }, { status: 500 });
  }
  return json({ success: "User updated successfully" });
}
function UserEdit() {
  const user = useLoaderData();
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-lg font-semibold mb-4", children: [
      "Edit User #",
      user.id
    ] }),
    /* @__PURE__ */ jsxs(Form, { method: "post", className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-sm font-medium", children: "Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "name",
            name: "name",
            defaultValue: user.name,
            className: "mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
            minLength: 2
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium", children: "Email" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            id: "email",
            name: "email",
            defaultValue: user.email,
            className: "mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          }
        )
      ] }),
      actionData && "error" in actionData && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: actionData.error }),
      actionData && "success" in actionData && /* @__PURE__ */ jsx("p", { className: "text-green-500 text-sm", children: actionData.success }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: isSubmitting,
          className: `w-full py-2 px-4 rounded-md text-white ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`,
          children: isSubmitting ? "Saving..." : "Save"
        }
      )
    ] })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action: action$1,
  default: UserEdit,
  handle: handle$2,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
async function loader$1() {
  const res = await fetch("https://654ba4a15b38a59f28ef7233.mockapi.io/api/v1/users");
  if (!res.ok) throw new Response("Failed to fetch users", { status: 500 });
  return await res.json();
}
function UsersList() {
  const users = useLoaderData();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-5 items-center mb-4", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold", children: "Users" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 w-fit",
          children: /* @__PURE__ */ jsx(Link, { to: "/users/add", children: "Add user" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("table", { className: "w-full table-auto border border-gray-300", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-gray-400", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "border px-4 py-2 text-left", children: "ID" }),
        /* @__PURE__ */ jsx("th", { className: "border px-4 py-2 text-left", children: "Name" }),
        /* @__PURE__ */ jsx("th", { className: "border px-4 py-2 text-left", children: "Email" }),
        /* @__PURE__ */ jsx("th", { className: "border px-4 py-2 text-left", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: users.map((user) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-400", children: [
        /* @__PURE__ */ jsx("td", { className: "border px-4 py-2", children: user.id }),
        /* @__PURE__ */ jsx("td", { className: "border px-4 py-2", children: user.name }),
        /* @__PURE__ */ jsx("td", { className: "border px-4 py-2", children: user.email }),
        /* @__PURE__ */ jsx("td", { className: "border px-4 py-2", children: /* @__PURE__ */ jsxs("div", { className: "flex gap-5 items-center", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: `/users/${user.id}/edit`,
              className: "inline-block px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600",
              children: "Edit"
            }
          ),
          /* @__PURE__ */ jsx(
            Link,
            {
              to: `/users/${user.id}/detailed`,
              className: "inline-block px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600",
              children: "Detailed"
            }
          )
        ] }) })
      ] }, user.id)) })
    ] })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: UsersList,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
function User() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: User
}, Symbol.toStringTag, { value: "Module" }));
const handle$1 = {
  breadcrumb: () => /* @__PURE__ */ jsx(BreadcrumbsItem, { children: "Add" })
};
async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  if (!name || name.length < 2) {
    return json({ error: "Name must be at least 2 characters long" }, { status: 400 });
  }
  if (!email || !email.includes("@")) {
    return json({ error: "Invalid email address" }, { status: 400 });
  }
  const res = await fetch(`https://654ba4a15b38a59f28ef7233.mockapi.io/api/v1/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email })
  });
  if (!res.ok) {
    console.error("API error:", res.status, res.statusText);
    return json({ error: "Failed to create user" }, { status: 500 });
  }
  const newUser = await res.json();
  console.log("New user created:", newUser);
  return redirect(`/users`);
}
function NewUser() {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold mb-4", children: "Create New User" }),
    /* @__PURE__ */ jsxs(Form, { method: "post", className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block text-sm font-medium", children: "Name" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "name",
            name: "name",
            className: "mt-1 block p-2 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
            minLength: 2,
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block text-sm font-medium", children: "Email" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            id: "email",
            name: "email",
            className: "mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500",
            required: true
          }
        )
      ] }),
      actionData && "error" in actionData && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-sm", children: actionData.error }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: isSubmitting,
          className: `w-full py-2 px-4 rounded-md text-white ${isSubmitting ? "bg-blue-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`,
          children: isSubmitting ? "Submitting..." : "Submit"
        }
      )
    ] })
  ] });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action,
  default: NewUser,
  handle: handle$1
}, Symbol.toStringTag, { value: "Module" }));
async function loader() {
  const res = await fetch("https://654ba4a15b38a59f28ef7233.mockapi.io/api/v1/users");
  if (!res.ok) {
    console.error("API error:", res.status, res.statusText);
    throw new Response("Failed to fetch users", { status: 500 });
  }
  const users = await res.json();
  console.log("Fetched users:", users);
  return json({ userCount: users.length });
}
function Dashboard() {
  const { userCount } = useLoaderData();
  return /* @__PURE__ */ jsx("div", { className: "p-6 bg-white rounded-lg shadow-md max-w-md", children: /* @__PURE__ */ jsxs("div", { className: "text-lg", children: [
    /* @__PURE__ */ jsx("span", { className: "font-medium text-gray-600", children: "Total Users: " }),
    /* @__PURE__ */ jsx("span", { className: "text-gray-800", children: userCount })
  ] }) });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const handle = {
  breadcrumb: () => /* @__PURE__ */ jsx(BreadcrumbsItem, { children: "Users" })
};
function Users() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Users,
  handle
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/remix/assets/entry.client-DsIR21tN.js", "imports": ["/remix/assets/index-BhZxhB74.js", "/remix/assets/components-EqsHinRy.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/remix/assets/root-Ib_VIHHk.js", "imports": ["/remix/assets/index-BhZxhB74.js", "/remix/assets/components-EqsHinRy.js", "/remix/assets/breadcrumbs-item-q1lDklfV.js"], "css": ["/remix/assets/root-QbRzLN_K.css"] }, "routes/users.$id.detailed": { "id": "routes/users.$id.detailed", "parentId": "routes/users.$id", "path": "detailed", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/remix/assets/users._id.detailed-DOyJzMgC.js", "imports": ["/remix/assets/index-BhZxhB74.js", "/remix/assets/breadcrumbs-item-q1lDklfV.js", "/remix/assets/components-EqsHinRy.js"], "css": [] }, "routes/users.$id.edit": { "id": "routes/users.$id.edit", "parentId": "routes/users.$id", "path": "edit", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/remix/assets/users._id.edit-1qerlS_Y.js", "imports": ["/remix/assets/index-BhZxhB74.js", "/remix/assets/breadcrumbs-item-q1lDklfV.js", "/remix/assets/components-EqsHinRy.js"], "css": [] }, "routes/users._index": { "id": "routes/users._index", "parentId": "routes/users", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/remix/assets/users._index-CslgqlKZ.js", "imports": ["/remix/assets/index-BhZxhB74.js", "/remix/assets/components-EqsHinRy.js"], "css": [] }, "routes/users.$id": { "id": "routes/users.$id", "parentId": "routes/users", "path": ":id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/remix/assets/users._id-ByMak2HY.js", "imports": ["/remix/assets/index-BhZxhB74.js"], "css": [] }, "routes/users.add": { "id": "routes/users.add", "parentId": "routes/users", "path": "add", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/remix/assets/users.add-Bc6aiIxf.js", "imports": ["/remix/assets/index-BhZxhB74.js", "/remix/assets/breadcrumbs-item-q1lDklfV.js", "/remix/assets/components-EqsHinRy.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/remix/assets/_index-BAlZXzCU.js", "imports": ["/remix/assets/index-BhZxhB74.js", "/remix/assets/components-EqsHinRy.js"], "css": [] }, "routes/users": { "id": "routes/users", "parentId": "root", "path": "users", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/remix/assets/users-DDZSyUmg.js", "imports": ["/remix/assets/index-BhZxhB74.js", "/remix/assets/breadcrumbs-item-q1lDklfV.js"], "css": [] } }, "url": "/remix/assets/manifest-001817fe.js", "version": "001817fe" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/remix/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/users.$id.detailed": {
    id: "routes/users.$id.detailed",
    parentId: "routes/users.$id",
    path: "detailed",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/users.$id.edit": {
    id: "routes/users.$id.edit",
    parentId: "routes/users.$id",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/users._index": {
    id: "routes/users._index",
    parentId: "routes/users",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route3
  },
  "routes/users.$id": {
    id: "routes/users.$id",
    parentId: "routes/users",
    path: ":id",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/users.add": {
    id: "routes/users.add",
    parentId: "routes/users",
    path: "add",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route6
  },
  "routes/users": {
    id: "routes/users",
    parentId: "root",
    path: "users",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
