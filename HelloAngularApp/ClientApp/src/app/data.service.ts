import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './account';

@Injectable()
export class DataService {

    private url = "/api/products";

    constructor(private http: HttpClient) {
    }

    getAccounts() {
        return this.http.get(this.url);
    }

    getAccount(id: number) {
        return this.http.get(this.url + '/' + id);
    }

    createAccount(product: Account) {
        return this.http.post(this.url, product);
    }
    updateAccount(product: Account) {

        return this.http.put(this.url, product);
    }
    deleteAccount(id: number) {
        return this.http.delete(this.url + '/' + id);
    }
}