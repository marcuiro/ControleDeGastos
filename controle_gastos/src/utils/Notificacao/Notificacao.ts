import { notice } from '@pnotify/core';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/bootstrap4/dist/PNotifyBootstrap4.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';


///<summary>
///Classe para enviar notificações discretas para o usuário
///</summary>
export class Notificacao {
    static sucesso(msg: string) {
        notice({
            title: 'Sucesso',
            text: msg,
            addClass: "pnotify-custom-container success",
            delay: 5000
        });
    }

    static erro(msg: string) {
        notice({
            title: 'Erro',
            text: msg,
            addClass: "pnotify-custom-container error",
            delay: 5000
        });
    }

    static info(msg: string) {
        notice({
            title: 'Info',
            text: msg,
            addClass: "pnotify-custom-container info",
            delay: 5000
        });
    }
}