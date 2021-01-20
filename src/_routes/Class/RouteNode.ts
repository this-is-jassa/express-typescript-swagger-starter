import { Router } from 'express';
import { Common } from '../../_Interface/Common';

export class RouteNode {

    private router: Router;

    constructor() {
        this.router = Router();
    }

    public use(url: string, _router: Router): void {
        this.router.use(url, _router);
    }

    public Get(url: string, middleware: Array<Common['Middleware']>): void {
        this.router.get(url, middleware);
    }

    public Post(url: string, middleware: Array<Common['Middleware']>): void {
        this.router.post(url, middleware);
    }

    public Delete(url: string, middleware: Array<Common['Middleware']>): void {
        this.router.delete(url, middleware);
    }

    public Put(url: string, middleware: Array<Common['Middleware']>): void {
        this.router.put(url, middleware);
    }



    public get Route(): Router {
        return this.router
    }

}
