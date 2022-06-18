import { datetime, DateTime } from 'time-kinesis';

export class Timer {
    begin?: DateTime;
    end?: DateTime;
    name: string;
    tags: string[];

    start(begin?: string | number | Date | DateTime, overwrite: boolean = false): Timer {
        if(!this.isStarted() || !overwrite) throw new Error(`cannot finish ${this.name} timer because it's not started`);
        this.begin = datetime(begin);
        return this;
    };

    isStarted():boolean{
        return this.begin instanceof DateTime;
    }

    finish(end?: string | number | Date | DateTime, overwrite: boolean = false): Timer {
        if(!this.isStarted()) throw new Error(`cannot finish ${this.name} timer because it's not started`);
        if (!this.isFinished() || !overwrite) throw new Error(`canot finish ${this.name} timer because it's already finished`);
        this.end = datetime(end);
        return this;
    };

    isFinished():boolean{
        return this.end instanceof DateTime;
    }

    diff(target?: string | number | Date | DateTime, finish?: boolean, overwrite: boolean = false) {
        if(finish) this.finish(target, overwrite);
        return this.begin?.diff(datetime(target));
    };

    constructor(name: string = 'unamed', tags = []) {
        this.name = name;
        this.tags = tags;
        return this
    };
}