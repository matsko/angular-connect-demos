/**
 * @license Angular v0.0.0-PLACEHOLDER
 * (c) 2010-2016 Google, Inc. https://angular.io/
 * License: MIT
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/compiler'), require('@angular/core'), require('@angular/platform-browser-dynamic')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/compiler', '@angular/core', '@angular/platform-browser-dynamic'], factory) :
    (factory((global.ng = global.ng || {}, global.ng.platformWebworkerDynamic = global.ng.platformWebworkerDynamic || {}),global.ng.compiler,global.ng.core,global.ng.platformBrowserDynamic));
}(this, function (exports,_angular_compiler,_angular_core,_angular_platformBrowserDynamic) { 'use strict';

    var ResourceLoaderImpl = _angular_platformBrowserDynamic.__platform_browser_dynamic_private__.ResourceLoaderImpl;

    /**
     * @experimental API related to bootstrapping are still under review.
     */
    var platformWorkerAppDynamic = _angular_core.createPlatformFactory(_angular_compiler.platformCoreDynamic, 'workerAppDynamic', [{
            provide: _angular_core.COMPILER_OPTIONS,
            useValue: { providers: [{ provide: _angular_compiler.ResourceLoader, useClass: ResourceLoaderImpl }] },
            multi: true
        }]);

    exports.platformWorkerAppDynamic = platformWorkerAppDynamic;

}));