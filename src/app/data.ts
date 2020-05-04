import * as Glue from 'state-glue';
import * as Parts from 'state-parts';
import { Table } from 'state-parts/build/js/storage/in-memory/table';

export class DataCache implements Glue.ContextResolver {
    private readonly reader: Parts.ModelReader = new Parts.ModelReader();
    private readonly writer: Parts.ModelWriter = new Parts.ModelWriter("./model/");

    private readonly cache: Parts.InMemoryStorage = new Parts.InMemoryStorage(
        new Table(Parts.TYPE_CLASS, "name"),
        new Table(Parts.TYPE_ATTRIBUTE, "name", "class")
    );
    
    constructor() {
        this.cache.clear();
        this.reader.readAsPatch("./model/", this.cache);
    }

    resolve<P, C>(params: P, context: Glue.ContextDeclaration<C>): C {
        const result = {};
        
    }
}

