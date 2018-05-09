import { Injectable } from '@angular/core';
import { LoadingController, AlertController, App, Platform, ToastController } from 'ionic-angular';
import { HttpProvider } from './http/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiProvider {
    private url: string;
    protected urlBase = 'http://localhost:8000/';
    protected loading;

    constructor(public httpProvider: HttpProvider, private platform: Platform, public loadingCtrl: LoadingController,
                public alertCtrl: AlertController, public app: App, protected toastCtrl: ToastController) {
    }

    /**
     * Builds the final URL
     *
     * @param {string} controller
     * @returns {ApiProvider}
     */
    builder(controller: string) {
        this.url = this.urlBase + 'api/v1/' + controller;

        return this;
    }

    /**
     * Shows the loading modal
     *
     * @param message
     * @returns {ApiProvider}
     */
    loader(message: string = 'Carregando') {
        this.loading = this.loadingCtrl.create({
            content: message
        });

        this.loading.present();

        return this;
    }

    /**
     * Builds the URL parameters
     *
     * @param params
     */
    private buildUrlParams(params = null) {
        if (params) {
            let urlParams = '';

            for (let key in params) {
                if (urlParams)
                    urlParams += '&';

                urlParams += key + '=' + params[key];
            }

            this.url += urlParams !== '' ? '?' + urlParams : '';
        }
    }

    /**
     * HTTP GET request
     *
     * @param {{}} params
     * @returns {any}
     */
    get(params = {}) {
        this.buildUrlParams(params);

        return this.resolve(this.httpProvider.http.get(this.url).subscribe(res => res));
    }

    /**
     * HTTP POST request
     *
     * @param params
     * @returns {any}
     */
    post(params) {
        return this.resolve(this.httpProvider.http.post(this.url, params, {'Content-Type': 'application/json'}));
    }

    /**
     * HTTP PUT request
     *
     * @param params
     * @returns {any}
     */
    put(params) {
        return this.resolve(this.httpProvider.http.put(this.url, params, {'Content-Type': 'application/json'}));
    }

    /**
     * HTTP DELETE request
     *
     * @returns {any}
     */
    delete() {
        return this.resolve(this.httpProvider.http.delete(this.url));
    }

    /**
     * @param request
     */
    public resolve(request) {
        return request
            .map((res) => {
                this.hideLoader();

                return res || [];
            })
            .catch((err) => {
                this.hideLoader();

                this.promiseErrorResolver(err).present();

                return [];
            });
    }

    /**
     *
     * @param error
     * @returns {Alert}
     */
    public promiseErrorResolver(error) {
        let title = 'Erro';
        let message = 'Erro no servidor, informe o erro ' + error.status + ' ao administrador.';

        if (error.status === 422) {
            title = 'Atenção';
            message = '<p>Falha de validação, verifique os campos.</p>';

            let body = JSON.parse(error._body) || {};

            if (body) {
                message += '<ul>';
                for (let item in body) {
                    if (body[item].indexOf('validation.unique') !== -1) {
                        message += '<li>O ' + item + ' já está cadastrado.</li>';
                    }
                }
                message += '</ul>';
            }
        }

        if (error.status === 404) {
            message = 'Não foi possível conectar-se ao servidor. Verifique a sua conexão ou tente novamente em breve.';
        }

        return this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: [{text: 'OK'}]
        });
    }

    /**
     * Hides the loader if it's visible
     */
    public hideLoader() {
        if (this.loading) {
            this.loading.dismiss().catch(() => {
            });
        }
    }

    /**
     * @returns {boolean}
     */
    public isApp() {
        return this.platform.is('core') || this.platform.is('cordova');
    }
}