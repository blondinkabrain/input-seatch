interface IItem {
    id: number;
    caption: string;
}

export default class DataService {
    items: IItem[];
    protected _loadingReject: Promise.reject;
    protected _loadingTimeOut: NodeJS.Timeout | null = null;

    constructor(length: number = 0, title: string = '') {
        this.items = [];
        if (length) {
            this.generate(length, false, title);
        }
    }

    public get data(): IItem[] {
        return this.items;
    }
    public set data(items: IItem[]) {
        this.items = items;
    }

    generate(length: number, isAdd: boolean = false, title: string) {
        this.items = isAdd ? this.items : [];
        for (let i = 0; i < length; i++) {
            this.items.push({
                id: i,
                caption: `${title} ${i}`
            })
        }
    }

    add(item: IItem) {
        this.items.push(item);
    }

    public load(filter: string = '', timeout?: number): Promise<object[]> {
        const resolveTimeOut = timeout ?? Math.floor(Math.random() * 3000); // ожидание до 3х секунд
        const filteredItems = this.items.filter((item) => {
            return item.caption.includes(filter);
        });
        if (this._loadingReject) {
            this._loadingReject(new Error('stop loading'));
            clearTimeout(this._loadingTimeOut);
        }
        return new Promise((resolve, reject) => {
            this._loadingReject = reject;
            this._loadingTimeOut = setTimeout(() => {
                console.log('resolved');
                this._loadingReject = null;
                resolve(this.sort(filteredItems));
            }, resolveTimeOut);
        });

    }

    sort(items: IItem[]): IItem[] {
        return items.sort(function (a, b) {
            if (a.caption > b.caption) {
                return 1;
            }
            if (a.caption < b.caption) {
                return -1;
            }
            // a должно быть равным b
            return 0;
        });
    }
}

