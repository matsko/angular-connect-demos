/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ResourceLoader, platformCoreDynamic } from '@angular/compiler';
import { COMPILER_OPTIONS, createPlatformFactory } from '@angular/core';
import { ResourceLoaderImpl } from './private_import_platform-browser-dynamic';
/**
 * @experimental API related to bootstrapping are still under review.
 */
export var platformWorkerAppDynamic = createPlatformFactory(platformCoreDynamic, 'workerAppDynamic', [{
        provide: COMPILER_OPTIONS,
        useValue: { providers: [{ provide: ResourceLoader, useClass: ResourceLoaderImpl }] },
        multi: true
    }]);
//# sourceMappingURL=platform-webworker-dynamic.js.map