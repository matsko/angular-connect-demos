/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injector, NgZone, PLATFORM_INITIALIZER } from '@angular/core';
import { BrowserPlatformLocation } from '../../private_import_platform-browser';
import { MessageBasedPlatformLocation } from './platform_location';
/**
 * A list of {@link Provider}s. To use the router in a Worker enabled application you must
 * include these providers when setting up the render thread.
 * @experimental
 */
export var WORKER_UI_LOCATION_PROVIDERS = [
    MessageBasedPlatformLocation, BrowserPlatformLocation,
    { provide: PLATFORM_INITIALIZER, useFactory: initUiLocation, multi: true, deps: [Injector] }
];
function initUiLocation(injector) {
    return function () {
        var zone = injector.get(NgZone);
        zone.runGuarded(function () { return injector.get(MessageBasedPlatformLocation).start(); });
    };
}
//# sourceMappingURL=location_providers.js.map