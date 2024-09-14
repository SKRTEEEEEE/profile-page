import { stripePaymentRepository } from "@/core/infrastructure/services/stripe-pay"
import Stripe from "stripe"

export const constructEventWebhookUC = (payload:string, sig: string): Stripe.Event => {
    return stripePaymentRepository.constructEventWebhook(payload, sig)
}
export const retrieveSessionUC = async(id:string, params?: Stripe.Checkout.SessionRetrieveParams, options?: Stripe.RequestOptions) => {
    return await stripePaymentRepository.retrieveSession(id, params, options)
}
export const deleteCustomerUC = async(id: string, params?: Stripe.CustomerDeleteParams, options?: Stripe.RequestOptions) =>{
    return await stripePaymentRepository.deleteCustomer(id,params, options)
}
export const retrieveSubscriptionUC = async (id: string, params?: Stripe.SubscriptionRetrieveParams, options?: Stripe.RequestOptions) => {
    return await stripePaymentRepository.retrieveSubscription(id, params, options)
}