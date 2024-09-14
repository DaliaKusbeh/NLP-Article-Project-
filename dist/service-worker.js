if (!self.customDefine) {
    let scriptCache = {};
    const loadScript = (url, base) => {
        const fullUrl = new URL(url + ".js", base).href;
        return scriptCache[fullUrl] || new Promise((resolve) => {
            if ("document" in self) {
                const script = document.createElement("script");
                script.src = fullUrl;
                script.onload = resolve;
                document.head.appendChild(script);
            } else {
                importScripts(fullUrl);
                resolve();
            }
        }).then(() => {
            const module = scriptCache[fullUrl];
            if (!module) throw new Error(`Module ${fullUrl} did not register`);
            return module;
        }));
    };
    
    self.customDefine = (dependencies, factory) => {
        const currentScript = scriptCache || ("document" in self ? document.currentScript.src : "") || location.href;
        if (scriptCache[currentScript]) return;
        
        let moduleExports = {};
        const requireModule = (module) => loadScript(module, currentScript);
        const context = { module: { uri: currentScript }, exports: moduleExports, require: requireModule };

        scriptCache[currentScript] = Promise.all(dependencies.map(dep => context[dep] || requireModule(dep)))
            .then((resolvedModules) => (factory(...resolvedModules), moduleExports));
    };
}

customDefine(["./workbox-1c3383c2"], (function(workbox) {
    "use strict";
    self.skipWaiting();
    workbox.clientsClaim();
    workbox.precacheAndRoute([
        { url: "./index.html", revision: "f41a8ac40d0fc162884c4c59a2d1d273" },
        { url: "bundle.js", revision: "2a9722fc961747deaa3035ad59624e7d" },
        { url: "bundle.js.LICENSE.txt", revision: "4e0e34f265fae8f33b01b27ae29d9d6f" },
        { url: "main.css", revision: "d48dda43e4df40509464e05cc98f0e92" }
    ], {});
}));
