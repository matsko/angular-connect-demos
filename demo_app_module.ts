import {DemoApp} from './demo_app';
import {NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import { DemoRoutes } from 'demo_routes';
import { Demo1Module } from './demo_1/demo_module';
import { Demo2Module } from './demo_2/demo_module';
import { Demo3Module } from './demo_3/demo_module';
import { Demo4Module } from './demo_4/demo_module';

import {APP_BASE_HREF} from '@angular/common';

@NgModule({
    bootstrap: [DemoApp],
    declarations: [DemoApp],
    imports: [
      BrowserModule,
      DemoRoutes,
      Demo1Module,
      Demo2Module,
      Demo3Module,
      Demo4Module
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/ac_presentation' },
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ]
})
export class DemoAppModule { }
