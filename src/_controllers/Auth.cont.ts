import { Get, Post, Put, Delete, Body, Param, JsonController } from 'routing-controllers';
import { Service } from "typedi";

@Service()
@JsonController("/test")
export class TestController {

    @Get("/categories")
    async all(): Promise<string> {
        return 'sa';
    }
}

