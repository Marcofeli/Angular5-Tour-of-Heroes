import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService{
    createDb(){
        const heroes = [
            {id:1,name:"Makoa"},
            {id:2,name:"Viktor"},
            {id:3,name:"Fernando"},
            {id:4,name:"Torvald"},
            {id:5,name:"Seris"},
            {id:6,name:"Androxus"},
            {id:7,name:"Casie"},
            {id:8,name:"Evie"},
            {id:9,name:"Inara"},
            {id:10,name:"Ruckus"}
        ]
        
        return {heroes}
    }
    
}