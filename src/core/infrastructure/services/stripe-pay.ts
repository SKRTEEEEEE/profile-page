import { PaymentRepository } from "@/core/application/services/pay";
import { StripeConnector } from "../connectors/stripe-auth";
import Stripe from "stripe";

class StripePaymentRepository extends StripeConnector implements PaymentRepository{
    constructEventWebhook(payload:string, sig: string): Stripe.Event{
        return this.stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_KEY!)
    }
    async retrieveSession(id:string, params?: Stripe.Checkout.SessionRetrieveParams, options?: Stripe.RequestOptions ):Promise<Stripe.Response<Stripe.Checkout.Session>>{
        return this.stripe.checkout.sessions.retrieve(id,params,options)
    }
    async deleteCustomer(id: string, params?: Stripe.CustomerDeleteParams, options?: Stripe.RequestOptions): Promise<Stripe.Response<Stripe.DeletedCustomer>>{
        return this.stripe.customers.del(id, params, options)
    }
    async retrieveSubscription(id: string, params?: Stripe.SubscriptionRetrieveParams, options?: Stripe.RequestOptions): Promise<Stripe.Response<Stripe.Subscription>>{
        return this.stripe.subscriptions.retrieve(id, params, options)
    }
}
export const stripePaymentRepository = new StripePaymentRepository()