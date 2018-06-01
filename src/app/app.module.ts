import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/default/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ApiProvider } from "../providers/api/api";
import { HttpProvider } from "../providers/api/http/http";
import { HttpAngularProvider } from "../providers/api/http/http-angular";
import { HttpClientModule } from "@angular/common/http";
import { HttpNativeProvider } from "../providers/api/http/http-native";
import { HTTP } from "@ionic-native/http";
import { ProductsPage } from "../pages/default/products/index/products";
import { ProductsDetailPage } from "../pages/default/products/detail/products-detail";
import { BillsPage } from "../pages/default/bills/bills";
import { ManagerProductsFormPage } from "../pages/manager/products/form/manager-products-form";
import { IngredientsDetailPage } from "../pages/manager/ingredients/detail/ingredients-detail";
import { BrMaskerModule } from "brmasker-ionic-3";
import { SelectSearchableModule } from 'ionic-select-searchable';

@NgModule({
    declarations: [
        MyApp,
        ProductsPage,
        ProductsDetailPage,
        BillsPage,
        TabsPage,
        ManagerProductsFormPage,
        IngredientsDetailPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrMaskerModule,
        SelectSearchableModule,
        IonicModule.forRoot(MyApp, {
            tabsPlacement: 'top'
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ProductsPage,
        ProductsDetailPage,
        BillsPage,
        TabsPage,
        ManagerProductsFormPage,
        IngredientsDetailPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        ApiProvider,
        HttpProvider,
        HttpAngularProvider,
        HttpNativeProvider,
        HTTP,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}
