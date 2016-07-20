export class Tasks {
    public findAll(params: Object, callback: Function){
        return callback([
            { title: "Fazer compras" },
            { title: "Consertar PC" },
        ]);
    }
}