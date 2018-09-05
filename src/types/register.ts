import {prop, Typegoose} from 'typegoose';
import {ApiModelProperty} from '@nestjs/swagger';
import {AuthInfos} from './authinfos';

const uuidv1 = require('uuid/v1')

export class Register extends Typegoose {
    constructor() {
        super();
    }
    @prop({ required: true, unique: true })
    @ApiModelProperty()
    username: string;
    @prop({ required: true })
    @ApiModelProperty()
    name: string;
    @prop({ default: false })
    registered: boolean;
    @prop()
    authenticators: Array<AuthInfos>;
    @prop({ default: uuidv1() })
    @ApiModelProperty()
    id: string;
}