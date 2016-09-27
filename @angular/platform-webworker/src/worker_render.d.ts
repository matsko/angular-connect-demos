/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { OpaqueToken, PlatformRef, Provider } from '@angular/core';
import { MessageBus } from './web_workers/shared/message_bus';
/**
 * Wrapper class that exposes the Worker
 * and underlying {@link MessageBus} for lower level message passing.
 *
 * @experimental WebWorker support is currently experimental.
 */
export declare class WebWorkerInstance {
    worker: Worker;
    bus: MessageBus;
}
/**
 * @experimental WebWorker support is currently experimental.
 */
export declare const WORKER_SCRIPT: OpaqueToken;
/**
 * A multi-provider used to automatically call the `start()` method after the service is
 * created.
 *
 * TODO(vicb): create an interface for startable services to implement
 * @experimental WebWorker support is currently experimental.
 */
export declare const WORKER_UI_STARTABLE_MESSAGING_SERVICE: OpaqueToken;
export declare const _WORKER_UI_PLATFORM_PROVIDERS: Provider[];
/**
 * @experimental WebWorker support is currently experimental.
 */
export declare const platformWorkerUi: (extraProviders?: Provider[]) => PlatformRef;
