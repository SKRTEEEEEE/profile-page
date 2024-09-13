import { User } from "@/core/domain/entities/User";
import { RoleModel, UserModel } from "@/models/user-role-schema";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
  
const stripe = new Stripe(process.env.STRIPE_API_KEY!);
export async function POST(req:NextRequest){
    const payload = await req.text()
    const sig = req.headers.get("stripe-signature")

    let event;
  
    try {
      event = stripe.webhooks.constructEvent(payload, sig!, process.env.STRIPE_WEBHOOK_KEY!);
  
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        console.log({paymentIntentSucceeded})
        break;
      // ... handle other event types
      case "checkout.session.completed":
        console.log("checkout session triggered")
        const session = await stripe.checkout.sessions.retrieve(
            event.data.object.id,
            {
              expand: ["line_items"],
            }
          );
          const lineItems = session.line_items?.data;
          console.log({lineItems})
          let productID
          if(!lineItems){console.warn("No line_items.data")}else{
            lineItems.forEach(item => {
              console.log('Product ID:', item.price?.product);
              console.log('Price:', item.price?.unit_amount! / 100); // Los precios se proporcionan en centavos
              console.log('Quantity:', item.quantity);
              if(item.price?.product){
                productID = item.price?.product!
              }
          });
          }
          const product = await stripe.products.retrieve(productID!);
          console.log({product})
          console.log('Product Name:', product.name);
          console.log('Product Description:', product.description);
                     
          console.log("session", {session})
          console.log("client reference:", session.client_reference_id)
          const user: User | null = await UserModel.findById(session.client_reference_id);
          console.log("user: ", user)
          if(!user) throw new Error("Error with client_reference_id")
        if(!product.metadata || !product.metadata.plan) throw new Error("Error at set metadata role")
        if(!user.roleId){
          const role = new RoleModel({
            address: user.address,
            permissions: product.metadata.plan,
            stripeCustomerId: session.customer,
            subscriptionId: session.id,
            subscriptionStatus: session.status
          })
          console.log("Role created: ", role)
          try {
            await role.save()
            console.log("role saved")
    
            await UserModel.findByIdAndUpdate(user.id, { roleId: role.id, role: product.metadata.plan });
            console.log("user and role saved")
          } catch (saveError) {
            console.error("Error saving role or updating user:", saveError)
            throw saveError
          }

        }else
        {
          console.log("here goes the update role")
          //Lo que se haga para el updateRole
        }
        break;
      case "customer.subscription.deleted":
      //Do what i said
      console.log("Customer deleted with id: ",)
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }  
    return NextResponse.json({
        status: "success",
      });
} catch (err){
    return NextResponse.json({ status: "Failed", err });
}
  
}