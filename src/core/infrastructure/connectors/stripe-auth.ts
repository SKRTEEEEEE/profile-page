import { SetEnvError } from "@/core/domain/errors/main";
import Stripe from "stripe";

export abstract class StripeConnector {
    private _stripe;
    private api = process.env.STRIPE_API_KEY;

    constructor(){
        this._stripe = this.initialize()
    }
    private initialize(){
        if(!this.api)throw new SetEnvError("stripe api")
        const stripe = new Stripe(this.api)
        return stripe
    }
    protected get stripe(){
        return this._stripe
    }

}