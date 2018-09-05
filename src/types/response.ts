import {prop, Typegoose} from 'typegoose';
import {ApiModelProperty} from '@nestjs/swagger';

export class Response extends Typegoose {
    constructor() {
        super();
    }
    @prop({ required: true })
    @ApiModelProperty()
    id: string;
    @prop({ required: true })
    @ApiModelProperty()
    rawId: string;
    @prop({ required: true })
    @ApiModelProperty()
    type: string;
    @prop({ required: true })
    @ApiModelProperty()
    response: {
        attestationObject: string,
        authenticatorData: string,
        clientDataJSON: string,
    };
}