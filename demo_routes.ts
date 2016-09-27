import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Demo1 } from './demo_1/demo';
import { Demo2 } from './demo_2/demo';
import { Demo3 } from './demo_3/demo';
import { Demo4 } from './demo_4/demo';

export const ComponentRoutes : Routes = [
  { path: ''     , redirectTo: 'demo1', pathMatch: 'full'},
  { path: 'demo1', component: Demo1 },
  { path: 'demo2', component: Demo2 },
  { path: 'demo3', component: Demo3 },
  { path: 'demo4', component: Demo4 }
];

export const DemoRoutes: ModuleWithProviders = RouterModule.forRoot(ComponentRoutes);
