import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Account } from './account';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    providers: [DataService]
})
export class AppComponent implements OnInit {

    account: Account = new Account();   
    accounts: Account[];                
    tableMode: boolean = true;         

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.loadAccounts();    // загрузка данных при старте компонента  
    }
    // получаем данные через сервис
    loadAccounts() {
        this.dataService.getAccounts()
            .subscribe((data: Account[]) => this.accounts = data);
    }
    // сохранение данных
    save() {
        if (this.account.id == null) {
            this.dataService.createAccount(this.account)
                .subscribe((data: Account) => this.accounts.push(data));
        } else {
            this.dataService.updateAccount(this.account)
                .subscribe(data => this.loadAccounts());
        }
        this.cancel();
    }
    editAccount(p: Account) {
        this.account = p;
    }
    cancel() {
        this.account = new Account();
        this.tableMode = true;
    }
    delete(p: Account) {
        this.dataService.deleteAccount(p.id)
            .subscribe(data => this.loadAccounts());
    }
    add() {
        this.cancel();
        this.tableMode = false;
    }
}