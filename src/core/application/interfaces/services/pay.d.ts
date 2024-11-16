import Stripe from "stripe"

type PaymentRepository = {
    constructEventWebhook(payload:string, sig: string): Stripe.Event
    retrieveSession(id:string, params?: Stripe.Checkout.SessionRetrieveParams, options?: Stripe.RequestOptions ):Promise<Stripe.Response<Stripe.Checkout.Session>>
    deleteCustomer(id: string, params?: Stripe.CustomerDeleteParams, options?: Stripe.RequestOptions): Promise<Stripe.Response<Stripe.DeletedCustomer>>
    retrieveSubscription(id: string, params?: Stripe.SubscriptionRetrieveParams, options?: Stripe.RequestOptions): Promise<Stripe.Response<Stripe.Subscription>>
}