var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { DataService } from './data.service';
import { Account } from './account';
let AppComponent = class AppComponent {
    constructor(dataService) {
        this.dataService = dataService;
        this.account = new Account();
        this.tableMode = true;
    }
    ngOnInit() {
        this.loadAccounts(); // загрузка данных при старте компонента  
    }
    // получаем данные через сервис
    loadAccounts() {
        this.dataService.getAccounts()
            .subscribe((data) => this.accounts = data);
    }
    // сохранение данных
    save() {
        if (this.account.id == null) {
            this.dataService.createAccount(this.account)
                .subscribe((data) => this.accounts.push(data));
        }
        else {
            this.dataService.updateAccount(this.account)
                .subscribe(data => this.loadAccounts());
        }
        this.cancel();
    }
    editAccount(p) {
        this.account = p;
    }
    cancel() {
        this.account = new Account();
        this.tableMode = true;
    }
    delete(p) {
        this.dataService.deleteAccount(p.id)
            .subscribe(data => this.loadAccounts());
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app',
        templateUrl: './app.component.html',
        providers: [DataService]
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map