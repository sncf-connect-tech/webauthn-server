import {prop, Typegoose} from 'typegoose';
import {ApiModelProperty} from '@nestjs/swagger';

export class Login extends Typegoose {
    constructor() {
        super();
    }
    @prop({ required: true, unique: true })
    @ApiModelProperty()
    username: string;
}