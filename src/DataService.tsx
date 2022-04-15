interface IItem {
    id: number;
    caption: string;
}

export default class DataService {
    items: IItem[];
    protected _loadingReject: () => void;
    protected _loadingTimeOut: ReturnType<typeof setTimeout> | null;

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

    add(caption: string) {
        this.items.push({
            id: this.items.length, // no need in guid, 'cause no remove function
            caption: caption
        });
    }

    public load(filter: string = '', timeout?: number): Promise<object[]> {
        const resolveTimeOut = timeout ?? Math.floor(Math.random() * 3000); // max ~4 seconds of waiting
        const filteredItems = this.items.filter((item) => {
            return item.caption.toLowerCase().includes(filter.toLowerCase());
        });
        if (this._loadingReject && this._loadingTimeOut) {
            this._loadingReject(new Error('stopped loading before new load'));
            clearTimeout(this._loadingTimeOut);
            this._loadingReject = null;
        }
        return new Promise((resolve, reject) => {
            this._loadingReject = reject;
            this._loadingTimeOut = setTimeout(() => {
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
            // a equals b
            return 0;
        });
    }
}

